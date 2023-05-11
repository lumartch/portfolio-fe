import { IProject } from "@/types/Types";
import { GetServerSideProps } from "next";

import { Skeleton, ProjectItem } from "@/components";

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus sit amet dictum sit amet. Tellus rutrum tellus pellentesque eu. Nec tincidunt praesent semper feugiat nibh sed.";

type IProps = {
    projects: Array<IProject>
};

const Projects = ({ projects }: IProps) => {
    return (
        <section>
            <Skeleton title="Projects" description={description} />
            {projects.map((project: IProject, index: number) => 
                <ProjectItem key={index} project={project} />
            )}
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async() => {
    let projects = [];
    try {
        const response = await fetch("http://localhost:3000/api/projects");
        projects = await response.json();
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