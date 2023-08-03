import axios from 'axios';
import { AuthResponse } from '../../types/models';
import localforage from 'localforage';
import {
  setAuthStatusMessage,
  setErrorServerMessage,
} from '../../store/errors';

export const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await localforage
    .getItem<{ access: string; username: string }>('token')
    .then((res) => res?.access)}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await $api.post<AuthResponse>(
          `${process.env.REACT_APP_API_URL}/auth/jwt/refresh`,
          { withCredentials: true },
        );
        localforage.setItem('token', {
          username: response.data.username,
          access: response.data.access,
        });
        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
        localforage.removeItem('token');
        setAuthStatusMessage(true);
      }
    }
    throw error;
  },
);

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (
      error.response.status >= 500 &&
      error.config &&
      !error.config._isRetry
    ) {
      setErrorServerMessage(true);
    }
    throw error;
  },
);
