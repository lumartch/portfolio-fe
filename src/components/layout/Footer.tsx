import { DEVELOPER_GIT_USER, DEVELOPER_NAME } from '@/consts';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <Grid sx={{ 
            alignItems: 'center', 
            bgcolor: 'text.primary',
            borderRadius: '6px',
            bottom: 0, 
            color: 'background.default', 
            display: 'flex', 
            height: '50px',
            justifyContent: 'center', 
            position: 'fixed', 
            width: '100%' 
        }}>
            <Typography sx={ { fontWeight: '700' }}>Made by {DEVELOPER_NAME}@{DEVELOPER_GIT_USER}:~$ ./{DEVELOPER_GIT_USER}.sh</Typography>
        </Grid>
    );
};