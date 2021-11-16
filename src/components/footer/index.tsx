import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CabinIcon from "@mui/icons-material/Cabin";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Organization from "./components/organization";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Jamal Soueidan
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Actual learning requires that you do those things.
      </Typography>
    </Box>
  );
};

export default Footer;
