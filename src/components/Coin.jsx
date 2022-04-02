import { LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/node_modules/@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCrypto } from "../CryptoContext";
import { SingleCoin } from "./Banner/config/api";
import CoinInfo from "./CoinInfo";
const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useCrypto();

  useEffect(() => {
    const fetchCoin = async () => {
      const res = await axios(SingleCoin(id));
      setCoin(res.data);
      console.log(res);
    };
    fetchCoin();
  }, [id]);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      paddingTop: 100,
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
  }));
  const classes = useStyles();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{
            marginBottom: "20",
          }}
        />
        <Typography variant="h4" className={classes.heading}>
          {coin?.name}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex", flexDirection:'column'}}>
            <span>
              <Typography variant="h6" style={{display:'inline'}} className={classes.heading}>
                Rank:{" "}
              </Typography>

              <Typography
                variant="h6"
                style={{
                  fontFamily: "Montserrat",
                  display:'inline',
                }}
              >
                {coin?.market_cap_rank}
              </Typography>
            </span>

            <span>
              <Typography variant="h6" style={{display:'inline'}} className={classes.heading}>
                Current Price:{` ${symbol} `}
              </Typography>

              <Typography
                variant="h6"
                style={{
                  fontFamily: "Montserrat",
                  display:'inline'
                }}
              >
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span>
              <Typography variant="h6" className={classes.heading} style={{display:'inline'}}>
                Market Cap:{` ${symbol} `}
              </Typography>

              <Typography
                variant="h6"
                style={{
                  fontFamily: "Montserrat",
                  display:'inline'
                }}
              >
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}M
              </Typography>
            </span>
          </span>
        </div>
      </div>
      {/* chart*/}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coin;
