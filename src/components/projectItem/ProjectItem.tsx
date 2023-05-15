import { FC } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { IProject } from "@/types/Types";
import { ItemActions } from "./ItemActions";

type IProjectItem = {
    project: IProject;
    handleEdit: () => void;
    handleDelete: () => void;
}

export const ProjectItem: FC<IProjectItem> = ({ project, handleEdit, handleDelete }) => {
    const router = useRouter();
    return (
        <Grid container spacing={6} sx={{ pb: "40px" }}>
            <Grid item md={6}>
                <img
                    src={project.imageUrl}
                    alt={project.name}
                    style={{ width: "100%" }}
                />
            </Grid>
            <Grid item md={6}>
                <Stack spacing={4}>
                <h3>{project.name}</h3>
                <div>{project.description}</div>
                <ItemActions
                    id={project._id}
                    onDelete={ handleDelete }
                    onEdit={ handleEdit }
                />
                </Stack>
            </Grid>
        </Grid>
    );
}