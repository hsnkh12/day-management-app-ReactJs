import React from 'react'

function SubHeader(props){

        return ( 
        <div className="row justify-content-around bg-light ml-1 mr-1" style={{color:"black",borderRadius:'5px',height:'80px',border:'0.5px solid rgb(197, 197, 197)'}}>
            <div className="col-auto" style={{display:'grid',placeItems:'center'}}>
                <h4 style={{marginTop:"5px"}}>{props.input1}</h4>
            </div>
            <div className="col-auto" style={{display:'grid',placeItems:'center'}}>
                <h4 style={{marginTop:"5px"}}>{props.input2}</h4>
            </div>
            <div className="col-auto" style={{display:'grid',placeItems:'center'}}>
                <h4>{props.input3}</h4>
            </div>
        </div>
        );
}
 
export default SubHeader;