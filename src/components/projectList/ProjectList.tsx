import { FC, useEffect, useState } from 'react';
import { Button, Grid, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';

import { ApiHandler } from '@/api';
import { IProject } from '@/interfaces';
import { DEVELOPER_GIT_USER, minWidth } from '@/const';
import { ProjectItem, Loader} from '@/components';

type IProjectList = {
    gitSource: string;
}

export const ProjectList:FC<IProjectList> = ({ gitSource }) => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const direction = matches ? 'row' : 'column';
    const [projects, setProjects] = useState<IProject[]>([]);
    const [archived, setArchived] = useState<Boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (archived: Boolean) => {
        setArchived(archived);
        setIsLoading(true);
        setAnchorEl(null);
    };

    const displayRepos = () => {
        return projects.map((project: IProject, index: number) => <Grid key={index} xs={12} item> <ProjectItem project={project} /> </Grid> );
    }
    
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
        }
        setIsLoading(true);
        updateProjects();
    }, [archived, gitSource]);

    return (
        <Grid container spacing={4} textAlign='center' display='flex'>
            <Grid item container xs={12} direction={direction} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Typography variant='h5' sx={{ textTransform: 'uppercase', letterSpacing: '5px', fontWeight: 700, textAlign: 'initial' }}>
                    Repositories
                </Typography>
                <Button
                    variant='outlined' onClick={handleClick} aria-controls={open ? 'basic-menu' : undefined} 
                    aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
                    Archived: {archived.toString()}
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose(archived)} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                    <MenuItem onClick={() => handleClose(true)}>True</MenuItem>
                    <MenuItem onClick={() => handleClose(false)}>False</MenuItem>
                </Menu>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                { isLoading ? <Loader /> : displayRepos() }
            </Grid>
        </Grid>
    );
}