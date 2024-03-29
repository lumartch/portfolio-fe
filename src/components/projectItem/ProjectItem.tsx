import { FC, useState } from 'react';
import { Alert, Box, Button, Card, CardActions, CardContent, Chip, Grid, Snackbar, Tooltip, Typography, useTheme } from '@mui/material';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { IProject } from '@/interfaces/';
import { EGitSource } from '@/const';
type IProjectItem = {
    project: IProject;
}

export const ProjectItem: FC<IProjectItem> = ({ project }) => {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const { id, name, full_name, clone_url, created_at, default_branch, git_url, html_url, ssh_url, source } = project;

    const handleCopiedToClipBoard = () => setOpen(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
    <>
        <Card variant={ theme.palette.mode === 'dark' ? 'elevation' : 'outlined' }>
            <CardContent>
                <Box sx={{rowGap: 2}}>
                    <Tooltip title={full_name}>
                        <Typography variant='h5' color='text.primary' gutterBottom 
                            sx={{ fontWeight: 700, overflow:'hidden', whiteSpace:'nowrap',  textOverflow: 'ellipsis' }} >
                            {full_name}
                        </Typography>
                    </Tooltip>
                    <Typography variant='subtitle1' sx={{ fontStyle: 'italic' }} gutterBottom>
                        [Id: {id} | {name}]
                    </Typography>
                    <Chip label={default_branch} variant='outlined' color='primary' sx={{ marginBottom: 1}}/>
                    <Typography variant='subtitle2' gutterBottom>
                        Created at: {created_at}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <CopyToClipboard text={git_url}>
                        <Button color='primary' onClick={handleCopiedToClipBoard}>
                            Git URL
                        </Button>
                    </CopyToClipboard>
                    <CopyToClipboard text={ssh_url}>
                        <Button color='primary' onClick={handleCopiedToClipBoard}>
                            SSH
                        </Button>
                    </CopyToClipboard>
                    { 
                        source === EGitSource.GITHUB 
                        ? 
                            <CopyToClipboard text={clone_url}>
                                <Button color='primary' onClick={handleCopiedToClipBoard}>
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                Value copied to the clipboard!
            </Alert>
        </Snackbar>
    </>
    );
}