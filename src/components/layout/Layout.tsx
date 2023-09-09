import { FC, ReactNode,  } from "react";
import { Grid } from "@mui/material";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { DEVELOPER_NAME, GITHUB_AVATAR } from "@/const";

type ILayout = {
    children?: ReactNode;
}

export const Layout:FC<ILayout> = ({ children }) => {
    return (
        <Grid item container xs={12} 
            sx={{ bgcolor: 'background.default', color: 'text.primary', display: "block", paddingBottom: "80px",
            flexDirection: "row", justifyContent: "flex-start", position: "absolute", minHeight: "100%" }}>
            <Grid item xs={12} sx={{ p: 4, display: "flex" }}>
                <Header src={GITHUB_AVATAR} title={DEVELOPER_NAME!} />
            </Grid>
            <Grid item container xs={12} sx={{ p: 4, display: "flex" }}>
                {children}
            </Grid>
            <Grid item xs={12} sx={{ bgcolor: 'text.primary', color: 'background.default', position:"fixed", bottom: 0, width: "100%", maxHeight: "80px" }}>
                <Footer/>
            </Grid>
        </Grid>
    );
}