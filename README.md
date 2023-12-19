# Final Project
![Backend](https://github.com/software-students-fall2023/5-final-project-liatha5/actions/workflows/backend-ci.yml/badge.svg)

![Frontend](https://github.com/software-students-fall2023/5-final-project-liatha5/actions/workflows/ci-cd.yml/badge.svg)

## Project Description
Do you live in Alabama? Well then this is the app for you! JK. [Tinder for Cousins](http://146.190.165.6:3000/) is a dating simulator game that gives you AI generated profiles tailored to your interests! (click link for deployed app)

## Project Members
- [Athena Leong](https://github.com/aleong2002)
- [Harry Minsky](https://github.com/hminsky2002)
- [Lianna Poblete](https://github.com/liannnaa)

## Configuration Instructions
To run the project:

### Dev Environment
* Clone the repository
* Run ```npm start``` in the frontend directory
* Run ```flask run``` in the backend directory
* Access the app from http://localhost:3000

### Using Docker compose
* Create a ```.env-backend``` file with REACT_APP_API_URL and OPENAI_API_KEY values(provided in discord)
* Run docker compose up 

### Live Hosting
* Site is hosted at [http://146.190.165.6:3000/](http://146.190.165.6:3000/)

To run Flask tests:

* Install necessary modules
* Run ```python -m pytest --cov-report term-missing```
