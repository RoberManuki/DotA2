import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.steampowered.com',
});

export default api;
