import React from 'react';

import Location from '../Location/Location';
import DayList from '../DayList/DayList';

import './Main.css';

const Main = (props) => {
  if (!props) return null;

  const { weatherInfo, city } = props;
  
  return (
    <main>
      <Location city={city} />
      <DayList weatherInfo={weatherInfo} />
    </main>
  )
}

export default Main;