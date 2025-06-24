import React, { useState } from "react";
import "./App.css";
import { showSuccessAlert, showErrorAlert } from "./utils/sweetAlert";

function App() {
    // State untuk menyimpan input dari pengguna
    const [glucose, setGlucose] = useState("");
    const [bloodPressure, setBloodPressure] = useState("");
    const [bmi, setBmi] = useState("");
    const [age, setAge] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // State untuk menyimpan hasil prediksi
    const [prediction, setPrediction] = useState("");

    // Fungsi untuk mengirim data ke server Flask dan mendapatkan prediksi
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Menyiapkan data yang akan dikirim
        const data = {
            Glucose: glucose,
            BloodPressure: bloodPressure,
            BMI: bmi,
            Age: age,
        };

        try {
            // Mengirimkan data ke backend Flask menggunakan fetch
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/predict`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            // Memproses respons dari server
            const result = await response.json();
            setPrediction(result.prediction); // Menyimpan hasil prediksi di state

            await showSuccessAlert(
                "Prediksi Berhasil!",
                `Hasil Prediksi: ${result.prediction}`
            );
        } catch (error) {
            // console.error("Error:", error);

            await showErrorAlert(
                "Prediksi Gagal!",
                `${error}. Silahkan Coba Lagi!`
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form function
    const resetForm = () => {
        setGlucose("");
        setBloodPressure("");
        setBmi("");
        setAge("");
        setPrediction("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 mb-4 flex items-center justify-center">
                        <img
                            src="/logo-v2.png"
                            alt="Hospital Logo"
                            className="h-16 w-16 object-contain rounded"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Diabetes Prediction
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Masukkan data kesehatan Anda untuk prediksi diabetes
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Glucose (Gula Darah){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="300"
                                value={glucose}
                                onChange={(e) => setGlucose(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="mg/dL (contoh: 120)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blood Pressure (Tekanan Darah){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="200"
                                value={bloodPressure}
                                onChange={(e) =>
                                    setBloodPressure(e.target.value)
                                }
                                required
                                disabled={isLoading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="mmHg (contoh: 80)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                BMI (Indeks Massa Tubuh){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="10"
                                max="50"
                                value={bmi}
                                onChange={(e) => setBmi(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="kg/m² (contoh: 25.3)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age (Usia){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="120"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="tahun (contoh: 35)"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={handleSubmit}
                            disabled={
                                isLoading ||
                                !glucose ||
                                !bloodPressure ||
                                !bmi ||
                                !age
                            }
                            className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Memproses...
                                </>
                            ) : (
                                "Prediksi Diabetes"
                            )}
                        </button>

                        {prediction && (
                            <button
                                onClick={resetForm}
                                disabled={isLoading}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {prediction && (
                    <div
                        className={`mt-6 p-2 rounded-md border ${
                            prediction === "Diabetes"
                                ? "bg-red-50 border-red-200"
                                : "bg-green-50 border-green-200"
                        }`}
                    >
                        <div className="flex items-center">
                            <svg
                                className={`h-5 w-5 mr-2 ${
                                    prediction === "Diabetes"
                                        ? "text-red-400"
                                        : "text-green-400"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <h3
                                className={`text-sm font-medium ${
                                    prediction === "Diabetes"
                                        ? "text-red-800"
                                        : "text-green-800"
                                }`}
                            >
                                Hasil Prediksi
                            </h3>
                        </div>
                        <p
                            className={`mt-2 text-sm ${
                                prediction === "Diabetes"
                                    ? "text-red-700"
                                    : "text-green-700"
                            }`}
                        >
                            <strong>Prediksi: {prediction}</strong>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
