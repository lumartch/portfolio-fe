import { ProjectItem } from '@/components';
import { IProject } from '@/interfaces';
import { Grid2 } from '@mui/material';
import React from 'react';

interface Props {
    projects: IProject[];
}

export const Projects: React.FC<Props> = ({ projects }) => {
    return (
        <Grid2 container size={{ xs: 12 }} spacing={2}>
            {projects.map((project: IProject, index: number) => <Grid2 key={index} size={{ lg: 6, xs: 12 }}> <ProjectItem {...project} /> </Grid2> )}
        </Grid2>
    );
};