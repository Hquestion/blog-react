import {useEffect, useState} from 'react';
import axios, {AxiosRequestConfig} from 'axios';
const CancelToken = axios.CancelToken;

const instance = axios.create({
    baseURL: '/api/v1',
    timeout: 10000
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('authToken');
    return config;
}, (err) => {
    return Promise.reject(err);
});

instance.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    return Promise.reject(err);
})

function useAxios(url: string, config?: Partial<AxiosRequestConfig>) {
    const [result, setResult]: [any, Function] = useState();
    const [loading, setLoading] = useState(false);
    const signal = CancelToken.source();
    useEffect(() => {
        setLoading(true);
        instance({
            url,
            ...(config || {}),
            cancelToken: signal.token
        }).then((res) => {
            setResult(res);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        return () => signal.cancel('request cancelled');
    }, []);

    return {
        result,
        loading
    };
}

export default useAxios;
export const useGet = (url: string, config: Partial<AxiosRequestConfig>) => useAxios(url, {...config, method: "GET"});
export const usePost = (url: string, config: Partial<AxiosRequestConfig>) => useAxios(url, {...config, method: "POST"});
export const useUpdate = (url: string, config: Partial<AxiosRequestConfig>) => useAxios(url, {...config, method: "PUT"});
export const useDel = (url: string, config: Partial<AxiosRequestConfig>) => useAxios(url, {...config, method: "DELETE"});
