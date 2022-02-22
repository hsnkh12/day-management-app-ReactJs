import React from 'react'
import Modal from 'react-modal'
import Form from '../plan_form/render'
import FormCancel from '../../reuseable_comps/form_cancel/render'
import CardList from '../../reuseable_comps/card_list/render'
import ListLoading from '../../reuseable_comps/all_loadings/list_loading/render'
import EmptyList from '../../reuseable_comps/empty_list/render'

function RenderSpendingPlan(props){

    const colStyle ={
        height:"80px",
        display:"grid",
        gridTemplateColumns:"40% 30% 30%",
        textDecoration:"none",
        color:"white",
        fontSize:"15px",
    }
    const addbtn = <button className="btn btn-success" onClick={props.handleModal} >Add Plan</button>

    return (
            <div className="container">


                <CardList 
                inputs={["Your plans","",addbtn]} 
                bg = {"light"} />

                <br/><hr/><br/>

                
                {
                    props.state.isLoading? 

                    <ListLoading />
                    :

                    props.state.plans.length>0?

                    props.state.plans.map( plan => 
                        { let link = "/wallet/spending-plans/"+plan.id
                        return (
                        <>
                            <CardList 
                                inputs = {[plan.title,plan.Type,<button className="btn btn-danger" onClick={()=>props.handleDelete(plan)}>Delete</button>]}
                                link = {link}
                            />
                            <br/>
                        </>
                        )}
                    ):
                    
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
                    <br/>
                        <Form handleFormChange={props.handleFormChange} formLoading={props.state.formLoading} handleFormSubmit={props.handleFormSubmit}/>
                    </div>
                    
                    <hr/>

                    <FormCancel handleModal={props.handleModal} />
                
                </Modal>

            </div>
    )
}

export default RenderSpendingPlan