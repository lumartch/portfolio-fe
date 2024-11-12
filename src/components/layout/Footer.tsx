import { DEVELOPER_GIT_USER, DEVELOPER_NAME } from '@/consts';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

export const Footer: React.FC = () => {
    const footerSx = { 
        bgcolor: 'text.primary',
        borderRadius: '6px',
        bottom: 0, 
        color: 'background.default', 
        minHeight: '50px', 
        position:'fixed', 
        width: '100%', 
    };

    const typographySx = { fontWeight: '700', textAlign: 'center' };

    return (
        <Grid sx={footerSx}>
            <Typography sx={typographySx}>Made by {DEVELOPER_NAME}@{DEVELOPER_GIT_USER}:~$ ./{DEVELOPER_GIT_USER}.sh</Typography>
        </Grid>
    );
};