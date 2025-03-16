import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    const apiKey = '322951aa0821e50fb31830772be8b652';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App (Modern React)</h1>
        <div>
          <input 
            type="text" 
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>
        <div className="weather-result">
          {error && <p>{error}</p>}
          {weather && (
            <div>
              <p><strong>{weather.name}</strong></p>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
