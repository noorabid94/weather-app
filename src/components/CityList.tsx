
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
  setError: (message: string) => void;
}

const CityList: React.FC<CityListProps> = ({ cityInput, setError }) => {
  const [weatherData, setWeatherData] = useState<{ city: string; weather: any }[]>([]);
  const [error, setErrorState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getWeatherData = async (city: string) => {
    setLoading(true);
    try {
      const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      const data = await fetchWeather(formattedCity);
      if (data) {
        setWeatherData([{ city: formattedCity, weather: data }]);
        setErrorState(null); // Clear any errors
        setError(""); // Clear error state in parent (if required)
      } else {
        setErrorState("City not found!");
        setError("City not found!");
      }
    } catch (err) {
      setErrorState("Error fetching weather data. Please try again later.");
      setError("Error fetching weather data. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (cityInput && cities.includes(cityInput)) {
      getWeatherData(cityInput); // Fetch weather for the searched city
    } else if (cityInput) {
      setErrorState("City not found! Please enter a valid city.");
      setError("City not found! Please enter a valid city.");
    }
  }, [cityInput, setError]);

  return (
    <div className="city-list">
      <h2>Weather in Major Cities</h2>
      {loading && <p>Loading weather data...</p>}
      {error || errorState ? <p className="error">{error || errorState}</p> : null}
      <div className="city-grid">
        {weatherData.map(({ city, weather }, index) => (
          <WeatherCard key={index} city={city} data={weather} />
        ))}
      </div>
    </div>
  );
};

export default CityList;
