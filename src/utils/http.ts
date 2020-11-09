import axios, {AxiosRequestConfig} from 'axios';
const CancelToken = axios.CancelToken;

const instance = axios.create({
    baseURL: '/api/v1',
    timeout: 10000
});

instance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
});

instance.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    return Promise.reject(err);
})

const sendRequest = (url: string, config?: AxiosRequestConfig) => {
    const signal = CancelToken.source();
    const promise = instance({
        url,
        ...(config || {}),
        cancelToken: signal.token
    })
    const cancellablePromise = { promise, _cancelToken: signal };
    return cancellablePromise;
}

export default sendRequest;
export const sendGet = (url: string, config: Partial<AxiosRequestConfig> = {}) => sendRequest(url, {...config, method: "GET"});
export const sendPost = (url: string, config: Partial<AxiosRequestConfig> = {}) => sendRequest(url, {...config, method: "POST"});
export const sendUpdate = (url: string, config: Partial<AxiosRequestConfig> = {}) => sendRequest(url, {...config, method: "PUT"});
export const sendDel = (url: string, config: Partial<AxiosRequestConfig> = {}) => sendRequest(url, {...config, method: "DELETE"});
