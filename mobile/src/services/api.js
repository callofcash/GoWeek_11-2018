import axios from 'axios';

const ipAndroid = "10.0.2.2";
const ipGenymotion = "10.0.3.2";
const ipHome = "http://192.168.0.107";

const api = axios.create({
    baseURL: ipHome + ":3000"
})

export default api;