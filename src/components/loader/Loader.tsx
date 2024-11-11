import { CircularProgress, Grid, Stack } from '@mui/material';
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <Grid container justifyContent='center'>
      <Stack direction='column' sx={{ justifyContent: 'space-around', minHeight: '200px'}}>
        <CircularProgress />
      </Stack>
    </Grid>
  );
};