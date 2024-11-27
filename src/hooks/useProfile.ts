import { useApiHandler } from '@/api';
import { ApiType, GitSource } from '@/enums';
import useSWR from 'swr';

export const useProfile = (gitSource: GitSource, username: string) => {
    const { getInfo } = useApiHandler();

    const { data: profileData, error: errorProfile, isLoading: isLoadingProfile }
        = useSWR([ApiType.PROFILE, gitSource], async () => getInfo(username, gitSource));

    return { errorProfile, isLoadingProfile, profileData };
};