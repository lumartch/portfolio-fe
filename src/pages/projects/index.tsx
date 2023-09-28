import { Grid, Tab, Tabs, useMediaQuery } from '@mui/material';

import { ProfileItem, ProjectList, Skeleton } from '@/components';
import { DEVELOPER_GIT_USER, PROJECTS_LABELS, minWidth } from '@/const';
import { JsonIProfile } from '@/interfaces/';
import { ApiHandler } from '@/api';
import { useEffect, useState } from 'react';


const Projects = () => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const [profile, setProfile] = useState<JsonIProfile>({});
    const { Title, Description } = PROJECTS_LABELS;
    const [gitSource, setGitSource] = useState<string>('github');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setGitSource(newValue);
    };

    useEffect(() => {
        const updateProjects = async () => {
            ApiHandler.getInstance();
            try {
                const { data: profileData } = await ApiHandler.getInfo(DEVELOPER_GIT_USER!);
                setProfile(profileData);
            } catch (e) {
                console.error(`ERROR THROWN BY SERVER ${e}`);
            }
        }
        updateProjects();
    }, [gitSource]);

    return (
        <Grid container sx={{ textAlign: 'center', alignItems: 'center' }} spacing={8} paddingLeft={padding} paddingRight={padding}>
            <Grid item xs={12}>
                <Skeleton title={Title} description={Description} />
            </Grid>
            <Grid item xs={12}>
                <Tabs value={gitSource} onChange={handleChange} textColor="secondary" indicatorColor="secondary" centered>
                    { Object.keys(profile).map(( value: string, index: number) => <Tab key={index} value={value} label={value} />) }
                </Tabs>
            </Grid>
            <Grid item xs={12}>
                { Object.entries(profile).filter((entry) => entry[0] === gitSource).map((profile, index: number) => <ProfileItem key={index} profile={profile[1]}/>)}
            </Grid>
            <Grid item xs={12}><ProjectList gitSource={gitSource} /></Grid>
        </Grid>
    );
}

export default Projects;