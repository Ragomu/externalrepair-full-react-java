import axios from 'axios';
import { CLIENT_ID } from '~/utils';
import {
  addAuthHeaders,
  successResponse,
  verifyExpiredToken,
} from './interceptors';

// export const API_BASE_URL =
//   'https://dev-externalrepair-back-java-186726132534.us-east1.run.app';

export const API_BASE_URL = import.meta.env.VITE_BASE_PATH || 'http://localhost:8080';


const defaultConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'client-id': CLIENT_ID || 'externalrepair-front',
  },
  timeout: 15000,
};

export const request = axios.create(defaultConfig);
export const authRequest = axios.create(defaultConfig);

request.interceptors.request.use(addAuthHeaders);
request.interceptors.response.use(successResponse, verifyExpiredToken);

authRequest.interceptors.response.use(successResponse);

export default request;
