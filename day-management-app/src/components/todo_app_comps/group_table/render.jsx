import React from 'react'
import EmptyTable from '../../reuseable_comps/empty_table/render'
import LoadingTable from '../../reuseable_comps/all_loadings/loading_table/render'

function GroupTable(props){



    const deletebtn = props.check === -1? true:false;
    const checkbtn = props.check ===-1 || props.check === 1? true:false;

        return ( 

            <>
                <table class="table table-bordered">
                    
                    <thead className="bg-dark" style={{color:'white'}}>

                        <tr>

                            <th scope="col">Task</th>
                            <th scope="col">Time</th>
                            <th scope="col">Check</th>
                            <th scope="col">action</th>
                            
                        </tr>

                    </thead>

                    <tbody>

                        { props.isLoading?<LoadingTable /> :


                            props.tasks.length>0?props.tasks.map( task => 
                            
                            <tr key={task.id} >

                                <td style={{ textDecoration : task.completed?'line-through':'none',
                                    color:task.important?'rgb(153, 1, 1)':'rgb(0, 119, 0)'}}>{task.text}</td>
                                
                                <td >{task.time}</td>
                                <td ><input type="checkbox" checked={task.completed} className="form-check-input" disabled={checkbtn} onChange={()=> props.handleCheck(task)}/></td>
                                <td ><button className="btn btn-danger btn-sm" disabled={deletebtn} onClick={()=> props.handleDelete(task)}>Delete</button></td>
                           
                            </tr>

                            ):

                            <EmptyTable />
                        }

                    </tbody>
                    
                </table>
            </>

         );
}
 
export default GroupTable ;