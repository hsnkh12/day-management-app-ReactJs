import React from 'react'
import SubTable from '../../reuseable_comps/sub_table/render'
import Modal from 'react-modal'
import Days from '../days_plan/render'
import FormCancel from '../../reuseable_comps/form_cancel/render'
import CardList from '../../reuseable_comps/card_list/render'
import ListLoading from '../../reuseable_comps/all_loadings/list_loading/render'

function RenderSpendPlansDetail(props){

    const state = props.state
    const addBtn = <button className="btn btn-success" onClick={props.handleModal}>Add Spending</button>
    const days = state.spendings.map( day => <Days day={day} handleDelete = {props.handleDelete}/>)
    
    return ( 
        <div className="container">

            <CardList 
            inputs={[state.plan.title,"",addBtn]} 
            bg = {"light"}/>

            <br/>

            <SubTable
                keys = {["Budget needed"]}
                values = {[parseFloat(state.budget)+"$"]}
            />

            <br/><hr/><br/>

            <div className="row">
                {props.state.isLoading? 

                <ListLoading />
                :days}
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
                    <br/>
                        <div>
                            <div className="input-group ">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" name="amount" placeholder="Amount" onChange={props.handleFormChange}></input>
                                <span class="input-group-text">.00</span>
                            </div>
                            <br/>
                            <div className="form-group">
                                <input type="text" onChange={props.handleFormChange} name="more_details" className="form-control" placeholder="Add optional details" required/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <input type="number" placeholder="Day number" name="day_number" onChange={props.handleFormChange} className="form-control" style={{width:"180px"}}/>
                            </div>
                            <br/>
                            <br/>
                            <button className="btn btn-default bg-success" style={{color:'white'}} type="button" onClick={props.handleFormSubmit}>Add</button>
                        </div>
                    </div>
                    
                    <hr/>

                    <FormCancel handleModal = { props.handleModal } />
                
            </Modal>
            
        </div>
        


        
     )
}

export default RenderSpendPlansDetail