import axios from "axios";
import { AsyncStorage } from "react-native";

const BASE_URL =
  "http://gossipbookapi-env.eba-dfbzg3ss.us-east-1.elasticbeanstalk.com/api";
const BASE_LOCAL_URL = "https://e531d2a38fae.ngrok.io/api";
// Get authentication token from the async storage

// Create and export default axios instance.

export default axios.create({
  baseURL: BASE_LOCAL_URL,
});

export const axiosWithAuth = axios.create({
  baseURL: BASE_LOCAL_URL,
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
