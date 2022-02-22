import React from 'react'
import ListLoading from '../../reuseable_comps/all_loadings/list_loading/render'
import EmptyList from '../../reuseable_comps/empty_list/render'

function RandomTasksRender(props){

    const taskStyle = {
        display:'grid',
        placeItems:'center'
    }

    return(
        <div className="container">
            <form >
                <div className="row justify-content-center">
                    <div className="col-auto"><input type="text" className="form-control" value={props.state.form.text} onChange={props.handleFormChange} placeholder="Add task" style={{height:"38px",width:"250px"}}/></div>
                    <div className="col-auto"><button className="btn btn-dark mb-1" onClick={props.handleFormSubmit} type="button">Add</button></div>
                </div>
            </form>

            <br/><hr/><br/>

            <div className="container " style={{display:'grid',gridGap:'5px'}}>

                {
                    props.state.isLoading? 

                    <ListLoading />
                    :

                    props.state.tasks.length > 0?

                    props.state.tasks.map( task => 
                        <div className="" style={{padding:"15px"}} style={{display:'grid',gridAutoFlow:'column',padding:'20px',borderRadius:'5px',border:'1px solid rgba(0, 0, 0, 0.068)'}}>
                            <div className="col-auto m-2" style={taskStyle}>{task.text}</div>
                            <div className="col-auto m-2" style={taskStyle}><input type="checkbox" className="form-check-input" name="" checked={task.completed} onChange={()=>props.handleCheck(task)} id=""/></div>
                            <div className="col-auto m-2"  style={taskStyle}><button className="btn btn-danger" type="button" onClick={()=>props.handleDelete(task)}>Delete</button></div>
                        </div>
                    ):

                    <EmptyList />
                }
            </div>

        </div>
    )
}

export default RandomTasksRender 