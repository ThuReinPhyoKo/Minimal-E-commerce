import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3f50b5',
    },
    secondary: {
      main: '#fcb103',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#cccaca', // your custom hover color
          },
        },
      },
    },
  },
});
