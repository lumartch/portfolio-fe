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
            <Typography component="h2" variant="h2">{title}</Typography>
            <div className={dividerStyle}/>
            <Typography>{description}</Typography>
        </Grid2>
    );
};