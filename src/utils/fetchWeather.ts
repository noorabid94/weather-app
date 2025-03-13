const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";  // Read API key from environment variables
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
    if (error instanceof Error) {
      console.error("Error fetching weather:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
    return null;
  }
};
