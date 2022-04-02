import React from 'react'
import './App.css'
import { Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Coin from './components/Coin'
import Home from './components/Home'
import { makeStyles} from '@material-ui/core'

const App = () => {
    const useStyles = makeStyles(()=>({
        App:{
            backgroundColor: 'rgb(10,25,41)',
            color: 'white',
            minHeight: '100vh'
        }
    }))
    const classes=useStyles()
    return (
     
        <div className={classes.App}>
            <Header/>
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route exact path='/coins/:id' element={<Coin />}/>
            </Routes>
        </div>
   

    )
}

export default App