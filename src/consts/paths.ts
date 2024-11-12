import { PagePaths } from '@/enums';

export const minWidth = '(min-width:500px)';

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