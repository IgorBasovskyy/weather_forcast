import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { format } from 'date-fns';

import './Day.css';

const Day = (props) => {

  if (!props) return null;

  const { weatherInfo } = props;
  const { clouds, feels_like, temp, dt, humidity, wind_speed, weather, pressure } = weatherInfo;
  
  const formattedTime = format(new Date(dt * 1000), 'eeee, d LLL');

  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle className="acc-header" as={Button} variant="light" eventKey={dt}>
          <h3>
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt={weather[0].main} />
            {formattedTime}
          </h3>
          {
            !weatherInfo.isCurrent &&
            <div className="temperature-wrap">
              <h4>
                {Math.round(temp.day)}&#176;
              </h4>
              <h4 className="feels-like">
                {Math.round(feels_like.day)}&#176;
              </h4>
            </div>
          }
          {
            weatherInfo.isCurrent &&
            <div className="temperature-wrap">
              <h4>
                {Math.round(temp)}&#176;
              </h4>
              <h4 className="feels-like">
                {Math.round(feels_like)}&#176;
              </h4>
            </div>
          }
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={dt}>
        <Card.Body>
          <Container fluid className="px-0">
            {
              !weatherInfo.isCurrent &&
              <>
                <Row className="mx-0">
                  <Col lg={12}>
                    <h3>
                      Temperature:
                    </h3>
                  </Col>
                  <Col lg={4}>
                    <h5>Morning:</h5>
                    <h5 className="info-value">
                      {Math.round(temp.morn)}&#176;
                    </h5>
                  </Col>
                  <Col lg={4}>
                    <h5>Evening:</h5>
                    <h5 className="info-value">
                      {Math.round(temp.eve)}&#176;
                    </h5>
                  </Col>
                  <Col lg={4}>
                    <h5>Night:</h5>
                    <h5 className="info-value">
                      {Math.round(temp.night)}&#176;
                    </h5>
                  </Col>
                </Row>
                <Row className="mx-0">
                  <Col lg={12}>
                    <h3>
                      Feels like:
                    </h3>
                  </Col>
                  <Col lg={4}>
                    <h5>Morning:</h5>
                    <h5 className="info-value">
                      {Math.round(feels_like.morn)}&#176;
                    </h5>
                  </Col>
                  <Col lg={4}>
                    <h5>Evening:</h5>
                    <h5 className="info-value">
                      {Math.round(feels_like.eve)}&#176;
                    </h5>
                  </Col>
                  <Col lg={4}>
                    <h5>Night:</h5>
                    <h5 className="info-value">
                      {Math.round(feels_like.night)}&#176;
                    </h5>
                  </Col>
                </Row>
              </>
            }
            <Row className="mx-0">
              <Col lg={6}>
                <h5>Cloudnes</h5>
                <h5 className="info-value">{clouds}%</h5>
              </Col>
              <Col lg={6}>
                <h5>Humidity</h5>
                <h5 className="info-value">{humidity}%</h5>
              </Col>
              <Col lg={6}>
                <h5>Wind</h5>
                <h5 className="info-value">{wind_speed} m/s</h5>
              </Col>
              <Col lg={6}>
                <h5>Pressure</h5>
                <h5 className="info-value">{pressure} hPa</h5>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default Day;