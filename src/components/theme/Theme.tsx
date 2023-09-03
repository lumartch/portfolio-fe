import { ThemeProvider, createTheme } from "@mui/material";
import { FC, ReactNode, useMemo, useState } from "react";
import { ColorModeContext } from "./ColorModeContext";

type ITheme = {
    children?: ReactNode;
}

export const Theme:FC<ITheme> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),[], );

    const theme = useMemo(
        () =>
            createTheme({
            palette: {
                mode,
            },
        }), [mode], );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}