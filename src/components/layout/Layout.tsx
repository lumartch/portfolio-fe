import { DEVELOPER_NAME, GITHUB_AVATAR } from '@/consts';
import { Box, Container } from '@mui/material';
import React, { PropsWithChildren } from 'react';

import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', padding: '32px' }}>
      <Container>
        <Header src={GITHUB_AVATAR} title={DEVELOPER_NAME!} />
        {children}
      </Container>
      <Footer/>
    </Box>
  );
};