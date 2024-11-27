import { GitProfile, Loader, PageInfo, Projects as ProjectList } from '@/components';
import { DEVELOPER_GIT_USER, PROJECTS_LABELS } from '@/consts';
import { GitSource } from '@/enums';
import { useProfile, useRepos } from '@/hooks';
import { Alert, Button, Grid2, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';


const Projects = () => {
    const [gitSource, setGitSource] = useState(GitSource.GITHUB);
    const [archivedRepos, setArchivedRepos] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { errorProfile, isLoadingProfile, profileData } = useProfile(gitSource, DEVELOPER_GIT_USER ?? '');
    const { errorRepos, isLoadingRepos, reposData } = useRepos(gitSource, DEVELOPER_GIT_USER ?? '', archivedRepos);

    const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onCloseMenu = (_archived: boolean) => {
        setArchivedRepos(_archived);
        setAnchorEl(null);
    };

    const onChangeGitSource = (_gitSource: GitSource) => {
        setGitSource(_gitSource);
    };
    
    const _renderGitProfile = () => {
        if(isLoadingProfile) return <Loader />;
        if(!profileData) return null;

        if(errorProfile){
            return (
                <Grid2 size={{ xs: 12 }}>
                    <Alert severity="error" sx={{ display: 'flex', justifyContent: 'center' }}>There was an error while loading the profile. Try it later.</Alert>
                </Grid2>
            );
        }

        const _profile = profileData?.data;
        return <GitProfile {..._profile}/>;
    };

    const _renderRepos = () => {
        if(isLoadingRepos) return <Loader />;
        if(!reposData) return null;

        if(errorRepos){
            return (
                <Grid2 size={{ xs: 12 }}>
                    <Alert severity="error" sx={{ display: 'flex', justifyContent: 'center' }}>There was an error while loading the list of projects. Try it later.</Alert>
                </Grid2>
            );
        }

        const _projects = reposData?.data;
        return <ProjectList projects={_projects} />;
    };

    const open = anchorEl !== null;

    const BUTTON_TEXT = !archivedRepos ? 'Active Repos' : 'Deactivated Repos'; 

    return (
        <>
            <PageInfo description={PROJECTS_LABELS.description} title={PROJECTS_LABELS.title} />
            <Grid2 size={{ xs: 12 }}>
                <Tabs centered indicatorColor="secondary" 
                    onChange={(_, source) => onChangeGitSource(source)} 
                    textColor="secondary" 
                    value={gitSource}>
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
                    aria-controls={open ? 'basic-menu' : undefined} aria-expanded={open} aria-haspopup='true' 
                    onClick={onOpenMenu} variant='outlined'>
                    {BUTTON_TEXT}
                </Button>
                <Menu 
                    anchorEl={anchorEl} 
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                    onClose={() => setAnchorEl(null)} 
                    open={open}>
                    <MenuItem onClick={() => onCloseMenu(false)}>Active Repos</MenuItem>
                    <MenuItem onClick={() => onCloseMenu(true)}>Deactivated Repos</MenuItem>
                </Menu>
            </Grid2>
            { _renderRepos() }
        </>
    );
};

export default Projects;