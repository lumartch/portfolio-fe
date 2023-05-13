import { Skeleton, ProjectItem } from "@/components";
import { useEffect, useState } from "react";

import { IProject } from "@/types/Types";
import { Button, Grid } from "@mui/material";
import { NewProject } from "@/components/modal/NewProject";

const description = "Page dedicated to manage existing projects."

const Admin = () => {
    const [projects, setProjects] = useState([]);
    const [open, setIsOpen] = useState(false);

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

    const handleSubmit = (values: any) => {
        let pr = [...projects, { ...values, _id: projects.length + 1 }]
        setProjects(pr);
    }

    return (
        <section>
            <Skeleton title="Admin page" description={description} />
            <Grid container justifyContent="center" paddingBottom={10}>
                <Grid item>
                    <Button variant="outlined" size="large" onClick={() => setIsOpen(true)}>Add new project</Button>
                </Grid>
            </Grid>
            {projects.map((project: IProject, index: number) => 
                <ProjectItem key={index} project={project} />
            )}
            <NewProject open={open} onClose={ () => setIsOpen(false) } onSubmit={handleSubmit}/>
        </section>
    );
}

export default Admin;