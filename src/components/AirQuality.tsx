import { useState, useEffect } from "react";
import "./AirQuality.css";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

interface AirQualityProps {
  lat: number;
  lon: number;
}

const AirQuality: React.FC<AirQualityProps> = ({ lat, lon }) => {
  const [aqi, setAqi] = useState<number | null>(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json();
        setAqi(data.list[0].main.aqi);
      } catch (error) {
        console.error("Error fetching air quality data:", error);
      }
    };

    fetchAirQuality();
  }, [lat, lon]);

  return (
    <div className="air-quality">
      <h3>Air Quality</h3>
      <p>AQI: {aqi !== null ? aqi : "Loading..."}</p>
    </div>
  );
};

export default AirQuality;

