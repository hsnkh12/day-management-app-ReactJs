import React from 'react'
import {Link} from 'react-router-dom'

export default function Card(props){

    const textStyle ={
        display:'grid',placeItems:'center',fontSize:'20px'
    }

    return ( 
        <Link class="card" to="/goals/1" style={{height:"80px",textDecoration:'none',color:'black'}}>
                <div class="card-body" style={{display:'grid',gridTemplateColumns:'25% 25% 25% 25%'}}>
                   <div style={textStyle}>Goal Title</div>
                   <div style={textStyle}>80%</div>
                   <div style={textStyle}><span class="fa fa-circle " style={{fontSize:'22px',color:'green'}}></span></div>
                   <div style={textStyle}><button className="btn btn-danger">Delete</button></div>
                </div>
        </Link>
     )
}