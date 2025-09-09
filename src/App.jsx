  import { useEffect, useState } from 'react'
  import './App.css'

  function App() {
    const [city, setCity] = useState('London');
    const [weather, setWeather] = useState(null);
    
  useEffect(() => {

      const getWeather = async () => {
        try {
          const response = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6b6ab8b4721a0f34809ebff0bd7e3f1&units=metric`
          );
          console.log('Ответ fetch:', response);
          const data = await response.json();
          console.log('Данные погоды:', data);
          setWeather(data);
        } catch (error) {
          console.error('Ошибка при получении погоды:', error);
        }
      };

      getWeather();
    }, [city]);

    const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements.cityInput;
    if (input.value.trim() !== '') {
      setCity(input.value.trim()); 
      input.value = ''; 
    }
  };
    
    if (!weather) return <p>Загрузка...</p>;

    let temp = weather.main.temp
    temp = Math.round(temp)
    return (
      <>
        <div className="container">
            <h1>WeatherApp</h1>

          <form onSubmit={handleSearch} action="search">
            <input name="cityInput" type="text" placeholder='Search city...' />
            <button type="submit">🔍</button>
          </form>
          <div className="weather_result">
            <h2>{weather.name}</h2>
            <h5>Today</h5>
            <h3 className="weatherEmoji">
              { 
                weather.weather[0].main === "Clouds" ? "🌥️" :
                weather.weather[0].main === "Clear" ? "☀️" :
                weather.weather[0].main === "Rain" ? "🌧️" :
                weather.weather[0].main === "Drizzle" ? "🌦️" :
                weather.weather[0].main === "Mist" ? "🌁" :
                weather.weather[0].main === "Snow" ? "❄️" :
                ""
              }
            </h3>  

            <h3>{temp}<span>°C</span></h3>
            <h4>{weather.weather[0].description}</h4>
            <div className="weatherData">
              <div className="dataInfo">
                <h5 className="data_tittle">
                  <span>💧</span> Humidity
                </h5>
                <h5 className="data_value">{weather.main.humidity}%</h5>
              </div>
              <div className="dataInfo">
                <h5 className="data_tittle">
                  <span>💨</span> Wind
                </h5>
                <h5 className="data_value">{weather.wind.speed}km/h</h5>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  export default App
