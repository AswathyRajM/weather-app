import axios from 'axios';

export const getWeather = async (query) => {
  return await axios
    .get(`/current`, {
      params: {
        access_key: process.env.REACT_APP_API_KEY,
        query,
      },
      withCredentials: false,
    })
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e;
    });
};
