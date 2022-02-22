import Loading from '../laoding/render'
import React from 'react'


export default function ListLoading(props){

    return (
        <div style={{display:'grid',placeItems:'center'}}>
            <div className="mid">
                <br/>
                <Loading style={{padding:'30px'}} />
                <br/>
            </div>
        </div>
    )
}