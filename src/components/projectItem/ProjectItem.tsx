import { FC } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { IProject } from "@/interfaces/";
import Image from "next/image";

type IProjectItem = {
    project: IProject;
}

export const ProjectItem: FC<IProjectItem> = ({ project }) => {
    return (
        <Grid container spacing={6} sx={{ pb: "40px" }}>
            <Grid item md={6}>
                <Image
                    src={project.imageUrl}
                    alt={project.name}
                    width={550}
                    height={550}
                />
            </Grid>
            <Grid item md={6}>
                <Stack spacing={4}>
                <h3>{project.name}</h3>
                <div>{project.description}</div>
                </Stack>
            </Grid>
        </Grid>
    );
}