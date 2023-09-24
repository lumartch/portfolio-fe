import { IProfile, IProject, JsonIProfile } from '@/interfaces/';
import { GetServerSideProps } from 'next';

import { Skeleton, ProjectItem } from '@/components';
import { Grid, useMediaQuery } from '@mui/material';
import { DEVELOPER_GIT_USER, PROJECTS_LABELS, minWidth } from '@/const';
import { ApiHandler } from '@/api';


type IProps = {
    profile: JsonIProfile;
    projects: IProject[];
};

const Projects = ({ projects, profile }: IProps) => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const { Title, Description } = PROJECTS_LABELS;
    return (
        <Grid container sx={{ textAlign: 'center', alignItems: 'center' }} spacing={8} paddingLeft={padding} paddingRight={padding}>
            <Grid item xs={12}>
                <Skeleton title={Title} description={Description} />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
        </Grid>
    );
}

export const getServerSideProps: GetServerSideProps = async() => {
    let projects: IProject[] = [];
    let profile: JsonIProfile = {};
    ApiHandler.getInstance();
    try {
        const { data: profileData } = await ApiHandler.getInfo(DEVELOPER_GIT_USER!);
        const { data: projectsData } = await ApiHandler.getRepos(DEVELOPER_GIT_USER!);
        profile = profileData;
        projects = projectsData;
    } catch (e) {
        console.error(`ERROR THROWN BY SERVER ${e}`);
    }
    return {
        props: {
            projects: projects,
            profile: profile,
        }
    }
}

export default Projects;