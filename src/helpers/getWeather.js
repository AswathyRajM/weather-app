import axios from 'axios';

export const getWeather = async (query) => {
   await axios
    .get(`${process.env.REACT_APP_API_URL}/current`, {
      params: {
        access_key: process.env.REACT_APP_API_KEY,
        query,
      },
    })

    .then((res) => res.json())
     .then((result) => {
      console.log(result);
      return { result, error: null };
    })
    .catch((e) => {
      return { error: e };
    });
};
