import Loading from '../laoding/render'
import React from 'react'

export default function LoadingTable(){

    const emptyRow = {
        padding:"20px"
    }

    return (

        
        <tr >
                                
            <td style={emptyRow}><Loading /></td>
            <td style={emptyRow}><Loading /></td>
            <td style={emptyRow}><Loading /></td>
            <td style={emptyRow}><Loading /></td>
            
        </tr>
    )
}