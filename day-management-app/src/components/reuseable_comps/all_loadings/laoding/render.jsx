import React from 'react'



export default function Loading(props){

    return (
        <div className="spinner-border" role="status" style={props.style}>
            <span class="visually-hidden"></span>
        </div>
    )
}