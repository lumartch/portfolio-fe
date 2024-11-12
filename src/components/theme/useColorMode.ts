import { createContext, useContext } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const useColorMode = () => {
    const { toggleColorMode } = useContext(ColorModeContext);

    return { toggleColorMode };
};