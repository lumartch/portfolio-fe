import { ApiPathsRecord } from '@/consts';
import { ApiPaths } from '@/enums';
import axios, { Axios } from 'axios';

export const ApiHandler = (() => {
    let instance: { axiosInstance: Axios; };

    const createInstance = () => {
        const axiosInstance: Axios = axios.create({ baseURL: `${ApiPathsRecord[ApiPaths.BASE_PATH]}`, timeout: 10000 });
        return { axiosInstance };
    };

    return {
        getInfo: async (username: string, gitSource: string = 'all') => {
            return await instance.axiosInstance.get(`${ApiPathsRecord[ApiPaths.USER]}/${username}${ApiPathsRecord[ApiPaths.INFO]}`, { params: { git_source: gitSource } });
        },
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        getRepos: async (username: string, archived: boolean = false, gitSource: string = 'all') => {
            return await instance.axiosInstance.get(`${ApiPathsRecord[ApiPaths.USER]}/${username}${ApiPathsRecord[ApiPaths.REPOS]}`, { params: { archived: archived, git_source: gitSource } });
        }
    };
})();
