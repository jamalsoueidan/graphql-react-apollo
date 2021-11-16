import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/footer";
import Header from "./components/header";
import Organization from "./components/organization";

// Initialize ApolloClient
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
});

const theme = createTheme();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Organization />
        <Footer />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
