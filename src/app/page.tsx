'use client'
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { fetchWeather } from "@/utils/fetchWeather";
import "@/styles/WeatherApp.css";
import { toast } from "react-toastify";

const cities = [
  "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi", "Sialkot", "Gujranwala",
  "Hyderabad", "Sargodha", "Bahawalpur", "Sukkur", "Larkana", "Sheikhupura", "Jhang", "Mardan", "Gujrat", "Kasur",
  "Rahim Yar Khan", "Sahiwal", "Okara", "Wah Cantonment", "Dera Ghazi Khan", "Mingora", "Nawabshah", "Mirpur Khas", "Chiniot",
  "Kamoke", "Hafizabad", "Kohat", "Jacobabad", "Shikarpur", "Muzaffargarh", "Khanewal", "Dadu", "Gojra", "Muridke",
  "Bahawalnagar", "Pakpattan", "Tando Allahyar", "Tando Adam", "Jhelum", "Khuzdar", "Attock", "Vehari", "Mandi Bahauddin",
  "Lodhran", "Daska", "Kabal", "Chishtian", "Bannu", "Nowshera", "Swabi", "Abbottabad", "Mansehra", "Zhob", "Gwadar"
];

interface WeatherData {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  humidity: number;
  wind_kph: number;
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async (cityName: string) => {
    setCity(cityName);
    setError(""); // Reset error message when starting new search
    const data = await fetchWeather(cityName);
    if (!data) {
      setError("City not found. Please try again.");
      setWeather(null);
    } else {
      setWeather(data);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <SearchBar handleSearch={handleSearch} cities={cities} setError={setError} /> {/* Pass setError to SearchBar */}
      {error && <p className="error">{error}</p>} {/* Display error message */}
      {weather && <WeatherCard city={city} data={weather} />}
    </div>
  );
};

export default WeatherApp;
