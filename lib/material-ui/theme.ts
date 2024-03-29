import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6347',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0074D9',
      light: '#2496FC',
    },
    error: {
      main: red.A400,
    },
    background: { default: '#fafafa' },
  },
});

export default theme;
