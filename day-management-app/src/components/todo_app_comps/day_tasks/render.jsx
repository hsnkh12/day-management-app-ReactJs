import React from 'react'
import Modal from 'react-modal'
import GroupTable from '../group_table/render'
import FormCancel from '../../reuseable_comps/form_cancel/render'
import TaskForm from '../task_form/render'
import CardList from '../../reuseable_comps/card_list/render'


function RenderDayTasks(props){
    
    console.log(props.state.check)
    const addBtn = <button className="btn btn-success" onClick={props.handleModal} disabled={props.state.check===0 || props.state.check===1? false:true}>Add Task</button>

    return ( 
        <div className="container">

            <CardList 
            inputs={[props.state.day.date,"",addBtn]}
            bg = {"light"}          
            />
            
            <br/><hr/><br/>

            <div>

                <GroupTable 
                tasks={props.state.tasks} 
                handleDelete={props.handleDelete} 
                handleCheck={props.handleCheck}
                check = {props.state.check}
                isLoading = {props.state.isLoading}/>


            </div>

            

            <Modal 
                isOpen={props.state.isOpen}
                style={{content:{
                    top:"10%",
                    bottom:"auto",
                    right:"10%",
                    left:"10%",
                    
                }}}
                >   <div className="container">

                        <TaskForm handleFormChange = { props.handleFormChange} handleFormSubmit = { props.handleFormSubmit } formLoading={props.state.formLoading}/>

                    </div>
                    
                    <hr/>

                    <FormCancel handleModal = { props.handleModal } />
                
            </Modal>
              
        </div>
     )
}

export default RenderDayTasks