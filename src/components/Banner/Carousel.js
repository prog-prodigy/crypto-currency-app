import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { useCrypto } from '../../CryptoContext'
import { TrendingCoins } from './config/api'

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        marginBottom:20
        
    },
    carouselItem:{
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        cursor:'pointer',
        textTransform:'uppercase',
        color:'white',
        fontFamily: 'Montserrat, sans-serif'
    }
}))
const Carousel = () => {
    const [trending,setTrending]= useState()
    const { currency,symbol } = useCrypto()
    const classes = useStyles()
    useEffect(()=>{
        const fetchTrendingCoins = async () => {
            const res = await axios.get(TrendingCoins(currency))
            setTrending(res.data)
          
        }
        fetchTrendingCoins()
    },[currency])
    const responsive={
        0:{
            items: 2,
        },
        512:{
            items: 5,
        }
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const items = trending?.map(coin=>{
        let profit= coin?.price_change_percentage_24h>=0;
        return <Link
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}>
            <img 
            src={coin?.image}
            alt={coin.name}
            height='80'
            style={{marginBottom:10}}/>
            <span style={{fontSize:'12px',color:'lightgray'}}>
                {coin?.symbol}
                &nbsp;
      <span style={{color: profit>0? "rgb(14,203,129)":'red'}}>{profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%</span>      
            </span>
            <span>
{symbol} {numberWithCommas(coin?.current_price)}
            </span>
        </Link>
    })
    console.log(trending)
    return (
        <div className={classes.carousel}>
            <AliceCarousel
            
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            responsive={responsive}
            autoPlay
            items={items}/>
            
        </div>
    )
}

export default Carousel