import { refresh } from '@/features/auth/services/auth.service';
import axios from 'axios';
import Router from 'next/router';
import {
  setAuthState,
  setUserEmail,
  setUserFirstName,
  setUserGender,
  setUserHomeAddress,
  setUserLastName,
  setUserRole,
} from '../store/slices/authSlice';
import { store } from '../store/store';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    let retValue;
    if (
      response?.status === 401 &&
      (originalRequest.url.includes('logout') ||
        !originalRequest.url?.includes('auth'))
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        await refresh()
          .then(async (res) => {
            isRefreshing = false;
            const setHeaders = async () => {
              api.defaults.headers.common.Authorization =
                'Bearer ' + res.data.access;
              originalRequest.headers.Authorization =
                'Bearer ' + res.data.access;
            };
            return await setHeaders().then(async () => {
              retValue = Promise.resolve(api(originalRequest));
            });
          })
          .catch((err) => {
            store.dispatch(setAuthState(false));
            store.dispatch(setUserEmail(null));
            store.dispatch(setUserFirstName(null));
            store.dispatch(setUserLastName(null));
            store.dispatch(setUserRole(null));
            store.dispatch(setUserGender(null));
            store.dispatch(setUserHomeAddress(null));
          });

        return retValue;
      }
    } else if (response?.status === 403) {
      Router.replace('/');
      return Promise.reject(error);
    } else if (
      Router.pathname.includes('login') ||
      Router.pathname.includes('signup')
    ) {
      return Promise.reject(error);
    } else {
      Router.push('/');
      return Promise.reject(error);
    }
  }
);

export default api;
