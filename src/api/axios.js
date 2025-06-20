import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL_GO,
});

axios.interceptors.request.use(
  (config) => {
    // const { token = '9u3u902u9u03290u329u0' } = useAuth();
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    // if (config.headers['Content-Type'] === 'multipart/form-data') {
    //   return config;
    // }

    // Set default headers for all requests
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       useAuthStore.getState().logout();
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;
