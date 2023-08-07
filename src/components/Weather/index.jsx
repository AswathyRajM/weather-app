import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Loader from '../Loader';

function Weather() {
  const [locationError, setLocationError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(null);

  const getWeather = async (query) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/current`, {
        params: {
          access_key: process.env.REACT_APP_API_KEY,
          query: 'New york',
        },
      })

      .then((res) => res.json())
      .then((result) => {
        setWeatherData(result);
      })
      .catch((e) => {
        setError(e);
      });
  };

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocationError(false);
          getWeather(`${latitude},${longitude}`);
        },
        (e) => {
          setLocationError(
            'Error getting location. Please allow location access or try again later.'
          );
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
    setIsLoading(false);
  };
  console.log(process.env);

  const handleInputChange = (eCity) => {
    setCity(eCity.toString());
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      getWeather(`${city}`);
    }, 500);
    setTimer(newTimer);
  };

  return (
    <div className='container'>
      <div className='weather-container'>
        <div className='heading border'>
          <h2>Weather App</h2>
        </div>
        <br />
        <div className='form-container'>
          <div className='form'>
            <input
              type='text'
              id='input'
              placeholder='Enter city name'
              onChange={(e) => {
                handleInputChange(e.target.value);
              }}
            />

            <div className='border-container border'>
              <span className='border-text'>or</span>
            </div>

            <button className='btn' onClick={getLocation}>
              Get Device Location
            </button>
            {locationError && alert(locationError)}
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default Weather;
