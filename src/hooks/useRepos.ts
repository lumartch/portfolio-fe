import { useApiHandler } from '@/api';
import { ApiType, GitSource } from '@/enums';
import { useEffect } from 'react';
import useSWR from 'swr';

export const useRepos = (gitSource: GitSource, username: string, archived: boolean) => {
    const { abortAll, getRepos } = useApiHandler();

    const { data: reposData, error: errorRepos, isLoading: isLoadingRepos }
        = useSWR([ApiType.PROFILE, gitSource, archived], async () => getRepos(username, archived, gitSource));

    useEffect(() => {
        return () => abortAll();
    }, []);

    return { errorRepos, isLoadingRepos, reposData };
};