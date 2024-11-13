import { ColorMode } from '@/enums';
import { IProfile } from '@/interfaces';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import React from 'react';

type Props = IProfile;

export const GitProfile: React.FC<Props> = ({ avatar_uri, bio, git_uri, name, user_id, username } ) => {
    const { palette } = useTheme();

    const varaint = palette.mode === ColorMode.DARK ? 'elevation' : 'outlined'; 

    return (
        <Card sx={{ width: '100%' }} variant={ varaint }>
            <CardMedia
                alt={`${username}'s profile image.`}
                component='img'
                height={200}
                image={avatar_uri}
            />
            <CardContent>
                <Typography variant='h5'>{name}</Typography>
                <Typography color='text.secondary' variant='subtitle1'>
                    {username}: {user_id}
                </Typography>
                <Typography color='text.secondary' variant='subtitle1'>
                    {bio}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color='primary' href={git_uri} sx={{ alignContent: 'center', display: 'flex', width: '100%' }} target='_blank'>
                    Go to Git Source
                </Button>
            </CardActions>
        </Card>
    );
};
