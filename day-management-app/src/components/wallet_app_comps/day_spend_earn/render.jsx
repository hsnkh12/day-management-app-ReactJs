import React from 'react'
import SubTable from '../../reuseable_comps/sub_table/render'
import SpendEarnTable from '../spend_earn_table/render'
import Form from '../day_spent_form/render'
import Modal from 'react-modal'
import FormCancel from '../../reuseable_comps/form_cancel/render'
import CardList from '../../reuseable_comps/card_list/render'

function RenderDaySpendEarn(props){
    
    const state = props.state
    const addBtn = <button className="btn btn-success" onClick={props.handleModal} disabled={props.state.check===0 || props.state.check===1? false:true}>Add + -</button>

    return (
        <div className="container">

            <CardList
            inputs={[props.state.day.date,"",addBtn]} 
            bg = {"light"}
            />
            <br/>

            <SubTable 
                keys = {["Budget","Spent","Earned"]}
                values = {[state.wallet+"$","- "+state.day.total_spent+"$","+ "+state.day.total_earned+"$"]}
                isLoading = {state.isLoading}
            />

            <br/><hr/><br/>

            <SpendEarnTable
            money_changes = {state.money_changes}
            handleDelete = {props.handleDelete}
            check = {state.check}
            isLoading = {state.isLoading}
            />

            <br/><br/>

            <Modal 
                isOpen={props.state.isOpen}
                style={{content:{
                    top:"10%",
                    bottom:"auto",
                    right:"10%",
                    left:"10%",
                    
                }}}
                >   <div className="container">
                    <br/>
                        <Form state={state} handleFormChange={props.handleFormChange} formLoading={state.formLoading} handleFormSubmit={props.handleFormSubmit}/>
                    </div>
                    
                    <hr/>

                    <FormCancel handleModal={props.handleModal} />
                
            </Modal>


            

        </div> 
        
        );
    
}
 
export default RenderDaySpendEarn ;