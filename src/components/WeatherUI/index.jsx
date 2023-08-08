import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import './style.css';
import { GrLocation } from 'react-icons/gr';
import { LiaTemperatureHighSolid } from 'react-icons/lia';
import { WiHumidity } from 'react-icons/wi';

function WeatherUI({ handleClickBack, weather }) {
  return (
    <>
      <div className='heading border '>
        <h2 className='heading-icon'>
          <HiArrowLeft className='icon' onClick={handleClickBack} />
          Weather App
        </h2>
      </div>
      <br />
      <div className='form-container border flex-column'>
        <img
          src={weather.current?.weather_icons[0]}
          width={100}
          placeholder='Weather icon'
        />

        <p className='temperature'>
          {weather.current?.temperature}
          <sup>o</sup> C
        </p>
        <p className='weather-desc'>{weather.current?.weather_descriptions}</p>
        <p className='location'>
          <GrLocation /> {weather.location?.name},&nbsp;
          {weather.location?.region}
        </p>
      </div>
      <div className='footer'>
        <div className='footer-left flex-column'>
          <div className='flex'>
            <LiaTemperatureHighSolid className='icon' />
            <div>
              <p className='value'>
                {weather.current?.feelslike}
                <sup>o</sup> C
              </p>
              <p>Feels like</p>
            </div>
          </div>
        </div>
        <div className='footer-right flex-column'>
          <div className='flex'>
            <WiHumidity className='icon' />
            <div>
              <p className='value'>{weather.current?.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherUI;
