import os
from flask import Flask, jsonify, send_from_directory, redirect, request, url_for
from flask_cors import CORS
from faker import Faker
import random
import openai
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import json_util
from PIL import Image
import io

load_dotenv()

# Initialize Flask app and Faker
app = Flask(__name__)
CORS(app)
fake = Faker()
current_profile = None

openai.api_key = os.getenv('OPENAI_API_KEY')


client = MongoClient(os.getenv('MONGO_DB_STRING'))
db = client.tfcdb
profiles = db.profiles


def generate_image(filePath):
    im = Image.open(filePath)
    image_bytes = io.BytesIO()
    im.save(image_bytes,format='PNG')
    return image_bytes.getvalue()
    

def generate_bio(interest):
    try:
        # Create a client instance
        client = openai.OpenAI(api_key=openai.api_key)

        # Generate the bio using GPT-3.5-turbo
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": f"Write a creative bio sentence for a dating profile about someone who loves {interest}."
                }
            ]
        )

        # Extract the bio sentence
        bio_sentence = response.choices[0].message.content.strip()
        return bio_sentence
    except Exception as e:
        print(f"Exception occurred in generate_bio: {e}")
        return "A person with a passion for life."

def generate_profile(min_age, max_age, interest, gender_preference):
    if random.random() < 0.2:
        # Filbert's profile
        profile = {
            "name": "Filbert",
            "bio": "i want you",
            "age": 100,
            "gender": "male",
            "image_data": generate_image("./images/filbert.png")
        }
    else:
        # Generate a random profile
        gender = gender_preference if gender_preference in ["Male", "Female"] else random.choice(["Male", "Female"])
        bio = generate_bio(interest)
    
        name = fake.name()
    
        if min_age > max_age:
            min_age, max_age = max_age, min_age
        
        age = random.randint(min_age, max_age)

        profile = {
            "name": name,
            "bio": bio,
            "age": age,
            "gender": gender,
            "image_data": generate_image("./images/freak.png")
        }
    
    profiles.insert_one(profile)
    return profile

@app.route('/generate-ten-profiles', methods=['GET'])
def generate_ten_profiles():
    try:
        # Retrieve query parameters
        min_age = request.args.get('minAge', default=18, type=int)
        max_age = request.args.get('maxAge', default=100, type=int)
        interest = request.args.get('interests', default='', type=str)
        gender_preference = request.args.get('genderPreference', default='Any', type=str)

        for i in range(10):
            generate_profile(min_age, max_age, interest, gender_preference)
        
        return redirect("/list-profiles?minAge=" + str(min_age) + "&maxAge=" + str(max_age) + "&interests=" + interest + "&genderPreference=" + gender_preference)
    except Exception as e:
        print(f"Exception occurred in generate_ten_profiles: {e}")
        return redirect("/error")
    

@app.route('/generate-profile', methods=['POST'])
def get_generated_profile():
    data = request.json
    min_age = int(data['minAge'])
    max_age = int(data['maxAge'])
    interest = data['interests']
    gender_preference = data['genderPreference']

    profile = generate_profile(min_age, max_age, interest, gender_preference)
    return json_util.dumps(profile)



@app.route('/list-profiles', methods=['GET'])
def list_profiles():
    profile_list = list(profiles.find({}).limit(10))
    return json_util.dumps(profile_list)


@app.route('/create-profile', methods=['POST'])
def create_profile():
    global current_profile
    try:
        profile_data = request.get_json()
        print("Received Profile Data:", profile_data)
        current_profile = profile_data
        for i in range(10):
            min_age = int(current_profile.get("preferences", {}).get("minAge", 18))
            max_age = int(current_profile.get("preferences", {}).get("maxAge", 100))
            interest = current_profile.get("preferences", {}).get("interests", "")
            gender_preference = current_profile.get("preferences", {}).get("genderPreference", "Any")
            generate_profile(min_age, max_age, interest, gender_preference)
        return jsonify({"success": "Profile created successfully"})
    except Exception as e:
        print("Error creating profile:", str(e))
        return jsonify({"error": "Failed to create profile"}), 500
    
@app.route('/get-profile', methods=['GET'])
def get_profile():
    global current_profile
    if current_profile is not None:
        return jsonify(current_profile)
    else:
        return jsonify({'message': 'No profile available'})
    
if __name__ == '__main__':
    app.run(port=5000,debug=True)
