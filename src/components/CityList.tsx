import React, { useEffect, useState } from "react";
import { fetchWeather } from "@/utils/fetchWeather";
import WeatherCard from "@/components/WeatherCard";
import "@/styles/CityList.css"; // Ensure this file exists

const cities = [
  "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi", "Sialkot", "Gujranwala",
  "Hyderabad", "Sargodha", "Bahawalpur", "Sukkur", "Larkana", "Sheikhupura", "Jhang", "Mardan", "Gujrat", "Kasur",
  "Rahim Yar Khan", "Sahiwal", "Okara", "Wah Cantonment", "Dera Ghazi Khan", "Mingora", "Nawabshah", "Mirpur Khas", "Chiniot",
  "Kamoke", "Hafizabad", "Kohat", "Jacobabad", "Shikarpur", "Muzaffargarh", "Khanewal", "Dadu", "Gojra", "Muridke",
  "Bahawalnagar", "Pakpattan", "Tando Allahyar", "Tando Adam", "Jhelum", "Khuzdar", "Attock", "Vehari", "Mandi Bahauddin",
  "Lodhran", "Daska", "Kabal", "Chishtian", "Bannu", "Nowshera", "Swabi", "Abbottabad", "Mansehra", "Zhob", "Gwadar"
];

const CityList: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{ city: string; weather: any }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getWeatherData = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        cities.map(async (city) => {
          const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(); // Ensure case-insensitive search
          const data = await fetchWeather(formattedCity);
          return data ? { city: formattedCity, weather: data } : null;
        })
      );

      setWeatherData(results.filter((item) => item !== null) as { city: string; weather: any }[]);
      setError(null);
    } catch (err) {
      setError("Error fetching weather data. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    getWeatherData();
    const interval = setInterval(getWeatherData, 5 * 60 * 1000); // Updates every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="city-list">
      <h2>Weather in Major Cities</h2>
      {loading && <p>Loading weather data...</p>}
      {error && <p className="error">{error}</p>}
      <div className="city-grid">
        {weatherData.map(({ city, weather }, index) => (
          <WeatherCard key={index} city={city} data={weather} />
        ))}
      </div>
    </div>
  );
};

export default CityList;
