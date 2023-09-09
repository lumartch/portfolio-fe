import { IProject } from "@/interfaces/";
import { GetServerSideProps } from "next";

import { Skeleton, ProjectItem } from "@/components";
import { getAllProjects } from "@/api/Projects";

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus sit amet dictum sit amet. Tellus rutrum tellus pellentesque eu. Nec tincidunt praesent semper feugiat nibh sed.";

type IProps = {
    projects: Array<IProject>
};

const Projects = ({ projects }: IProps) => {
    return (
        <>
            <Skeleton title="Projects" description={description} />
            {projects.map((project: IProject, index: number) => 
                <ProjectItem key={index} project={project} />
            )}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async() => {
    let projects = [];
    try {
        projects = await getAllProjects();
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