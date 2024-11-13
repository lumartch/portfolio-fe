import { ColorMode, GitSource } from '@/enums';
import { IProject } from '@/interfaces/';
import { Alert, Button, Card, CardActions, CardContent, Snackbar, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

type Props = IProject;

export const ProjectItem: React.FC<Props> = ({ clone_url, created_at, full_name, git_url, html_url, id, name, source, ssh_url }) => {
    const { palette } = useTheme();
    const [open, setOpen] = useState(false);
    
    const onCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setOpen(true);
    };
    
    const _variant = palette.mode === ColorMode.DARK ? 'elevation' : 'outlined';
    
    return (
        <>
            <Card variant={_variant}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Tooltip title={full_name}>
                        <Typography color='text.primary' gutterBottom sx={{ fontWeight: 700, overflow:'hidden', textOverflow: 'ellipsis', whiteSpace:'nowrap' }} variant='h5'>
                            {full_name}
                        </Typography>
                    </Tooltip>
                    <Typography gutterBottom sx={{ fontStyle: 'italic' }} variant='subtitle1'>
                            [Id: {id} | {name}]
                    </Typography>
                    <Typography gutterBottom variant='subtitle2'>
                            Created at: {created_at}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button color='primary' href={html_url} target='_blank'>
                            Go to repo
                    </Button>
                    <Button color='primary' onClick={() => onCopyToClipboard(git_url)}>
                                Git URL
                    </Button>
                    <Button color='primary' onClick={() => onCopyToClipboard(ssh_url)}>
                                SSH
                    </Button>
                    { source === GitSource.GITHUB && 
                        <Button color='primary' onClick={() => onCopyToClipboard(clone_url)}>
                            URL
                        </Button>
                    }
                </CardActions>
            </Card>
            <Snackbar autoHideDuration={2000} onClose={() => setOpen(false)} open={open}>
                <Alert onClose={() => setOpen(false)} severity='success' sx={{ width: '100%' }}>
                    Value copied to the clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};