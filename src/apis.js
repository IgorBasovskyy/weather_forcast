import axios from 'axios';

const weatherApiKey = 'f934f76302239c73f0b9d2473c3c901f';
const googleMapApiKey = 'AIzaSyAbwy3Ie0L5dS1YpI4decu4RvB4_2UYje0';

const getWeather = (lat, long) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${weatherApiKey}`);
}

const getCity = (lat, long) => {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleMapApiKey}`);
}

export default {
  getWeather,
  getCity
}
