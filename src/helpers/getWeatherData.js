import axios from 'axios';

export const getWeather = async (query) => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/data/2.5/weather`, {
      params: {
        appid: process.env.REACT_APP_API_ID,
        q: query,
        units: 'metric',
      },
    })
    .then((result) => {
      return result.data;
    })
    .catch((e) => {
      throw e;
    });
};
