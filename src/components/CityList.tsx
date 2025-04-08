import React, { useEffect, useState } from "react";
import { fetchWeather } from "@/utils/fetchWeather";
import WeatherCard from "@/components/WeatherCard";
import "@/styles/CityList.css";

const cities = [
  "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi", "Sialkot", "Gujranwala",
  "Hyderabad", "Sargodha", "Bahawalpur", "Sukkur", "Larkana", "Sheikhupura", "Jhang", "Mardan", "Gujrat", "Kasur",
  "Rahim Yar Khan", "Sahiwal", "Okara", "Wah Cantonment", "Dera Ghazi Khan", "Mingora", "Nawabshah", "Mirpur Khas", "Chiniot",
  "Kamoke", "Hafizabad", "Kohat", "Jacobabad", "Shikarpur", "Muzaffargarh", "Khanewal", "Dadu", "Gojra", "Muridke",
  "Bahawalnagar", "Pakpattan", "Tando Allahyar", "Tando Adam", "Jhelum", "Khuzdar", "Attock", "Vehari", "Mandi Bahauddin",
  "Lodhran", "Daska", "Kabal", "Chishtian", "Bannu", "Nowshera", "Swabi", "Abbottabad", "Mansehra", "Zhob", "Gwadar"
];

interface CityListProps {
  cityInput: string | null;
  setError: (message: string) => void;  // Parent error setter
}

const CityList: React.FC<CityListProps> = ({ cityInput, setError }) => {
  const [weatherData, setWeatherData] = useState<{ city: string; weather: any }[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Simplified loading state

  const getWeatherData = async (city: string) => {
    setLoading(true);
    try {
      const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      const data = await fetchWeather(formattedCity);

      if (data) {
        setWeatherData([{ city: formattedCity, weather: data }]);
        setError(""); // Clear error in parent if successful
      } else {
        setWeatherData([]);  // Clear previous data if city is not found
        setError("City not found! Please enter a valid city.");
      }
    } catch (err) {
      setWeatherData([]); // Clear previous data on error
      setError("Error fetching weather data. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (cityInput && cities.includes(cityInput)) {
      getWeatherData(cityInput); // Fetch weather for the searched city
    } else if (cityInput) {
      setWeatherData([]); // Clear weather data when invalid city
      setError("City not found! Please enter a valid city."); // Show error
    }
  }, [cityInput, setError]);

  return (
    <div className="city-list">
      <h2>Weather in Major Cities</h2>
      {loading && <p>Loading weather data...</p>}
      {weatherData.length === 0 && !loading && <p className="error">No data available</p>}
      <div className="city-grid">
        {weatherData.map(({ city, weather }, index) => (
          <WeatherCard key={index} city={city} data={weather} />
        ))}
      </div>
    </div>
  );
};

export default CityList;
