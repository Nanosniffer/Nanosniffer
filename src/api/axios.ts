import axios from 'axios';

// Dynamically determine API Base URL
export const getDefaultApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('aegis_api_base_url');
    if (custom) return custom;
    if (window.location.port === '8000') return '/api';
  }
  const envApiUrl = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL;
  return envApiUrl || 'http://localhost:8000/api';
};

export let API_BASE_URL = getDefaultApiBaseUrl();

export const setApiBaseUrl = (newUrl: string) => {
  API_BASE_URL = newUrl;
  apiClient.defaults.baseURL = newUrl;
  if (typeof window !== 'undefined') {
    localStorage.setItem('aegis_api_base_url', newUrl);
  }
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Agent': 'AEGIS-Tactical-UI/2.0',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Dynamically refresh base url in case localStorage changed
    const currentBase = getDefaultApiBaseUrl();
    if (config.baseURL !== currentBase) {
      config.baseURL = currentBase;
    }
    const token = localStorage.getItem('aegis_auth_token');
    if (token && token !== 'false') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn(`[A.E.G.I.S. API Engine] Backend response error at ${error.config?.url || 'endpoint'}. Engaging fallback logic.`);
    return Promise.reject(error);
  }
);
