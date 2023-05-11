import { FC, ReactNode } from "react";
import { Container } from "@mui/material";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";

type ILayout = {
    children?: ReactNode;
}

export const Layout:FC<ILayout> = ({ children }) => {
    return (
        <>
            <Header title="Lumart Chryssomallis">
                <Link href="/">Home</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/about">About</Link>
                <Link href="/admin">Admin</Link>
            </Header>
            <Container fixed>
                <main>{children}</main>
            </Container>
            <Footer/>
        </>
    );
}