import axios from 'axios';

const apiOpenDoto = axios.create({
  baseURL: 'https://api.opendota.com/api',
});

export default apiOpenDoto;
