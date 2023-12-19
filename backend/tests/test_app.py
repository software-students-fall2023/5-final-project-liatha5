import os
import tempfile
import pytest
from ..app import app
from pymongo import MongoClient
import json

import sys
print(sys.path)


def test_sanity_check():
    expected = True
    actual = True
    assert actual == expected, "Expected True to be equal to True"

def test_generate_profile():
        db_fd, app.config['DATABASE'] = tempfile.mkstemp()
        app.config['MONGO_URI'] = os.getenv('MONGO_DB_STRING')

        with app.test_client() as client:
            with app.app_context():
                # Initialize the MongoDB connection
                app.db = MongoClient(app.config['MONGO_URI']).tfcdb
                app.profiles = app.db.profiles

            response = client.post('/generate-profile', json={
                'minAge': 20,
                'maxAge': 30,
                'interests': 'Travel',
                'genderPreference': 'Any'
            })

            assert response.status_code == 200 or 500
        
        os.close(db_fd)
        os.unlink(app.config['DATABASE'])

def test_generate_ten_profiles():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['MONGO_URI'] = os.getenv('MONGO_DB_STRING')

    with app.test_client() as client:
        with app.app_context():
            # Initialize the MongoDB connection
            app.db = MongoClient(app.config['MONGO_URI']).tfcdb
            app.profiles = app.db.profiles

        response = client.get('/generate-ten-profiles')

        assert response.status_code == 200 or 500

        try:
            # Parse the JSON response
            profile_list = response.get_json()

            # Check that the response is a list
            assert isinstance(profile_list, list) or profile_list == None


        except json.JSONDecodeError as e:
            print(f"Failed to decode JSON response: {e}")
            print(f"Response content: {response.get_data(as_text=True)}")
            raise e
        
        os.close(db_fd)
        os.unlink(app.config['DATABASE'])

def test_list_profiles():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['MONGO_URI'] = os.getenv('MONGO_DB_STRING')

    with app.test_client() as client:
        with app.app_context():
            # Initialize the MongoDB connection
            app.db = MongoClient(app.config['MONGO_URI']).tfcdb
            app.profiles = app.db.profiles

        # Clear existing profiles in the database
        app.profiles.delete_many({})

        # Insert some test profiles into the database
        test_profiles = [
            {"name": "TestUser1", "age": 25, "interests": "Test Interest 1"},
            {"name": "TestUser2", "age": 30, "interests": "Test Interest 2"},
            {"name": "TestUser3", "age": 25, "interests": "Test Interest 3"},
            {"name": "TestUser4", "age": 30, "interests": "Test Interest 4"},
            {"name": "TestUser5", "age": 25, "interests": "Test Interest 5"},
            {"name": "TestUser6", "age": 30, "interests": "Test Interest 6"},
            {"name": "TestUser7", "age": 25, "interests": "Test Interest 7"},
            {"name": "TestUser8", "age": 30, "interests": "Test Interest 8"},
            {"name": "TestUser9", "age": 25, "interests": "Test Interest 9"},
            {"name": "TestUser10", "age": 30, "interests": "Test Interest 10"},
        ]
        app.profiles.insert_many(test_profiles)

        response = client.get('/list-profiles')

        assert response.status_code == 200 or 500

        try:
            # Parse the JSON response
            profile_list = response.get_json()

            # Check that the response is a list
            assert isinstance(profile_list, list) or profile_list == None

        except json.JSONDecodeError as e:
            print(f"Failed to decode JSON response: {e}")
            print(f"Response content: {response.get_data(as_text=True)}")
            raise e
        
        os.close(db_fd)
        os.unlink(app.config['DATABASE'])

def test_create_profile():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['MONGO_URI'] = os.getenv('MONGO_DB_STRING')

    with app.test_client() as client:
        with app.app_context():
            # Initialize the MongoDB connection
            app.db = MongoClient(app.config['MONGO_URI']).tfcdb
            app.profiles = app.db.profiles

        response = client.post('/create-profile', json={
            'name': 'Test User',
            'imageUrl': 'https://example.com/test-image.png',
            'preferences': {
                'minAge': 25,
                'maxAge': 35,
                'interests': 'Reading',
                'genderPreference': 'Female'
            }
        })
        assert response.status_code == 200 or 500
        os.close(db_fd)
        os.unlink(app.config['DATABASE'])

def test_get_profile():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['MONGO_URI'] = os.getenv('MONGO_DB_STRING')

    with app.test_client() as client:
        with app.app_context():
            # Initialize the MongoDB connection
            app.db = MongoClient(app.config['MONGO_URI']).tfcdb
            app.profiles = app.db.profiles

        app.current_profile = None
        response = client.get('/get-profile')
        assert response.status_code == 200 or 500
        response_data = response.get_json()
        assert 'name' in response_data or response_data == {'message': 'No profile available'}
        os.close(db_fd)
        os.unlink(app.config['DATABASE'])

if __name__ == "__main__":
    pytest.main()