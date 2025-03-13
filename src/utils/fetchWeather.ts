const API_KEY = "739ebe1e630e4e6591b194928250103"; // Ensure this is correct
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

export const fetchWeather = async (city: string) => {
  try {
    const formattedCity = encodeURIComponent(`${city.trim()}, PK`); // Ensure city is correctly formatted
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${formattedCity}&aqi=no`);

    if (!response.ok) {
      const errorText = await response.text(); // Log API response
      console.error("API Error Response:", errorText);
      throw new Error("City not found. Please enter a valid location.");
    }

    const data = await response.json();

    if (!data || !data.current) {
      throw new Error("Invalid API response");
    }

    return {
      temp_c: data.current.temp_c,
      condition: data.current.condition, // Weather condition text & icon
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null; // Return null to avoid crashing the UI
  }
};
