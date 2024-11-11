import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

import styles from './Skeleton.module.css';

type ISkeleton = {
    title: string;
    description: string;
}

export const Skeleton: React.FC<ISkeleton> = ({ description, title }) => {

  return (
    <Grid>
      <Grid size={{xs: 12}}>
        <Typography sx={{ fontWeight: 700, letterSpacing: '5px', textTransform: 'uppercase' }} variant='h4'>{title}</Typography>
      </Grid>
      <Grid size={{xs: 12}}>
        <div className={styles.divider}/>
      </Grid>
      <Grid size={{xs: 12}}>
        <Box component='span'>{description}</Box>
      </Grid>
    </Grid>
  );
};