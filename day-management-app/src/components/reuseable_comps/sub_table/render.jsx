import React from 'react'
import Loading from '../all_loadings/laoding/render'


function SubTable(props){
    
    return (
        <table class="table table-bordered " >
                <thead className="table-light">
                    <tr>
                        { props.keys.map( key => 
                            <th scope="col" style={{textAlign:"center"}}>{key}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        { props.values.map( value => 
                            
                            <td style={{textAlign:"center"}}>{props.isLoading?<Loading />:value}</td>
                        )}
                    </tr>
                </tbody>
        </table>
    )
}

export default SubTable