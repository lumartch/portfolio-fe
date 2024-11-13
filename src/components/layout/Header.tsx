import { LINKEDIN_URI, PAGE_PATHS_AND_LABELS } from '@/consts';
import { ColorMode } from '@/enums';
import { useColorMode } from '@/theme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Avatar, Button, Grid2, useTheme } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface Props {
  src?: string; 
  title: string;
};

export const Header: React.FC<Props> = ({ src, title }) => {
    const { palette } = useTheme();
    const { toggleColorMode } = useColorMode();
    const _size ={ lg: 3, md: 3, xs: 12 };
    const _sxGrid = { alignText: 'center', display: 'flex', justifyContent: 'center' };
    const _sxButton = { color: 'text.primary', fontSize: '14px' };
    const hasDarkMode = palette.mode === ColorMode.DARK;

    return (
        <Grid2 container padding="8px">
            <Grid2 size={_size} sx={_sxGrid}>
                <Button href={LINKEDIN_URI!} startIcon={<Avatar alt='logo' src={src} />} sx={_sxButton} target='_blank'>
                    {title}
                </Button>
            </Grid2>
            <Grid2 size={{ lg: 6, md: 6, xs: 12 }} sx={_sxGrid}>
                { PAGE_PATHS_AND_LABELS.map(({ label, url }, index: number) => (
                    <Grid2 key={index} padding="4px" sx={_sxGrid}>
                        <Link href={url}>
                            <Button size='large' sx={_sxButton}>{label}</Button>
                        </Link>
                    </Grid2> 
                ))}
            </Grid2>
            <Grid2 size={_size} sx={_sxGrid}>
                <Button endIcon={hasDarkMode ? <Brightness7Icon /> : <Brightness4Icon />} onClick={toggleColorMode} sx={_sxButton}>
                    {palette.mode} mode
                </Button>
            </Grid2>
        </Grid2>
    );
};
