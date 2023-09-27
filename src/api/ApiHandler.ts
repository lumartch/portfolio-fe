import axios, { Axios } from "axios";

import { SERVER_URI, EApiPaths } from "@/const";

export const ApiHandler = (() => {
    let instance: any;
    const createInstance = () => {
        const axiosInstance: Axios = axios.create({ baseURL: `${SERVER_URI}${EApiPaths.BASE_PATH}`, timeout: 10000 });
        return { axiosInstance };
    }

    return {
        getInstance: () => {
            if(!instance) {
                instance = createInstance();
            }
            return instance;
        },
        getInfo: async (username: string, gitSource: string = 'all') => {
            return await instance.axiosInstance.get(`${EApiPaths.USER}/${username}${EApiPaths.INFO}`, { params: {git_source: gitSource} });
        },
        getRepos: async (username: string, archived: Boolean = false, gitSource: string = 'all') => {
            return await instance.axiosInstance.get(`${EApiPaths.USER}/${username}${EApiPaths.REPOS}`, { params: {archived: archived, git_source: gitSource} });
        }
    };
})();
