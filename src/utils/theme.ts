import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4dd0e1',
    },
    secondary: {
      main: '#b2ebf2',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#0097a7',
    },
  },
});

export default theme;
