import { useApiHandler } from '@/api';
import { ApiType, GitSource } from '@/enums';
import useSWR from 'swr';

export const useRepos = (gitSource: GitSource, username: string, archived: boolean) => {
    const { getRepos } = useApiHandler();

    const { data: reposData, error: errorRepos, isLoading: isLoadingRepos }
        = useSWR([ApiType.PROFILE, gitSource, archived], async () => getRepos(username, archived, gitSource));

    return { errorRepos, isLoadingRepos, reposData };
};