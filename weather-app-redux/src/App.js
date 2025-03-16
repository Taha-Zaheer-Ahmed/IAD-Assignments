import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCity, fetchWeather } from './store';
import './App.css';

function App() {
  const { city, weather, error } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setCity(e.target.value));
  };

  const getWeather = () => {
    dispatch(fetchWeather(city));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App (Redux)</h1>
        <div>
          <input 
            type="text"
            value={city}
            onChange={handleInputChange}
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
