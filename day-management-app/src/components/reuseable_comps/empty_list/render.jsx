import React from 'react'



export default function EmptyList(props){

    return (

        <div style={{display:'grid',placeItems:'center',borderRadius:'5px'}}>
            <div className="mid">
                <br/>
                <h4 style={{color:'rgba(0, 0, 0, 0.514)',fontSize:'80px',textAlign:'center'}}><i className="fas fa-box-open"></i></h4>
                <h4 style={{color:'rgba(0, 0, 0, 0.514)',textAlign:'center',marginLeft:'12px'}}>Empty...</h4>
                <br/>

            </div>
        </div>

        
    )
}