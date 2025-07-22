import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Node.js backend
});

export default API;
