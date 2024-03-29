import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

import { IProfile } from '@/interfaces'

type IProfileItem = {
    profile: IProfile;
}

export const ProfileItem:FC<IProfileItem> = ({ profile }) => {
    const theme = useTheme();
    const { user_id, username, name, git_uri, avatar_uri, email, bio } = profile;
    return (
        <Card variant={ theme.palette.mode === 'dark' ? 'elevation' : 'outlined' } sx={{ display: 'flex' } }>
            <CardMedia
                component='img'
                sx={{ width: '150px' }}
                image={avatar_uri}
                alt={`${username}'s profile image.`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', overflow: 'auto' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component='div' variant='h5'>
                        {name}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary' component='div'>
                        {username}: {user_id}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary' component='div'>
                        {email}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary' component='div'>
                        {bio}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color='primary' href={git_uri} target='_blank' sx={{ display: 'flex', width: '100%', alignContent: 'center' }}>
                        Go to Git Source
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
}
