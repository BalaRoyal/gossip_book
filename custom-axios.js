import axios from 'axios';
import { AsyncStorage } from 'react-native';

const BASE_URL = "http://31.220.51.26/api";

// Create and export default axios instance.

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosWithAuth = axios.create({
  baseURL: BASE_URL,
});

axiosWithAuth.interceptors.request.use(
  async (config) => {
    let data = await AsyncStorage.getItem("userData");
    data = JSON.parse(data);
    const token = data.token;

    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    config.headers["Content-Type"] = "multipart/form-data";
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
