import React from "react";
import "@/styles/WeatherCard.css";

interface WeatherProps {
  city: string;
  data: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  } | null; // ✅ Fix: Allow null to prevent crashes
}

const WeatherCard: React.FC<WeatherProps> = ({ city, data }) => {
  if (!data) return <div className="weather-card">No data available</div>; // ✅ Prevents crashes if data is missing

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <h1>{Math.round(data.temp_c)}°C</h1>

      {/* ✅ Fix: Extract condition text and icon safely */}
      <p>{data.condition?.text || "No condition available"}</p>
      <img src={data.condition?.icon || ""} alt={data.condition?.text || "Weather icon"} />

      <p>Humidity: {data.humidity}% | Wind: {data.wind_kph} kph</p>
    </div>
  );
};

export default WeatherCard;
