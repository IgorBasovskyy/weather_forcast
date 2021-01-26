import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Spinner from './components/Spinner/Spinner';
import Error from './components/Error/Error';

import weatherApi from '../src/apis';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [geolocationPermission, setGeolocationPermission] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [city, setCity] = useState(null);
  const [isLoad, setLoad] = useState(true);
  const [isError, setIsError] = useState(false)
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { longitude, latitude } = position.coords;

        const getWeather = weatherApi.getWeather(latitude, longitude);
        const getCity = weatherApi.getCity(latitude, longitude);

        Promise.all([getWeather, getCity])
          .then(([weatherData, cityData]) => {
            setLoad(false);
            getCityFromCityData(cityData);
            getNeededDataFromWeatherData(weatherData);
          })
          .catch(error => {
            setLoad(false);
            setIsError(true);
            console.error(error.message);
          });
      },
      error => {
        setGeolocationPermission(true);
        setLoad(false);
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );    
  }, []);

  const getCityFromCityData = (cityData) => {
    const addressComponent = cityData.data.results[0].address_components.find(({ types }) => types.includes('locality'));
    const cityName = addressComponent.long_name;
    setCity(cityName);
  }

  const getNeededDataFromWeatherData = (weatherData) => {
    const { current, daily } = weatherData.data;
    
    daily.shift();

    setWeatherInfo([{
      ...current,
      isCurrent: true
    },
      ...daily
    ]);
  }

  const disabledGeolocation = (
    <h6>Geolocation has been disabled by user. Please provide access to your geolocation if you want to use weather app.</h6>
  )

  let main;

  if (isLoad) {
    main = <Spinner />
  } else if (isError) {
    main = <Error />
  } else {
    main = geolocationPermission ? disabledGeolocation : <Main city={city} weatherInfo={weatherInfo} />
  }
  
  return (
    <div className="App">
      <Header />
      { main }
    </div>
  );
}

export default App;
