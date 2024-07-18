import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Tạo một instance của axios với headers mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Thêm interceptor để thêm token vào tất cả các request
axiosInstance.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
