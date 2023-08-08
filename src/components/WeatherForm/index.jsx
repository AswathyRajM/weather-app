import React, { useState } from 'react';
import './style.css';
import Loader from '../Loader';
import { getWeather } from '../../helpers/getWeatherData';
import ErrorComponent from '../ErrorComponent';
import WeatherUI from '../WeatherUI';

function Weather() {
  const [locationError, setLocationError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [timer, setTimer] = useState(null);

  const getWeatherhandler = async (query) => {
    try {
      let result = await getWeather(query);
      if (result.cod !== 200) {
        if (result.cod === 404) {
          setInputError('City not found!');
          setIsLoading(false);
        } else throw new Error(result);
      } else setWeatherData(result);
    } catch (e) {
      setError('Something went wrong please try again later');
    }
    setIsLoading(false);
  };

  const getLocation = () => {
    setInputError(false);
    setError(false);
    setLocationError(false);
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getWeatherhandler(`${latitude},${longitude}`);
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

  const handleClickBack = () => {
    setWeatherData(null);
  };

  const handleInputChange = (city) => {
    setInputError(false);
    setIsLoading(false);
    setError(false);
    setLocationError(false);
    if (city.length === 0) {
      setIsLoading(false);
      clearTimeout(timer);
      return;
    }
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setIsLoading(true);
      getWeatherhandler(`${city}`);
    }, 1000);
    setTimer(newTimer);
  };

  return (
    <div className='container'>
      <div className='weather-container'>
        {weatherData ? (
          <WeatherUI handleClickBack={handleClickBack} weather={weatherData} />
        ) : (
          <>
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
                {inputError && <ErrorComponent errMsg={inputError} />}
                <div className='border-container border'>
                  <span className='border-text'>or</span>
                </div>

                <button className='btn' onClick={getLocation}>
                  Get Device Location
                </button>
                {error && <ErrorComponent errMsg={error} />}

                {locationError && alert(locationError)}
              </div>
            </div>
          </>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default Weather;
