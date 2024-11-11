import { IProfile } from '@/interfaces';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import React from 'react';

type IProfileItem = {
    profile: IProfile;
}

export const ProfileItem:React.FC<IProfileItem> = ({ profile }) => {
  const theme = useTheme();
  const { avatar_uri, bio, email, git_uri, name, user_id, username } = profile;

  return (
    <Card sx={{ display: 'flex' } } variant={ theme.palette.mode === 'dark' ? 'elevation' : 'outlined' }>
      <CardMedia
        alt={`${username}'s profile image.`}
        component='img'
        image={avatar_uri}
        sx={{ width: '150px' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            {name}
          </Typography>
          <Typography color='text.secondary' component='div' variant='subtitle1'>
            {username}: {user_id}
          </Typography>
          <Typography color='text.secondary' component='div' variant='subtitle1'>
            {email}
          </Typography>
          <Typography color='text.secondary' component='div' variant='subtitle1'>
            {bio}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color='primary' href={git_uri} sx={{ alignContent: 'center', display: 'flex', width: '100%' }} target='_blank'>
            Go to Git Source
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
