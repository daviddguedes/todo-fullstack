import axios from 'axios';

const host = `http://localhost:8888`;

const api = axios.create({
    baseURL: host
});

export default api;