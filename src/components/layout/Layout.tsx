import { DEVELOPER_NAME, GITHUB_AVATAR } from '@/consts';
import { Box, Container, Grid2 } from '@mui/material';
import React, { PropsWithChildren } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const _sx = { 
        bgcolor: 'background.default', 
        color: 'text.primary', 
        padding: '32px',
        paddingBottom: '50px'
    };

    return (
        <Box>
            <Box sx={_sx}>
                <Container>
                    <Header src={GITHUB_AVATAR} title={DEVELOPER_NAME!} />
                    <Grid2 container sx={{ alignItems: 'center', textAlign: 'center' }}>
                        {children}
                    </Grid2>
                </Container>
            </Box>
            <Footer/>
        </Box>
    );
};