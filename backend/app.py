import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from faker import Faker
import random
import openai
from dotenv import load_dotenv

load_dotenv()

# Initialize Flask app and Faker
app = Flask(__name__)
CORS(app)
fake = Faker()

openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_image(bio):
    try:
        client = openai.OpenAI(api_key=openai.api_key)

        prompt = f"A portrait of a person with the following bio: {bio}"

        # Generate the image
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )

        # Extract the image URL
        image_url = response.data[0].url
        return image_url

    except Exception as e:
        print(f"Exception occurred: {e}")
        return "Image generation failed"

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
    bio = generate_bio(selected_interest)

    # Pass the bio to the image generation function
    image_url = generate_image(bio)

    return {
        "name": name,
        "bio": bio,
        "url": image_url,
        "preferences": {
            "minAge": random.randint(18, 25),
            "maxAge": random.randint(26, 35),
            "interests": selected_interest,
            "genderPreference": random.choice(gender_preferences)
        }
    }


@app.route('/generate-profile', methods=['GET'])
def get_generated_profile():
    profile = generate_profile()
    return jsonify(profile)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')
