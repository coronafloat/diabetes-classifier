from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Tentukan path ke folder models
model_path = os.path.join(os.getcwd(), 'models', 'model.pkl')
scaler_path = os.path.join(os.getcwd(), 'models', 'scaler.pkl')

# Muat model dan scaler yang sudah disimpan
model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

# Urutan kolom yang digunakan saat pelatihan model
columns = ['Glucose', 'BMI', 'Age', 'BloodPressure']

@app.route('/predict', methods=['POST'])
def predict():
    # Ambil data input dari request (data JSON)
    data = request.get_json()

    # Ambil fitur input yang sesuai dengan kolom pada dataset
    glucose = data['Glucose']
    bmi = data['BMI']
    age = data['Age']
    blood_pressure = data['BloodPressure']

    # Mengubah input menjadi DataFrame dengan nama kolom yang sesuai
    input_data = pd.DataFrame([[glucose, bmi, age, blood_pressure]], columns=columns)

    # Lakukan scaling
    scaled_input = scaler.transform(input_data)

    # Prediksi probabilitas
    y_prob = model.predict_proba(scaled_input)[:, 1]

    # Terapkan threshold 0.4
    prediction = 1 if y_prob >= 0.4 else 0

    # Kirimkan hasil prediksi sebagai response JSON
    return jsonify({"prediction": "Diabetes" if prediction == 1 else "Non-Diabetes"})

if __name__ == '__main__':
    app.run(debug=True)
