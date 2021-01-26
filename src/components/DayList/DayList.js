import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Day from '../Day/Day';

const DayList = ({ weatherInfo }) => {
  if (!weatherInfo || !weatherInfo.length) return null;

  const days = weatherInfo.map(item => {
    return <Day key={item.dt} weatherInfo={item} />
  })

  return (
    <Accordion defaultActiveKey={weatherInfo[0].dt}>
      {days}  
    </Accordion>
  )
}

export default DayList;