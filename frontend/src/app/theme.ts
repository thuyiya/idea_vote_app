'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

// Load the Roboto font
const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Create the MUI theme
const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export default theme;