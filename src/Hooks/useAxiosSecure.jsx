import axios from 'axios';
import { useContext, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const useAxiosSecure = () => {
    const { user, signout, loading } = useContext(AuthContext);
    const navigate = useNavigate()
    const errorNotify = () =>
        toast.error('Unauthorized or Forbiden access logout status 401/403', {
            theme: "colored",
        });
    const axiosInstance = useMemo(() => {
        // return axios.create({ baseURL: 'https://blood-buddies-sarver.vercel.app', });
        return axios.create({ baseURL: 'http://localhost:3000/', });
    }, []);

    //   request interceptors =======================
    useEffect(() => {
        if (!loading && user?.accessToken) {
            // Add request interceptor
            const requestInterceptor = axiosInstance.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                    return config;
                }
            );
            // Add response interceptor
            const responseInterceptor = axiosInstance.interceptors.response.use(
                (res) => res,
                err => {
                    if (err.status === 401 || err.status === 403) {
                        signout().then(() => {
                            navigate('/login')
                            errorNotify()
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }
            );
            // Cleanup to prevent multiple interceptors on re-renders
            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor);
                axiosInstance.interceptors.response.eject(responseInterceptor);
            };
        }
    }, [user, loading]);

    return axiosInstance;
};

export default useAxiosSecure