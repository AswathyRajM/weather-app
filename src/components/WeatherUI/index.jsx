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
          src={`${process.env.REACT_APP_IMG_URL}${weather.weather[0].icon}@4x.png`}
          width={100}
          alt='Weather icon'
        />

        <p className='temperature'>
          {weather.main.temp}
          <sup>o</sup> C
        </p>
        <p className='weather-desc'>{weather.weather[0].main}</p>
        <p className='location'>
          <GrLocation /> {weather.name},&nbsp;{weather.sys.country}
        </p>
      </div>
      <div className='footer'>
        <div className='footer-left flex-column'>
          <div className='flex'>
            <LiaTemperatureHighSolid className='icon' />
            <div>
              <p className='value'>
                {weather.main.feels_like}
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
              <p className='value'>{weather.main.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherUI;
