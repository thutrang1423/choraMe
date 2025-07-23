import axios from 'axios';
const  API_URL = "";
const serverInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
});

serverInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  (error) => Promise.reject(error)
);

serverInstance.interceptors.response.use(
  (response) => {
    switch (response.status) {
      default:
        return response;
    }
  },
  (error) => Promise.reject(error)
);

export default serverInstance;
