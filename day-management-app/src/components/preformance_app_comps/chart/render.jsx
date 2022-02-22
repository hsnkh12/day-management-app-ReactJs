import React from 'react'
import {Line,Bar} from 'react-chartjs-2';


export default function Chart(props){

    return props.type==="line"?( 
        <div className="chart">

            <Line
            style = {{display:props.display}}
            data={props.data}
            options={{
                title:{
                display:true,
                fontSize:25
                },
                legend:{
                display:true,
                }
                
            }}
            />

        </div>
     ):
     <div className="chart">

            <Bar
            style = {{display:props.display}}
            data={props.data}
            options={{
                title:{
                display:true,
                fontSize:25
                },
                legend:{
                display:true,
                }
                
            }}
            />

        </div>
}