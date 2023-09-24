import { FC, useContext } from 'react';
import { Avatar, Button, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../theme/ColorModeContext';
import { LINKEDIN_URI, EPaths, minWidth } from '@/const';
import Link from 'next/link';

type IHeader = {
  src?: string;
  title: string;
};

export const Header: FC<IHeader> = ({ src, title }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const paths: typeof EPaths = EPaths; 
  const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
  const direction = matches ? 'row' : 'column';
  return (
    <Grid item container xs={12} sx={{display: 'flex', flexDirection: 'row', textTransform: 'uppercase'}}>
      <Stack spacing={2} direction={direction} sx={{ width: '100%', justifyContent: 'space-evenly'}}>
        <Grid item sx={{ display: 'flex', flexDirection: direction, alignItems: 'center' }}>
          <Button startIcon={<Avatar alt='logo' src={src} />} href={LINKEDIN_URI!} target='_blank' sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
            {title}
          </Button>
        </Grid>
        <Grid item sx={{ display: 'flex', flexDirection: direction, alignItems: 'center' }}>
          { Object.entries(paths).map((path: string[], index: number) => (
            <Grid item key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Link href={path[1]}>
                <Button size='large' sx={{ fontSize: '1.1rem', color: 'text.primary' }}>{path[0]}</Button>
              </Link>
            </Grid> 
          ))}
        </Grid>
        <Grid item sx={{ display: 'flex', flexDirection: direction, alignItems: 'center' }}>
          <Button endIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} 
            onClick={colorMode.toggleColorMode} sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
            {theme.palette.mode} mode
          </Button>
        </Grid>
      </Stack>
    </Grid>
  );
};
