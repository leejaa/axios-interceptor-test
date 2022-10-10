/* eslint-disable consistent-return */
import Router from 'next/router';
import axios, { AxiosError, AxiosResponse } from 'axios';
import mem from 'mem';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

const onFulfilled = (response: AxiosResponse) => response;

const getRefreshToken = mem(async () => {
    return new Promise((resolve, reject) => {
        client.post('/refresh', { refreshToken: localStorage.getItem('refreshToken') })
            .then((res: AxiosResponse) => {
                resolve('success');
            }).catch(() => {
                reject('fail');
            })
      });
  }, { maxAge: 1000 })

const redirectLoginPage = mem(() => {
    alert('로그인 세션이 만료되었습니다.');
    Router.push('/login');
  }, { maxAge: 1000 })

const onRejected = async (error: AxiosError) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (originalRequest) {
        if (status === 401) {
            try {
                const result = await getRefreshToken();
                if (result === 'success') {
                    return client.get(`${originalRequest.url}`)
                }
            } catch (error) {
                redirectLoginPage();
            }
        }
    }

  return Promise.reject(error);
};

client.interceptors.response.use(onFulfilled, onRejected);
export default client;
