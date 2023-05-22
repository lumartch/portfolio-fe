import { Skeleton, ProjectItem, NewProject, EditProject } from "@/components";
import { useEffect, useState } from "react";

import { IProject } from "@/types/Types";
import { Button, Grid } from "@mui/material";
import { createProject, deleteProject, getAllProjects, updateProject } from "@/api/Projects";

const description = "Page dedicated to manage existing projects."

const Admin = () => {
    const [isOpenNew, setIsOpenNew] = useState<boolean>(false);
    const [projects, setProjects] = useState<Array<IProject>>([]);
    const [editProject, setEditProject] = useState<IProject | undefined>(undefined);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const projects = await getAllProjects();
        setProjects(projects);
    }

    const handleOnSubmit = async (project: IProject) => {
        const tempProjects = Array.from(projects)
        if (!!project._id) {
            const updatedProject = await updateProject(project);
            const projectIndex = tempProjects.findIndex(p => p._id === updatedProject._id)
            tempProjects[projectIndex] = updatedProject;
        } else {
            const newProject = await createProject(project);
            tempProjects.push(newProject);
        }
        setProjects(tempProjects);
        setIsOpenNew(false);
    }
    
    const handleDelete = async (id: string) => {
        const isDeleted = await deleteProject(id);
        if (isDeleted) {
            setProjects(prev => prev.filter(p => p._id != id))
        }
    }

    return (
        <section>
            <Skeleton title="Admin page" description={description} />
            <Grid container justifyContent="center" paddingBottom={10}>
                <Grid item>
                    <Button variant="outlined" size="large" onClick={() => setIsOpenNew(true)}>Add new project</Button>
                </Grid>
            </Grid>
            {projects.map((project: IProject, index: number) => 
                <ProjectItem 
                    key={index} 
                    project={project} 
                    handleDelete={ () => handleDelete(project._id!) }
                    handleEdit={ () => setEditProject(project) }
                />
            )}
            <NewProject open={ isOpenNew } onClose={ () => setIsOpenNew(false) } onSubmit={ handleOnSubmit }/>
            <EditProject open={ !!editProject } onClose={ () => setEditProject(undefined) } onSubmit={ handleOnSubmit } project={ editProject } />
        </section>
    );
}

export default Admin;