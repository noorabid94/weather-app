'use client'
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { fetchWeather } from "@/utils/fetchWeather";
import "@/styles/WeatherApp.css";

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
    setError("");
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
      <SearchBar handleSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard city={city} data={weather} />}
    </div>
  );
};

export default WeatherApp;
