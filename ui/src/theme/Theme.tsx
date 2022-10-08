import { createTheme } from '@mui/material/styles';

export const theme = createTheme({

    palette: {
        primary: {
            main: "#26266D"
        },
        secondary: {
            main: '#E4E4E4',
        },
        warning: {
            main: "#fed14c"
        }
    },

    typography: {
        fontFamily: [
            'Lato',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },

    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 22,
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: "3rem"
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                option: {
                    ":hover": {
                        backgroundColor: "#26266D !important",
                        color: "white"
                    }
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    ":hover": {
                        backgroundColor: "#26266D !important",
                        color: "white"
                    }
                }
            }
        }
    }
});
