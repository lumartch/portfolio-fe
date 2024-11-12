import { CircularProgress, Grid2 } from '@mui/material';
import React from 'react';

export const Loader: React.FC = () => {
    return (
        <Grid2 sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Grid2>
    );
};