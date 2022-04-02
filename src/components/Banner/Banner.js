import { makeStyles, Container, Typography } from '@material-ui/core';
import React from 'react'
import logo from '../images/icon.png'
import './Banner.css'
import Carousel from './Carousel';
const Banner = () => {

    return (
        <>
        <div className='banner'>
            <h1 className='banner-title'><img src={logo} className='logo' alt='logo'/><span className='crypto'>Crypto</span>Stats</h1>
        </div>
            <Carousel />
            </>


    )
};


export default Banner