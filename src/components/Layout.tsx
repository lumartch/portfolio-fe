import { FC, ReactNode } from "react";
import { Container } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";

type ILayout = {
    children?: ReactNode;
}

const Layout:FC<ILayout> = ({ children }) => {
    return (
        <>
            <Header src={""} title={"Lumart Chryssomallis"}></Header>
            <Container fixed>
                <main>{children}</main>
            </Container>
            <Footer/>
        </>
    );
}

export default Layout;