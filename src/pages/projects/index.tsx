import { ApiHandler } from '@/api';
import { GitProfile, Loader, PageInfo, Projects as ProjectList } from '@/components';
import { DEVELOPER_GIT_USER, PROJECTS_LABELS, minWidth } from '@/consts';
import { GitSource } from '@/enums';
import { IProfile } from '@/interfaces';
import { Grid, Tab, Tabs, useMediaQuery } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';


const Projects = () => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const [profile, setProfile] = useState<IProfile>();
    const [gitSource, setGitSource] = useState<string>(GitSource.GITHUB);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    useEffect(() => {
        const updateProjects = async () => {
            ApiHandler.getInstance();
            try {
                const { data: profileData } = await ApiHandler.getInfo(DEVELOPER_GIT_USER!, gitSource);
                setProfile(profileData);
                setIsLoading(false);
            } catch (e) {
                console.error(`ERROR THROWN BY SERVER ${e}`);
            }
        };
        updateProjects();
    }, [gitSource]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setIsLoading(true);
        setGitSource(newValue);
    };
    
    const renderGitProfile = () => {
        if(isLoading) return <Loader />;

        if(!profile) return null;

        return <GitProfile {...profile}/>;
    };

    return (
        <Grid container paddingLeft={padding} paddingRight={padding} spacing={5} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Grid item xs={12}>
                <PageInfo description={PROJECTS_LABELS.description} title={PROJECTS_LABELS.title} />
            </Grid>
            <Grid item xs={12}>
                <Tabs centered indicatorColor="secondary" onChange={handleChange} textColor="secondary" value={gitSource}>
                    <Tab label={GitSource.GITHUB} value={GitSource.GITHUB} />
                    <Tab label={GitSource.GITLAB} value={GitSource.GITLAB} />
                </Tabs>
            </Grid>
            <Grid item xs={12}>{ renderGitProfile() }</Grid>
            <Grid item xs={12}><ProjectList gitSource={gitSource} /></Grid>
        </Grid>
    );
};

export default Projects;