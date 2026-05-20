import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // batasi waktu tunggu 10 detik
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;