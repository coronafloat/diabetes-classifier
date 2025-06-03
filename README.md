# Diabetes Prediction Using Logistic Regression Project

This project implements a **Diabetes Prediction** web application using **Flask** for the backend and **React** for the frontend. The backend uses a machine learning model with Logistic Regression algorithm to predict whether a person has diabetes based on input features like **Glucose**, **Blood Pressure**, **BMI**, and **Age**.

## Table of Contents
- [Setup for Flask Backend](#setup-for-flask-backend)
- [Setup for React Frontend](#setup-for-react-frontend)
- [Modeling Process](#modeling)

---

## Setup for Flask Backend

1. **Clone the repository**:

   Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/coronafloat/diabetes-classifier.git
   cd diabetes-classifier
   cd flask-server

2. **Create and Activate a Virtual Environment**:

    For Python projects, it's recommended to use a virtual environment to isolate dependencies. In the flask-server folder,
    read the documentation of flask and follow the step on installation section (https://flask.palletsprojects.com/en/stable/installation/)

3. **Install the Dependencies**:
    Install the dependencies to your local machine:
   ```bash
   pip install -r requirements.txt

4. **Run the Flask Server**:
    How to run the Flask server:
   ```bash
   py server.py

Make a new terminal before doing React setup

## Setup for React Frontend

1. **Install Node.js Dependencies**:

   Install the Node.js dependencies to your local machine:
   ```bash
   cd client
   npm install

2. **Set Up the Environment**:

   Change .env.example filename to .env

3. **Start the React Development Server**:

    How to run the React server:
   ```bash
   npm run dev

## Modeling

1. **Modeling**:

    I do cleaning, PreProcessing, and Modeling on the Google Colaboratory, so I will give the link to access.
    Link : https://colab.research.google.com/drive/1b6PId1ONtjUlpbKgA7m6KsYoww-beNhs?usp=sharing

