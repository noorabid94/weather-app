const API_KEY = "9cd16722bc23439f9e511453251303";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

export const fetchWeather = async (city: string) => {
  try {
    if (!API_KEY) {
      console.error("API Key is missing! Check your environment variables.");
      return null;
    }

    const formattedCity = encodeURIComponent(`${city.trim()}, PK`);
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${formattedCity}&aqi=no`);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error(errorResponse.error?.message || "City not found.");
    }

    const data = await response.json();
    return data?.current
      ? {
          temp_c: data.current.temp_c,
          condition: data.current.condition,
          humidity: data.current.humidity,
          wind_kph: data.current.wind_kph,
        }
      : null;
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    return null;
  }
};
