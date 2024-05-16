import axios from 'axios';

const auth = axios.create({
    baseURL: 'http://localhost:3000/auth',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})