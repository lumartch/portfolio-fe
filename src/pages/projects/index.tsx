import { IProject } from "@/interfaces/";
import { GetServerSideProps } from "next";

import { Skeleton, ProjectItem } from "@/components";
import { getAllProjects } from "@/api/Projects";
import { Grid, useMediaQuery } from "@mui/material";
import { minWidth } from "@/const";

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus sit amet dictum sit amet. Tellus rutrum tellus pellentesque eu. Nec tincidunt praesent semper feugiat nibh sed.";

type IProps = {
    projects: Array<IProject>
};

const Projects = ({ projects }: IProps) => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    return (
        <Grid container sx={{ textAlign: 'center', alignItems: 'center' }} spacing={8} paddingLeft={padding} paddingRight={padding}>
            <Grid item xs={12}>
                <Skeleton title="Projects" description={description} />
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
    let projects = [];
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