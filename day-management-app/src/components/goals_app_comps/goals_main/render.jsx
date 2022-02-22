import React from 'react'
import CardList from '../../reuseable_comps/card_list/render'
import Modal from 'react-modal'
import FormCancel from '../../reuseable_comps/form_cancel/render'
import GoalForm from '../goal_form/render'
import ListLoading from '../../reuseable_comps/all_loadings/list_loading/render'
import EmptyList from '../../reuseable_comps/empty_list/render'
import {convertTimeToSecond} from '../goal_detail/time'

export default function RenderGoalsMain(props){
    const state = props.state
    const addBtn = <button className="btn btn-success" onClick={props.handleModal}>Add Goal</button>

    return ( 

        <div className="container">

            <CardList 
            inputs={["Your Goals","",addBtn]} 
            bg = {"light"}
            />

            <br/><hr/><br/>

            {   props.state.isLoading? 
                <ListLoading />
                :

                state.goals.length>0?

                state.goals.map( goal => {
                let tr = convertTimeToSecond(goal.target_hours+":00:00")
                let prec = ( (tr-  convertTimeToSecond(goal.time_left)  ) *100 ) / tr
                let icon = goal.work_started?

                <div class="spinner-grow text-success" style={{fontSize:"22px"}} role="status">
                    <span class="visually-hidden"></span>
                </div>

                :
                <i class="fa fa-circle" style={{fontSize:"22px",color:"red"}}></i>
                let btn = <button className="btn btn-danger" onClick={()=>props.handleDelete(goal)}>Delete</button>

                return (
                    <>
                        <CardList inputs={[goal.title,prec.toFixed(2)+"%",icon,btn]} link={"/goals/"+goal.id} />
                        <br/>
                    </>
                )
                })
                :

                <EmptyList />
                
            
            
            }
            

            <Modal 
                isOpen={props.state.isOpen}
                style={{content:{
                    top:"10%",
                    bottom:"auto",
                    right:"10%",
                    left:"10%",
                    
                }}}
                >   <div className="container">

                        <GoalForm handleFormChange = { props.handleFormChange} formLoading={props.state.formLoading} handleFormSubmit = { props.handleFormSubmit } />

                    </div>
                    
                    <hr/>

                    <FormCancel handleModal = { props.handleModal } />
                
            </Modal>

        </div>
     )
}