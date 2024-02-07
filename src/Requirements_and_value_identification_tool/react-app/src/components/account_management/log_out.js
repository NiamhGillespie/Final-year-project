import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL_SHORT, SHORT_URL } from '../../constants';
export const LogOut = () => {
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post(
                    SHORT_URL + 'logout/',
                    {
                        refresh_token: localStorage.getItem('refresh_token')
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    },
                    { withCredentials: true }
                );

                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login';
            } catch (e) {
                console.log('logout error:', e);
            }
        })();
    }, []);
    return <></>;
};
