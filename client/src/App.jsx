import React, { useState } from "react";
import './App.css'

function App() {
    // State untuk menyimpan input dari pengguna
    const [glucose, setGlucose] = useState("");
    const [bloodPressure, setBloodPressure] = useState("");
    const [bmi, setBmi] = useState("");
    const [age, setAge] = useState("");

    // State untuk menyimpan hasil prediksi
    const [prediction, setPrediction] = useState("");

    // Fungsi untuk mengirim data ke server Flask dan mendapatkan prediksi
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Menyiapkan data yang akan dikirim
        const data = {
            Glucose: glucose,
            BloodPressure: bloodPressure,
            BMI: bmi,
            Age: age,
        };

        try {
            // Mengirimkan data ke backend Flask menggunakan fetch
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Memproses respons dari server
            const result = await response.json();
            setPrediction(result.prediction); // Menyimpan hasil prediksi di state
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Diabetes Prediction
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="glucose"
                            className="text-lg font-medium text-gray-700"
                        >
                            Glucose (Gula Darah):
                        </label>
                        <input
                            id="glucose"
                            type="number"
                            value={glucose}
                            onChange={(e) => setGlucose(e.target.value)}
                            required
                            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="bloodPressure"
                            className="text-lg font-medium text-gray-700"
                        >
                            Blood Pressure (Tekanan Darah):
                        </label>
                        <input
                            id="bloodPressure"
                            type="number"
                            value={bloodPressure}
                            onChange={(e) => setBloodPressure(e.target.value)}
                            required
                            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="bmi"
                            className="text-lg font-medium text-gray-700"
                        >
                            BMI (Indeks Massa Tubuh):
                        </label>
                        <input
                            id="bmi"
                            type="number"
                            step="0.1"
                            value={bmi}
                            onChange={(e) => setBmi(e.target.value)}
                            required
                            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="age"
                            className="text-lg font-medium text-gray-700"
                        >
                            Age (Usia):
                        </label>
                        <input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>

                {prediction && (
                    <div className="mt-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Prediction: {prediction}
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
