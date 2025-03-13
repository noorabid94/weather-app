const API_KEY = "739ebe1e630e4e6591b194928250103";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

export const fetchWeather = async (city: string) => {
  try {
    // Normalize city name (remove spaces, capitalize first letter)
    const formattedCity = encodeURIComponent(city.trim().replace(/\b\w/g, (c) => c.toUpperCase()));

    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${formattedCity}&aqi=no`);

    if (!response.ok) {
      console.error("API Error:", await response.text());
      throw new Error("City not found. Please enter a valid location.");
    }

    const data = await response.json();

    if (!data || !data.current) {
      throw new Error("Invalid API response");
    }

    return {
      temp_c: data.current.temp_c,
      condition: data.current.condition,
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null; // Prevents UI from breaking
  }
};
