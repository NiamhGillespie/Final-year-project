import axios from 'axios';
import { LogIn } from '../components/account_management/log_in';
let refresh = false;
axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        console.log('ERROR IS', error.response.status, error);
        if (error.response.status === 401 && !refresh && error.response.status !== undefined) {
            refresh = true;

            const response = await axios.post(
                'http://localhost:8000/token/refresh/',
                { refresh: localStorage.getItem('refresh_token') },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                { withCredentials: true }
            );
            console.log('response is', response.status);
            if (response.status === 200 && response.status !== undefined) {
                console.log('200 response found');
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                return axios(error.config);
            }
        }
        refresh = false;
        return error;
    }
);
