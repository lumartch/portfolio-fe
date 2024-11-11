import { LINKEDIN_URI, PATHS } from '@/consts';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Avatar, Button, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import React, { useContext } from 'react';

import { ColorModeContext } from '../theme/ColorModeContext';

interface Props {
  src?: string; 
  title: string;
};

export const Header: React.FC<Props> = ({ src, title }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Grid container spacing='8px' sx={{ padding: '8px'}}>
      <Grid size={{ lg: 2, md: 4, xs: 12}} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <Button href={LINKEDIN_URI!} startIcon={<Avatar alt='logo' src={src} / >} sx={{ color: 'text.primary', fontSize: '1.1rem' }} target='_blank'>
          {title}
        </Button>
      </Grid>
      <Grid size={{ lg: 8, md: 4, xs: 12 }} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        { PATHS.map((path, index: number) => (
          <Grid key={index} size={{ md: 4}} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Link href={path.url}>
              <Button size='large' sx={{ color: 'text.primary', fontSize: '1.1rem' }}>{path.label}</Button>
            </Link>
          </Grid> 
        ))}
      </Grid>
      <Grid size={{ lg: 2, md: 4, xs: 12}} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <Button endIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} 
          onClick={colorMode.toggleColorMode} sx={{ color: 'text.primary', fontSize: '1.1rem' }}>
          {theme.palette.mode} mode
        </Button>
      </Grid>
    </Grid>
  );
};
