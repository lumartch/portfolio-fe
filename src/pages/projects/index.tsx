import { IProject } from "@/interfaces/";
import { GetServerSideProps } from "next";

import { Skeleton, ProjectItem } from "@/components";
import { getAllProjects } from "@/api/Projects";
import { Grid, useMediaQuery } from "@mui/material";
import { PROJECTS_LABELS, minWidth } from "@/const";


type IProps = {
    projects: Array<IProject>
};

const Projects = ({ projects }: IProps) => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const { Title, Description } = PROJECTS_LABELS;
    return (
        <Grid container sx={{ textAlign: 'center', alignItems: 'center' }} spacing={8} paddingLeft={padding} paddingRight={padding}>
            <Grid item xs={12}>
                <Skeleton title={Title} description={Description} />
            </Grid>
            <Grid item xs={12}>
                {/* {projects.map((project: IProject, index: number) => 
                    <ProjectItem key={index} project={project} />
                )} */}
            </Grid>
        </Grid>
    );
}

export const getServerSideProps: GetServerSideProps = async() => {
    let projects: Array<IProject> = [];
    try {
        // projects = await getAllProjects();d
    } catch (e) {
        console.error(e);
    }
    return {
        props: {
            projects: projects
        }
    }
}

export default Projects;