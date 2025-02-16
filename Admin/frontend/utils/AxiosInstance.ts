import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 10000,
  timeoutErrorMessage: "Request Timeout",
  headers: {
    "Content-type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default AxiosInstance;
