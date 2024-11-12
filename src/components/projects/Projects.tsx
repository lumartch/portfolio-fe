import { ApiHandler } from '@/api';
import { Loader, ProjectItem } from '@/components';
import { DEVELOPER_GIT_USER } from '@/consts';
import { IProject } from '@/interfaces';
import { Button, Grid2, Menu, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
    gitSource: string;
}

export const Projects: React.FC<Props> = ({ gitSource }) => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [archived, setArchived] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (archived: boolean) => {
        setArchived(archived);
        setIsLoading(true);
        setAnchorEl(null);
    };

    const displayRepos = () => {
        return projects.map((project: IProject, index: number) => <Grid2 key={index} size={{ xs: 12 }}> <ProjectItem {...project} /> </Grid2> );
    };
    
    useEffect(() => {
        const updateProjects = async () => {
            ApiHandler.getInstance();
            try {
                const { data: projectsData } = await ApiHandler.getRepos(DEVELOPER_GIT_USER!, archived!, gitSource);
                setProjects(projectsData);
                setIsLoading(false);
            } catch (e) {
                console.error(`ERROR THROWN BY SERVER ${e}`);
            }
        };
        setIsLoading(true);
        updateProjects();
    }, [archived, gitSource]);

    return (
        <>
            <Grid2 container size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Typography sx={{ fontWeight: 700, letterSpacing: '5px', textAlign: 'initial', textTransform: 'uppercase' }} variant='h5'>
                    Repositories
                </Typography>
                <Button
                    aria-controls={open ? 'basic-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup='true' 
                    onClick={handleClick} variant='outlined'>
                    Archived: {archived.toString()}
                </Button>
                <Menu anchorEl={anchorEl} MenuListProps={{ 'aria-labelledby': 'basic-button' }} onClose={() => handleClose(archived)} open={open}>
                    <MenuItem onClick={() => handleClose(true)}>True</MenuItem>
                    <MenuItem onClick={() => handleClose(false)}>False</MenuItem>
                </Menu>
            </Grid2>
            <Grid2 container justifyContent="center" size={{ xs: 12 }} spacing={2}>
                { isLoading ? <Loader /> : displayRepos() }
            </Grid2>
        </>
    );
};