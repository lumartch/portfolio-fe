import { ThemeProvider, createTheme } from '@mui/material';
import React, { PropsWithChildren, ReactNode, useMemo, useState } from 'react';

import { ColorModeContext } from './useColorMode';

interface Props {
    children?: ReactNode;
}

export const Theme: React.FC<PropsWithChildren<Props>> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }), [], );

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
};