import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets default margins */}
      <BrowserRouter> {/* Wrap your app with BrowserRouter */}
        <Home />
      </BrowserRouter>
    </ThemeProvider>
  );
}