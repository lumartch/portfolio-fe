import { FC, ReactNode,  } from "react";
import { Box, Grid, useTheme } from "@mui/material";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { DEVELOPER_NAME, GITHUB_AVATAR } from "@/const";
import { LinksMap } from "@/interfaces";

type ILayout = {
    children?: ReactNode;
}

export const Layout:FC<ILayout> = ({ children }) => {
    const links: LinksMap = {
        Home: "/",
        Contact: "/contact",
        Projects: "/projects",
        About: "/about"
    };
    return (
        <Grid item container xs={12} 
        sx={{ bgcolor: 'background.default', color: 'text.primary', display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
            <Grid item xs={12} sx={{ p: 4 }}>
                <Header src={GITHUB_AVATAR} title={DEVELOPER_NAME!} links={links}/>
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