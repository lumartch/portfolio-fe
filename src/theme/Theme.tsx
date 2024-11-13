import { ColorMode } from '@/enums';
import { ThemeProvider, createTheme } from '@mui/material';
import React, { PropsWithChildren, useMemo, useState } from 'react';

import { ColorModeContext } from './useColorMode';

export const Theme: React.FC<PropsWithChildren> = ({ children }) => {
    const [mode, setMode] = useState<ColorMode>(ColorMode.DARK);
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT));
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