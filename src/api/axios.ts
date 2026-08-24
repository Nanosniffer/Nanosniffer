import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3500, // Quick timeout to seamlessly activate fallback dummy data if backend is offline
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Agent': 'AEGIS-Tactical-UI/2.0',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Attach auth token if available
    const token = localStorage.getItem('aegis_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log network failure info for debugging while allowing graceful fallback in caller
    console.warn(`[A.E.G.I.S. API Engine] Backend unreachable at ${error.config?.url || 'endpoint'}. Seamlessly engaging local telemetry cache & fallback data.`);
    return Promise.reject(error);
  }
);
