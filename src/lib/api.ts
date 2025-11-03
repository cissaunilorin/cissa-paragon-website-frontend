import axios from "axios";
import { getAccessToken } from "./utils/token";

const apiClient = axios.create({
    baseURL:
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1` ||
        "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
