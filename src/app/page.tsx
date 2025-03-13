'use client'
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { fetchWeather } from "@/utils/fetchWeather";
import "@/styles/WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (cityName: string) => {
    setCity(cityName);
    setError("");
    const data = await fetchWeather(cityName);
    if (!data) {
      setError("City not found. Please try again.");
    } else {
      setWeather(data);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <SearchBar setWeather={setWeather} handleSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
};

export default WeatherApp;
