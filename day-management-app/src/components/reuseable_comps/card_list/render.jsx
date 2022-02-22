import React from 'react'
import {Link} from 'react-router-dom'

export default function Card(props){

    const textStyle ={
        display:'grid',placeItems:'center',fontSize:'20px',textDecoration:'none',color:'black',overflow:'hidden'
    }
    const btnStyle = {
        display:'grid',placeItems:'center'
    }

    const classname = "card bg-"+props.bg

    const cPrec = () =>{ 
        let inputs = props.inputs.length
        let p = (100/inputs)+'% '
        let prec = ''
        for ( let i=0 ; i<inputs;i++){prec+= p}

        return prec
    }


    return ( 
        <div className={classname}  style={{height:"auto",textDecoration:'none',color:'black'}}>
                <div class="card-body" style={{display:'grid',gridTemplateColumns:cPrec()}}>
                    {
                        props.inputs.map( input => {

                            let i = props.bg?<h5>{input} </h5>:<p >{input} </p>

                            return typeof input === "string"?(
                            <Link to={props.link} style={textStyle}>{input}</Link>
                            ):
                            <div style={btnStyle}>{input} </div>
                        }
                        )
                    }
                   
                </div>
        </div>
     )
}