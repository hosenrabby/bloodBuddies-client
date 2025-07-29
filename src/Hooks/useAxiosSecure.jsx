import axios from 'axios';
import { useContext, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';

const useAxiosSecure = () => {
    const { user, signout, loading } = useContext(AuthContext);
    const errorNotify = () =>
        toast.error('Unauthorized or Forbiden access logout status 401/403', {
            theme: "colored",
        });
    const axiosInstance = useMemo(() => {
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


    // useEffect(() => {
    //     const interceptor = axiosInstance.interceptors.request.use(config => {
    //         config.headers.authorization = `Bearer ${user?.accessToken}`;
    //         return config;
    //     });
    //     //   response interceptors =========================
    //     const resInterceptor = axiosInstance.interceptors.response.use(res => {
    //         return res;
    //     }, err => {
    //         if (err.status === 401 || err.status === 403) {
    //             signout().then(() => {
    //             errorNotify()
    //             }).catch((err) => {
    //                 console.log(err)
    //             })
    //         }
    //     }
    //     )

    //     return () => {
    //         axiosInstance.interceptors.request.eject(interceptor);
    //         axiosInstance.interceptors.response.eject(resInterceptor);
    //     };
    // }, [user?.accessToken]);

    return axiosInstance;
};

export default useAxiosSecure