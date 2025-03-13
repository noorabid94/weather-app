import "@/styles/WeatherForecast.css";

const WeatherForecast = () => {
  const dummyData = [
    { day: "Mon", temp: "24°C" },
    { day: "Tue", temp: "22°C" },
    { day: "Wed", temp: "20°C" },
    { day: "Thu", temp: "18°C" },
    { day: "Fri", temp: "25°C" },
    { day: "Sat", temp: "27°C" },
    { day: "Sun", temp: "26°C" },
  ];

  return (
    <div className="forecast">
      <h3>Next 7 Days</h3>
      <div className="forecast-list">
        {dummyData.map((day) => (
          <div key={day.day} className="forecast-item">
            <p>{day.day}</p>
            <h4>{day.temp}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
