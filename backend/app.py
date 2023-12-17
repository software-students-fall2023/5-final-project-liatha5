import os
from flask import Flask, jsonify, send_from_directory, redirect
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

openai.api_key = os.getenv('OPENAI_API_KEY')


client = MongoClient("mongodb://0.0.0.0:3001/")
db = client.tfcdb
profiles = db.profiles


def generate_image():
    im = Image.open("./images/AverageMan1_Large.png")
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

def generate_profile():
    interests = ["Reading", "Traveling", "Sports", "Music", "Cooking"]
    selected_interest = random.choice(interests)
    gender_preferences = ["Any", "Male", "Female", "Other"]

    name = fake.name()
    # bio = generate_bio(selected_interest)

    # # Pass the bio to the image generation function
    image_data = generate_image()

    profile = {
        "name": name,
        "bio": "hello!",
        "image_data": image_data,
        "preferences": {
            "minAge": random.randint(18, 25),
            "maxAge": random.randint(26, 35),
            "interests": selected_interest,
            "genderPreference": random.choice(gender_preferences)
        }
    }
    profiles.insert_one(profile)
    return profile

@app.route('/generate-ten-profiles',methods=['GET'])
def generate_ten_profiles():
    try:
        for i in range(10):
            generate_profile()
        return redirect("/list-profiles")
    except Exception as e:
        print(f"Exception occurred in generate_profile: {e}")
        return redirect("/error")
    

@app.route('/generate-profile', methods=['GET'])
def get_generated_profile():
    profile = generate_profile()
    return json_util.dumps(profile)


@app.route('/list-profiles',methods=['GET'])
def list_profiles():
    profile_list = list(profiles.find({}))
    return json_util.dumps(profile_list)
    
if __name__ == '__main__':
    app.run(port=5000,debug=True)
