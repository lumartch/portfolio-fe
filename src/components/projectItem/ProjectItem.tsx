import { FC } from 'react';
import { Box, Button, Card, CardActions, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { IProject } from '@/interfaces/';
import { EGitSource } from '@/const';

type IProjectItem = {
    project: IProject;
}

export const ProjectItem: FC<IProjectItem> = ({ project }) => {
    const theme = useTheme();
    const { id, name, full_name, clone_url, created_at, default_branch, git_url, html_url, ssh_url, source } = project;
    return (
        <Card variant={ theme.palette.mode === 'dark' ? 'elevation' : 'outlined' }>
            <CardContent>
                <Box sx={{rowGap: 2}}>
                    <Typography variant='h5' sx={{ fontWeight: 700 }} color='text.primary' gutterBottom>
                        {full_name}
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontStyle: 'italic' }} gutterBottom>
                        [Id: {id} | {name}]
                    </Typography>
                    <Chip label={default_branch} variant='outlined' color='primary'/>
                    <Typography variant='subtitle2' gutterBottom>
                        Created at: {created_at}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                    <CopyToClipboard text={git_url}>
                        <Button color='primary'>
                            Git URL
                        </Button>
                    </CopyToClipboard>
                    <CopyToClipboard text={ssh_url}>
                        <Button color='primary'>
                            SSH
                        </Button>
                    </CopyToClipboard>
                    { 
                        source === EGitSource.GITHUB 
                        ? 
                            <CopyToClipboard text={clone_url}>
                                <Button color='primary'>
                                    URL
                                </Button>
                            </CopyToClipboard>
                        : null 
                    }
                    
                    <Button color='primary' href={html_url} target='_blank'>
                        Go to repo
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}