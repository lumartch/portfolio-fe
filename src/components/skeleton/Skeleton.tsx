import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import styles from './Skeleton.module.css';

type ISkeleton = {
    title: string;
    description: string;
}

export const Skeleton: FC<ISkeleton> = ({ title, description }) => {
    return (
        <Grid item container sx={{ textAlign: 'center', p: 4 }}>
            <Grid item xs={12}>
                <Typography variant='h4' sx={{ textTransform: 'uppercase', letterSpacing: '5px', fontWeight: 700 }}>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <div className={styles.divider}/>
            </Grid>
            <Grid item xs={12}>
                <Box component='span'>{description}</Box>
            </Grid>
        </Grid>
    );
};