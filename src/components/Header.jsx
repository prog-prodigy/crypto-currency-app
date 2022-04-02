import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../CryptoContext";
import './Banner/Banner.css'
import logo from './images/icon.png'

const Header = () => {
  const useStyles = makeStyles(() => ({
    title: {
      display: 'flex',
      flex: 1,
      color: "gold",
      fontWeight: "bold",
      cursor: "pointer",
      alignItems:'center',
    },
  }));
  const classes = useStyles();
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const { currency, setCurrency } = useCrypto();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar style={{
        backdropFilter:'blur(50px)'
      }}  color="transparent"  postion="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={() => navigate("/")}
            >
             <img src={logo}  alt="logo" style={{width:'15px',height:'15px'}} /> Crypto <span className="stats">Stats</span>
            </Typography>
            <Select
              variant="outlined"
              styles={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
