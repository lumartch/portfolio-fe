import { recipe } from '@vanilla-extract/recipes';


export const footer = recipe({
    base: {
        backgroundColor: 'text.primary',
        borderRadius: '6px',
        bottom: 0, color: 'background.default',
        minHeight: '50px',
        position: 'fixed',
        width: '100%',
    }
});