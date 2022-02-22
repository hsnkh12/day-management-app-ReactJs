import React from 'react'

export default function FormCancel(props){

    return (

        <div className="row justify-content-center m-1">
            <div className="col-auto">
                <button className='btn btn-dark' onClick={() => props.handleModal(false,[])} style={{width:"200px",height:"50px"}}>Get back</button>
            </div>
        </div>
    )
}