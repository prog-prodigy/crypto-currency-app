import { makeStyles } from '@material-ui/core'
import React from 'react'

const Select = ({ children,selected,onClick }) => {
    const useStyles=makeStyles(()=>({
       select:{
           border:'1px solid gold',
           borderRadius:5,
           padding: 10,
           paddingLeft: 20,
           paddingRIght: 20,
           cursor: 'pointer',
           backgroundColor: selected? 'gold':'',
           color: selected? 'black': '',
           fontWeight: selected ? 700:500,
           "&:hover":{
               backgroundColor:'gold',
               color:'black',
           },
           width:'22%',
           margin:5
       } 
    }))
    const classes= useStyles()
    return (
        <span className={classes.select}
        onClick={onClick} style={{
            fontFamily:'Montserrat'
        }}>{children}</span>
    )
}

export default Select