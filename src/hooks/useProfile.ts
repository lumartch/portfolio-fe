import { useApiHandler } from '@/api';
import { ApiType, GitSource } from '@/enums';
import { useEffect } from 'react';
import useSWR from 'swr';

export const useProfile = (gitSource: GitSource, username: string) => {
    const { abortAll, getInfo } = useApiHandler();

    const { data: profileData, error: errorProfile, isLoading: isLoadingProfile }
        = useSWR([ApiType.PROFILE, gitSource], async () => getInfo(username, gitSource));

    useEffect(() => {
        return () => abortAll();
    }, []);

    return { errorProfile, isLoadingProfile, profileData };
};