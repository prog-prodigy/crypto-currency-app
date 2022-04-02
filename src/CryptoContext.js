import React, { useEffect, useState } from 'react'
import {createContext,useContext} from 'react'



const Crypto  = createContext() 
const CryptoContext = ({children}) => {
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState('Rs.')
    useEffect(() => {
      if(currency === 'INR'){
          setSymbol("Rs.")
      }
      if(currency==='USD'){
          setSymbol('$')
      }
      console.log(currency)
    }, [currency])
    
  return (
      <Crypto.Provider value={{setCurrency,currency,symbol}}>
            {children}
      </Crypto.Provider>
    
  )
}
export default CryptoContext
export const useCrypto=()=> useContext(Crypto) 