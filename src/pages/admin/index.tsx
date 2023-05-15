import { Skeleton, ProjectItem } from "@/components";
import { useEffect, useState } from "react";

import { IProject } from "@/types/Types";
import { Button, Grid } from "@mui/material";
import { NewProject } from "@/components/modal/NewProject";
import { EditProject } from "@/components/modal/EditProject";

const description = "Page dedicated to manage existing projects."

const Admin = () => {
    const [isOpenNew, setIsOpenNew] = useState<boolean>(false);
    const [projects, setProjects] = useState<Array<IProject>>([]);
    const [editProject, setEditProject] = useState<IProject | undefined>(undefined);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/projects");
            const json = await response.json();
            setProjects(json);
        } catch (e) {
            console.error(e);
        }
    }

    const handleOnSubmit = (values: IProject) => {
        const tempProjects = Array.from(projects)
        if (!!values._id) {
            const projectIndex = tempProjects.findIndex(p => p._id === values._id)
            tempProjects[projectIndex] = values;
        } else {
            tempProjects.push({
                ...values,
                _id: projects.length + 1,
            })
        }
        setProjects(tempProjects);
        setIsOpenNew(false);
    }
    
    const handleDelete = (id: number) =>{
        setProjects(prev => prev.filter(p => p._id !== id))
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