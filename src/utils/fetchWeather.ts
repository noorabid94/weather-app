const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; 
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

export const fetchWeather = async (city: string) => {
  try {
    if (!API_KEY) {
      throw new Error("API Key is missing! Check your environment variables.");
    }

    const formattedCity = encodeURIComponent(`${city.trim()}, PK`);
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${formattedCity}&aqi=no`);

    if (!response.ok) {
      console.error("API Error Response:", await response.text());
      throw new Error("City not found. Please enter a valid location.");
    }

    const data = await response.json();
    return data?.current ? {
      temp_c: data.current.temp_c,
      condition: data.current.condition,
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph,
    } : null;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
