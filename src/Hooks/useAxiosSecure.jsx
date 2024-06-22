import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContextProvider";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        // Add a request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    console.log('Attaching token to request:', token); // Debug log
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Add a response interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const status = error.response ? error.response.status : null;
                if (status === 403) {
                    // console.log('Unauthorized or forbidden, logging out'); 
                    // await logOut();
                    // navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        // Eject interceptors on cleanup
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
