import React from 'react'
import EmptyTable from '../../reuseable_comps/empty_table/render';
import LoadingTable from '../../reuseable_comps/all_loadings/loading_table/render'

function SpenEarnTable(props){
    const disabled = props.check === -1 || props.check === 1?true:false
    return (
        
        <table class="table table-bordered">

                <thead className="table-dark">
                    <tr>
                    <th scope="col" style={{textAlign:"center"}}>Details</th>
                    <th scope="col" style={{textAlign:"center"}}>Amount</th>
                    <th scope="col" style={{textAlign:"center"}}>Priority</th>
                    <th scope="col" style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        props.isLoading?<LoadingTable /> :
                        
                        props.money_changes.length>0?props.money_changes.map( change => 

                        {
                            var icon = change.priority===true?<span>&#10003;</span>:<span >&#10005;</span>;
                            var type = change.priority===true||change.priority===false?["red","-",icon,"spending"]:["green","+","---","earning"];
                            return(
                                <tr>
                                    <td style={{textAlign:"center"}} >{change.more_details}</td>
                                    <td style={{textAlign:"center",color:type[0]}}>{type[1]} {change.amount}$</td>
                                    <td style={{textAlign:"center"}}>{type[2]}</td>
                                    <td style={{textAlign:"center"}}><button className="btn btn-danger btn-sm" disabled={disabled} onClick={()=>props.handleDelete(change,type[3])}>Remove</button></td>
                                </tr>
                                )
                        })
                        : <EmptyTable />
                    }
                </tbody>
                
            </table>

    )
}

export default SpenEarnTable