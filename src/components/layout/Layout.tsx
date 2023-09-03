import { FC, ReactNode, useContext } from "react";
import { Box, Container, IconButton, Typography, useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Link from "next/link";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { DEVELOPER_NAME, GITHUB_AVATAR } from "@/const";
import { ColorModeContext } from "..";

import style from './Layout.module.css';

type ILayout = {
    children?: ReactNode;
}

export const Layout:FC<ILayout> = ({ children }) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const blackTheme = () => theme.palette.mode === 'dark' ? style.link : '';
    return (
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
            <Header src={GITHUB_AVATAR} title={DEVELOPER_NAME!}>
                <Box sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1,
                        p: 3,
                    }} >
                    <Link className={blackTheme()} href="/">Home</Link>
                    <Link className={blackTheme()} href="/contact">Contact</Link>
                    <Link className={blackTheme()} href="/projects">Projects</Link>
                    <Link className={blackTheme()} href="/about">About</Link>
                    <Typography color={theme.palette.mode}>{theme.palette.mode} mode</Typography>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>
            </Header>
            <Container fixed sx={{ bgcolor: 'background.default', color: 'text.primary' }} >
                <main>{children}</main>
            </Container>
            <Footer/>
        </Box>
    );
}