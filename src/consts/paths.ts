import { ApiPaths, PagePaths } from '@/enums';

export const PathsRecord: Record<PagePaths, string> = {
    [PagePaths.ABOUT]: '/about',
    [PagePaths.CONTACT]: '/contact',
    [PagePaths.HOME]: '/',
    [PagePaths.PROJECTS]: '/projects'
};

export const PAGE_PATHS_AND_LABELS = [
    { label: 'Home', url: PathsRecord[PagePaths.HOME] },
    { label: 'Projects', url: PathsRecord[PagePaths.PROJECTS] },
    { label: 'About', url: PathsRecord[PagePaths.ABOUT] },
    { label: 'Contact', url: PathsRecord[PagePaths.CONTACT] },
];

export const ApiPathsRecord: Record<ApiPaths, string> = {
    [ApiPaths.BASE_PATH]: '/api/v1',
    [ApiPaths.INFO]: '/info',
    [ApiPaths.REPOS]: '/repos',
    [ApiPaths.USER]: '/user',
};