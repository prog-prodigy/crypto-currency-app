import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@mui/material";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../CryptoContext";
import { CoinList } from "./Banner/config/api";
import "./Home.css";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [page,setPage]=useState(1)
  const navigate = useNavigate();

  const { currency, symbol } = useCrypto();
  useEffect(() => {
    const fetchCoinList = async () => {
      setLoading(true);
      const { data } = await axios(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };
    fetchCoinList();
  }, [currency]);
 useEffect(()=>{
  const initialisingInput=()=>{
    setTimeout(()=>{
      setSearch('bit')
      setTimeout(()=>{
        setSearch('')
      },[50])
    },[100])
  }
  initialisingInput()
 },[])
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  }));

  const classes = useStyles();
 
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Crypto Currency prices by Market Cap
        </Typography>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          label="Search for a Crypto Currency..."
          variant="outlined"
          className="text-field"
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backGround: "gold" }} />
          ) : (
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((item) => (
                    <TableCell
                      style={{
                        color: "#000",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={item}
                      align={item === "Coin" ? "" : "Right"}
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                .slice((page-1)*10,(page-1)*10+10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ display: "flex", gap: 15 }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span
                            style={{
                              color: "darkgrey",
                            }}
                          >
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14,203,129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                      
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
        count={(handleSearch()?.length/10).toFixed(0)}
        style={{
          padding:20,
          width:'100%',
          display:'flex',
          justifyContent:'center',
          
        }}
        onChange={(_,value)=>{setPage(value)
        window.scroll(0,470)}}
        color='primary'/>


      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
