from flask import Flask, url_for
from app import app

def test_create_profile_route():
    client = app.test_client()
    response = client.get('/')
    assert response.status_code == 200

def test_feed_route():
    client = app.test_client()
    response = client.get('/feed')
    assert response.status_code == 200

def test_chat_route():
    client = app.test_client()
    response = client.get('/chat')
    assert response.status_code == 200

