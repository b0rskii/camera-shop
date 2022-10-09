import axios, { AxiosError, AxiosInstance } from 'axios';
import { processErrorHandle } from './process-error-handle';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error) {
        processErrorHandle(error.message);
      }

      throw error;
    }
  );

  return api;
};
