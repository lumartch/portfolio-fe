import { FC, ReactNode,  } from "react";
import { Box, Grid, useTheme } from "@mui/material";

import Link from "next/link";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { DEVELOPER_NAME, GITHUB_AVATAR } from "@/const";

import layoutStyle from './Layout.module.css';

type ILayout = {
    children?: ReactNode;
}

export const Layout:FC<ILayout> = ({ children }) => {
    const theme = useTheme();
    const linkTheme = theme.palette.mode === 'dark' ? `${layoutStyle.link} ${layoutStyle.white}` : `${layoutStyle.link}`;
    return (
        <Grid item container xs={12} 
        sx={{ bgcolor: 'background.default', color: 'text.primary', display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
            <Grid item xs={12} sx={{ p: 4 }}>
                <Header src={GITHUB_AVATAR} title={DEVELOPER_NAME!}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }} >
                        <Link className={linkTheme} href="/">Home</Link>
                        <Link className={linkTheme} href="/contact">Contact</Link>
                        <Link className={linkTheme} href="/projects">Projects</Link>
                        <Link className={linkTheme} href="/about">About</Link>
                    </Box>
                </Header>
            </Grid>
            <Grid item container xs={12} sx={{ p: 6 }}>
                {children}
            </Grid>
            <Grid item xs={12} sx={{ bgcolor: 'text.primary', color: 'background.default'}}>
                <Footer/>
            </Grid>
        </Grid>
    );
}