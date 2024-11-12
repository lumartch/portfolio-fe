import { Grid2, Typography } from '@mui/material';
import React from 'react';

import { dividerStyle } from './page-info.css';

interface Props {
    title: string;
    description: string;
}

export const PageInfo: React.FC<Props> = ({ description, title }) => {
    return (
        <Grid2 alignContent="center" container direction='column'>
            <Grid2>
                <Typography component="h2" variant="h2">{title}</Typography>
            </Grid2>
            <Grid2>
                <div className={dividerStyle}/>
            </Grid2>
            <Grid2>
                <Typography>{description}</Typography>
            </Grid2>
        </Grid2>
    );
};