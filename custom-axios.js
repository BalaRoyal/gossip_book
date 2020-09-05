import axios from "axios";
import { AsyncStorage } from "react-native";

const BASE_URL =
  "http://gbookapi-env-1.eba-5hrqc52f.us-east-1.elasticbeanstalk.com/api";

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

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
