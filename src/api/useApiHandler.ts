import { ApiPathsRecord } from '@/consts';
import { ApiPaths } from '@/enums';
import { IProfile, IProject } from '@/interfaces';
import axios, { Axios } from 'axios';

export const useApiHandler = () => {
    const instance: Axios = axios.create({ baseURL: `${ApiPathsRecord[ApiPaths.BASE_PATH]}`, timeout: 10000 });
    const controller = new AbortController();

    return {
        abortAll: () => {
            return controller.abort();
        },
        getInfo: async (username: string, gitSource: string = 'all') => {
            return await instance.get<IProfile>(
                `${ApiPathsRecord[ApiPaths.USER]}/${username}${ApiPathsRecord[ApiPaths.INFO]}`,
                { params: { git_source: gitSource }, signal: controller.signal });
        },
        getRepos: async (username: string, archived: boolean = false, gitSource: string = 'all') => {
            return await instance.get<IProject[]>(
                `${ApiPathsRecord[ApiPaths.USER]}/${username}${ApiPathsRecord[ApiPaths.REPOS]}`,
                { params: { archived: archived, git_source: gitSource }, signal: controller.signal });
        }
    };
};
