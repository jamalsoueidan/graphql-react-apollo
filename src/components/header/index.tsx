import CabinIcon from "@mui/icons-material/Cabin";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <CabinIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Simple application to demostrate Graphql and React
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
