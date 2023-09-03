import { FC, ReactNode } from "react";
import { Container } from "@mui/material";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { DEVELOPER_NAME, GITHUB_AVATAR } from "@/const";

type ILayout = {
    children?: ReactNode;
}

export const Layout:FC<ILayout> = ({ children }) => {
    return (
        <>
            <Header src={GITHUB_AVATAR} title={DEVELOPER_NAME!}>
                <Link href="/">Home</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/about">About</Link>
            </Header>
            <Container fixed>
                <main>{children}</main>
            </Container>
            <Footer/>
        </>
    );
}