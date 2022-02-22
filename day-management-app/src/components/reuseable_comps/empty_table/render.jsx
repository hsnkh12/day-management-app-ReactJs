import React from 'react'


export default function EmptyTable(){

    const emptyRow = {
        padding:"20px"
    }

    return (

        
        <tr >
                                
            <td style={emptyRow}>---</td>
            <td style={emptyRow}>---</td>
            <td style={emptyRow}>---</td>
            <td style={emptyRow}>---</td>
            
        </tr>
    )
}