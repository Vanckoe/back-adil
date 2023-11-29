import axios from 'axios'
import authService from '@/services/auth.service';
import router from '@/router'

const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT || "http://127.0.0.1:8000/api";

let httpClient = axios.create({
    baseURL: API_ENDPOINT
});

httpClient.interceptors.request.use(config => {
    const token = authService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(response => {
    return response;
}, async error => {
    if (error.response && error.response.status === 401) {
        await authService.logout();
    }
    if (error.response && error.response.status === 403) {
        await router.push({name: 'noAccess'});
    }
    return Promise.reject(error);
});

export default httpClient;
