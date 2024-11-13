import { useApiHandler } from '@/api';
import { GitProfile, Loader, PageInfo, Projects as ProjectList } from '@/components';
import { DEVELOPER_GIT_USER, PROJECTS_LABELS } from '@/consts';
import { GitSource } from '@/enums';
import { IProfile, IProject } from '@/interfaces';
import { Alert, Button, Grid2, Menu, MenuItem, Snackbar, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';


const Projects = () => {
    const [profile, setProfile] = useState<IProfile>();
    const [projects, setProjects] = useState<IProject[]>([]);
    const [gitSource, setGitSource] = useState(GitSource.GITHUB);
    const [isLoading, setIsLoading] = useState(true);
    const [archivedRepos, setArchivedRepos] = useState(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { getInfo, getRepos } = useApiHandler();

    const getGitInfo = async (_gitSource: GitSource, _archived: boolean) => {
        try {
            setIsLoading(true);
            const { data: profileData } = await getInfo(DEVELOPER_GIT_USER || '', _gitSource);
            const { data: projectsData } = await getRepos(DEVELOPER_GIT_USER!, _archived, _gitSource);
            setProjects(projectsData);
            setProfile(profileData);
            setIsLoading(false);
        } catch (e) {
            setShowToast(true);
            console.error(`ERROR THROWN BY SERVER ${e}`);
        }
    };

    useEffect(() => {
        getGitInfo(GitSource.GITHUB, false);
    }, []);

    const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onCloseMenu = (_archived: boolean) => {
        setArchivedRepos(_archived);
        getGitInfo(gitSource, _archived);
        setAnchorEl(null);
    };

    const onChangeGitSource = (_gitSource: GitSource) => {
        setGitSource(_gitSource);
        getGitInfo(_gitSource, archivedRepos);
    };
    
    const _renderGitProfile = () => {
        if(isLoading) return <Loader />;
        if(!profile) return null;

        return <GitProfile {...profile}/>;
    };

    const _renderRepos = () => {
        if(isLoading) return <Loader />;

        return <ProjectList projects={projects} />;
    };

    const open = anchorEl !== null;

    const BUTTON_TEXT = !archivedRepos ? 'Active Repos' : 'Deactivated Repos'; 

    return (
        <>
            <PageInfo description={PROJECTS_LABELS.description} title={PROJECTS_LABELS.title} />
            <Grid2 size={{ xs: 12 }}>
                <Tabs centered indicatorColor="secondary" onChange={(_, source) => onChangeGitSource(source)} textColor="secondary" value={gitSource}>
                    <Tab label={GitSource.GITHUB} value={GitSource.GITHUB} />
                    <Tab label={GitSource.GITLAB} value={GitSource.GITLAB} />
                </Tabs>
            </Grid2>
            { _renderGitProfile() }
            <Grid2 container size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Typography sx={{ fontWeight: 700, textAlign: 'initial', textTransform: 'uppercase' }} variant='h5'>
                    Repositories
                </Typography>
                <Button
                    aria-controls={open ? 'basic-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup='true' 
                    onClick={onOpenMenu} variant='outlined'>
                    {BUTTON_TEXT}
                </Button>
                <Menu anchorEl={anchorEl} MenuListProps={{ 'aria-labelledby': 'basic-button' }} onClose={() => setAnchorEl(null)} open={open}>
                    <MenuItem onClick={() => onCloseMenu(false)}>Active Repos</MenuItem>
                    <MenuItem onClick={() => onCloseMenu(true)}>Deactivated Repos</MenuItem>
                </Menu>
            </Grid2>
            { _renderRepos() }
            <Snackbar autoHideDuration={6000} onClose={() => setShowToast(false)} open={showToast}>
                <Alert onClose={() => setShowToast(false)} severity={'error'} sx={{ width: '100%' }}>
                    Oops! Something went wrong, try it later!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Projects;