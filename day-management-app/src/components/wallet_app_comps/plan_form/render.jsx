import React from 'react'
import Loading from '../../reuseable_comps/all_loadings/laoding/render'

export default function Form(props){

    return (
        <form >
            <div className="form-group">
                <input type="text" onChange={props.handleFormChange} className="form-control" name="title" placeholder="Plan Title" required/>
            </div>
            <br/>
            <select class="form-select" name="Type" onChange={props.handleFormChange} aria-label="Default select example">
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>
            <br/>
            <button className="btn btn-default bg-success" style={{color:'white'}} type="button" onClick={props.handleFormSubmit}>
                {props.formLoading ? <Loading /> : "Add"}
                </button>
        </form>
    )
}