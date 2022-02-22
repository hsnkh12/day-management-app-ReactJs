import React from 'react'
import NutCard from '../nut_card/render'
import Modal from 'react-modal'
import FormCancel from '../../reuseable_comps/form_cancel/render'
import CardList from '../../reuseable_comps/card_list/render'
import Loading from '../../reuseable_comps/all_loadings/laoding/render'
import {  is_auth } from '../../../abstraction/general'

function RenderFoodDetail(props){
    
    const state = props.state
    const addBtn = <button className="btn btn-success" disabled={is_auth()?false:true} onClick={props.handleModal}>Add To Day</button>
    const loading = state.isLoading?<Loading />:""

    return ( 
        <div className="container">
            

            <CardList 
            inputs={[state.food.name,"",addBtn]} 
            bg = {"light"}/>

            <br/><hr/><br/>

            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                <NutCard loading={loading}  handleGramsApply = {props.handleGramsApply} nut = {state.related.totalNutrients} quantity={state.dataNeeded.ingredients[0].quantity} handleGramsChange = {props.handleGramsChange}/>
                </div>

                <div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Diet labels </h5>
                        </div>
                        <ul>
                        {loading}
                            { state.related.dietLabels.map( x =>
                                <li>{x}</li>
                            )}
                        </ul>
                    </div>
                    <br/>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Health labels </h5>
                        </div>
                        <ul>
                        {loading}
                        { state.related.healthLabels.map( x =>
                                <li>{x}</li>
                            )}
                            
                        </ul>
                    </div>
                </div>

            </div>

            <br/>
            <Modal 
                isOpen={state.isOpen}
                style={{content:{
                    top:"10%",
                    bottom:"auto",
                    right:"10%",
                    left:"10%",
                    
                }}}
                >   <div className="container">
                    <br/>
                        <div>

                            <select class="form-select" type="select" onChange={props.handleFormChange} aria-label="Default select example">
                                <option selected value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
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

export default RenderFoodDetail