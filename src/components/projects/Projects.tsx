import { ApiHandler } from '@/api';
import { Loader, ProjectItem } from '@/components';
import { DEVELOPER_GIT_USER, minWidth } from '@/consts';
import { IProject } from '@/interfaces';
import { Button, Grid, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
    gitSource: string;
}

export const Projects: React.FC<Props> = ({ gitSource }) => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const direction = matches ? 'row' : 'column';
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
        return projects.map((project: IProject, index: number) => <Grid item key={index} xs={12}> <ProjectItem {...project} /> </Grid> );
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
        <Grid container display='flex' spacing={4} textAlign='center'>
            <Grid container direction={direction} item sx={{ display: 'flex', justifyContent: 'space-evenly' }} xs={12}>
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
            </Grid>
            <Grid container item spacing={2} xs={12}>
                { isLoading ? <Loader /> : displayRepos() }
            </Grid>
        </Grid>
    );
};