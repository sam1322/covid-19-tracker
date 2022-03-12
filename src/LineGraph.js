import React , {useState,useEffect} from 'react'
import {Line } from "react-chartjs-2"
import axios from "axios"
function LineGraph() {
    const [data,setData ] = useState({})
   
    // 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
    // useEffect(()=>{
    //     axios.get( 'https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    //     .then(resp=>console.log(resp.data))
    // },[])


    return (
    <div>
        {/* <Line data options/> */}
    </div>
  )
}

export default LineGraph