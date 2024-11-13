import { CircularProgress, Grid2 } from '@mui/material';
import React from 'react';

export const Loader: React.FC = () => {
    return (
        <Grid2 sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '200px' }}>
            <CircularProgress />
        </Grid2>
    );
};