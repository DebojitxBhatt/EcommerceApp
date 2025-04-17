import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CartProvider } from "@/context/CartContext";

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
});

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CartProvider>
  );
}
