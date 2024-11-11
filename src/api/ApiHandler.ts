import { EApiPaths } from '@/consts';
import axios, { Axios } from 'axios';

export const ApiHandler = (() => {
  let instance: { axiosInstance: Axios; };

  const createInstance = () => {
    const axiosInstance: Axios = axios.create({ baseURL: `${EApiPaths.BASE_PATH}`, timeout: 10000 });
    return { axiosInstance };
  };

  return {
    getInfo: async (username: string, gitSource: string = 'all') => {
      return await instance.axiosInstance.get(`${EApiPaths.USER}/${username}${EApiPaths.INFO}`, { params: { git_source: gitSource } });
    },
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
    getRepos: async (username: string, archived: boolean = false, gitSource: string = 'all') => {
      return await instance.axiosInstance.get(`${EApiPaths.USER}/${username}${EApiPaths.REPOS}`, { params: { archived: archived, git_source: gitSource } });
    }
  };
})();
