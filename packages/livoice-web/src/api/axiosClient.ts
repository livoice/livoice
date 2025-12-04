import env from '../config/env';

import Axios, { type AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: env.VITE_API_URL
});

type CancelablePromise<T> = Promise<T> & { cancel(): void };

export const axiosClient = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): CancelablePromise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    },
    cancelToken: source.token
  }).then(({ data }) => data) as CancelablePromise<T>;

  promise.cancel = () => source.cancel('Query was cancelled by React Query');

  return promise;
};

export default axiosClient;
