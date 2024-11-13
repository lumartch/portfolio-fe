import { DEVELOPER_NAME, GITHUB_AVATAR } from '@/consts';
import { Box, Container, Grid2 } from '@mui/material';
import React, { PropsWithChildren } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100%', minWidth: '100%', padding: '32px 0px 80px 0px', position: 'absolute' }}>
            <Box>
                <Container sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <Header src={GITHUB_AVATAR} title={DEVELOPER_NAME!} />
                    <Grid2 container sx={{ alignItems: 'center', gap: '24px', justifyContent: 'center', textAlign: 'center' }}>
                        {children}
                    </Grid2>
                </Container>
            </Box>
            <Footer/>
        </Box>
    );
};