import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Named import because default export isn’t available

// Initial state
const initialState = {
  city: '',
  weather: null,
  error: ''
};

// Action Types
const SET_CITY = 'SET_CITY';
const SET_WEATHER = 'SET_WEATHER';
const SET_ERROR = 'SET_ERROR';

// Action Creators
export const setCity = (city) => ({ type: SET_CITY, payload: city });
export const setWeather = (weather) => ({ type: SET_WEATHER, payload: weather });
export const setError = (error) => ({ type: SET_ERROR, payload: error });

// Async Action to Fetch Weather Data
export const fetchWeather = (city) => async (dispatch) => {
  const apiKey = '322951aa0821e50fb31830772be8b652'; // Free OpenWeatherMap API key
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    dispatch(setWeather(data));
    dispatch(setError(''));
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(setWeather(null));
  }
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITY:
      return { ...state, city: action.payload };
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
