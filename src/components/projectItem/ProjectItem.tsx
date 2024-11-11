import { EGitSource } from '@/consts';
import { IProject } from '@/interfaces/';
import { Alert, Box, Button, Card, CardActions, CardContent, Chip, Snackbar, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

type IProjectItem = {
    project: IProject;
}

export const ProjectItem: React.FC<IProjectItem> = ({ project }) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const { clone_url, created_at, default_branch, full_name, git_url, html_url, id, name, source, ssh_url } = project;

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
              <Typography color='text.primary' gutterBottom sx={{ fontWeight: 700, overflow:'hidden', textOverflow: 'ellipsis', whiteSpace:'nowrap' }} 
                variant='h5' >
                {full_name}
              </Typography>
            </Tooltip>
            <Typography gutterBottom sx={{ fontStyle: 'italic' }} variant='subtitle1'>
              [Id: {id} | {name}]
            </Typography>
            <Chip color='primary' label={default_branch} sx={{ marginBottom: 1}} variant='outlined'/>
            <Typography gutterBottom variant='subtitle2'>
              Created at: {created_at}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={open}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Value copied to the clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};