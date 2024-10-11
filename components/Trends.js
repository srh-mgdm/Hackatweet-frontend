import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/Trend.module.css';


function Trends() {

const  afficherTrends = () =>{
    fetch('http://localhost:3000/trend')
}
    
    return (

    <div className={styles.trendContainer} weigth={200} heigth={200}>
        
        

    </div>
)
;}
export default Trends;