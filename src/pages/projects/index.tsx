import { useEffect, useState } from 'react';
import { Grid, Tab, Tabs, useMediaQuery } from '@mui/material';

import { Loader, ProfileItem, ProjectList, Skeleton } from '@/components';
import { DEVELOPER_GIT_USER, EGitSource, PROJECTS_LABELS, minWidth } from '@/const';
import { IProfile } from '@/interfaces/';
import { ApiHandler } from '@/api';


const Projects = () => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const [profile, setProfile] = useState<IProfile>();
    const { Title, Description } = PROJECTS_LABELS;
    const [gitSource, setGitSource] = useState<string>(EGitSource.GITHUB);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setIsLoading(true);
        setGitSource(newValue);
    };

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
        }
        updateProjects();
    }, [gitSource]);

    return (
        <Grid container sx={{ textAlign: 'center', alignItems: 'center' }} spacing={5} paddingLeft={padding} paddingRight={padding}>
            <Grid item xs={12}>
                <Skeleton title={Title} description={Description} />
            </Grid>
            <Grid item xs={12}>
                <Tabs value={gitSource} onChange={handleChange} textColor="secondary" indicatorColor="secondary" centered>
                    <Tab value={EGitSource.GITHUB} label={EGitSource.GITHUB} />
                    <Tab value={EGitSource.GITLAB} label={EGitSource.GITLAB} />
                </Tabs>
            </Grid>
            <Grid item xs={12}>
                { isLoading ? <Loader /> : <ProfileItem profile={profile!}/> }
            </Grid>
            <Grid item xs={12}><ProjectList gitSource={gitSource} /></Grid>
        </Grid>
    );
}

export default Projects;