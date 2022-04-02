import React from 'react'
import Banner from './Banner/Banner'
import CoinsTable from './CoinsTable'
import Login from './Form/Login'
import './Home.css'
const Home = () => {
  return (
    
      <div className='home'>
      <Banner />
      {/* <Login /> */}
      <CoinsTable/>
      </div>
    
  )
}

export default Home