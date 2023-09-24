import { GetServerSideProps } from 'next';
import { Grid, Tab, Tabs, useMediaQuery } from '@mui/material';

import { ProfileItem, Skeleton } from '@/components';
import { DEVELOPER_GIT_USER, PROJECTS_LABELS, minWidth } from '@/const';
import { JsonIProfile } from '@/interfaces/';
import { ApiHandler } from '@/api';
import { useState } from 'react';


type IProps = {
    profile: JsonIProfile;
};

const Projects = ({ profile }: IProps) => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const { Title, Description } = PROJECTS_LABELS;
    const [tabName, setTabName] = useState<string>('github');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabName(newValue);
    };
    return (
        <Grid container sx={{ textAlign: 'center', alignItems: 'center' }} spacing={8} paddingLeft={padding} paddingRight={padding}>
            <Grid item xs={12}>
                <Skeleton title={Title} description={Description} />
            </Grid>
            <Grid item xs={12}>
                <Tabs value={tabName} onChange={handleChange} textColor="secondary" indicatorColor="secondary" centered>
                    { Object.keys(profile).map(( value: string, index: number) => <Tab key={index} value={value} label={value} />)}
                </Tabs>
            </Grid>
            <Grid item xs={12}>
                { Object.entries(profile).filter((entry) => entry[0] === tabName).map((profile, index: number) => <ProfileItem key={index} profile={profile[1]}/>)}
            </Grid>
        </Grid>
    );
}

export const getServerSideProps: GetServerSideProps = async() => {
    let profile: JsonIProfile = {};
    ApiHandler.getInstance();
    try {
        const { data: profileData } = await ApiHandler.getInfo(DEVELOPER_GIT_USER!);
        profile = profileData;
    } catch (e) {
        console.error(`ERROR THROWN BY SERVER ${e}`);
    }
    return {
        props: {
            profile: profile,
        }
    }
}

export default Projects;