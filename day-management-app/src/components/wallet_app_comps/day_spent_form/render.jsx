import React from 'react'
import Loading from '../../reuseable_comps/all_loadings/laoding/render'

export default function Form(props){
    const state=props.state
    return (
        
        <div>
            <div className="input-group ">
                <span class="input-group-text">$</span>
                    <input type="number" class="form-control" placeholder="Amount" name="amount" onChange={props.handleFormChange}></input>
                <span class="input-group-text">.00</span>
            </div>

            <br/>

            <div className="form-group">
                <input type="text" onChange={props.handleFormChange} className="form-control" name="more_details" placeholder="Add optional details" required/>
            </div>

            <br/>

            <select class="form-select" type="select" onChange={props.handleFormChange} name="type" aria-label="Default select example">
                <option selected value="spending">Spending</option>
                <option value="earning">Earning</option>
            </select>

            <br/>

            <label>
                Priority : &nbsp;
                <input type="checkbox" className="form-check-input" onChange={props.handleFormChange} name="priority" disabled={state.form.checkBoxDis} name="important"/> 
            </label>

            <br/>
            <br/>
            <button className="btn btn-default bg-success" style={{color:'white'}} type="button" onClick={props.handleFormSubmit}>
            { props.formLoading ? <Loading /> : "Add"}
            </button>
        </div>        
    )
}