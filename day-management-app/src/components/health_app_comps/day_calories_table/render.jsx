import React from 'react'
import EmptyTable from '../../reuseable_comps/empty_table/render'
import Loading from '../../reuseable_comps/all_loadings/laoding/render'

function DayCaloriesTable(props) {


    return (
        <>
            <table class="table ">

                <tbody>

                    {
                        props.isLoading?
                        <tr>
                            <td></td>
                            <td></td>
                            <td><Loading /></td>
                            <td></td>
                            <td></td>
                        </tr>:

                        props.foods.length > 0?props.foods.map( food =>
                            <tr>
                                <td style={{textAlign:'left',height:"80px"}}><p style={{marginTop:"15px"}}>{food.grams}gram/s &nbsp;of &nbsp;{food.name}</p></td>
                                
                                <td style={{textAlign:'left',marginLeft:"3px"}}><p style={{marginTop:"15px"}}>{food.calories}cal</p></td>
                                <td><p style={{marginTop:"15px"}}><button className="btn btn-danger btn-sm" onClick={()=> props.handleDelete(food)}>Delete</button></p></td>
                            </tr>
                        ):
                        <EmptyTable />
                    }
                   
                    
                </tbody>
            </table>
        </>
    )
}

export default DayCaloriesTable