import axios from 'axios';

const apiSteam = axios.create({
  baseURL: 'https://api.steampowered.com',
});

export default apiSteam;
