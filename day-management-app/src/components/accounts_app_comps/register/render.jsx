import React from 'react'
import Loading from '../../reuseable_comps/all_loadings/laoding/render'

export default function RenderRegister(props){

    return ( 
        <div className="container">
            

            <div className="row justify-content-center">
                    <div className="card col-auto " style={{width:"370px"}} >
                        <h5 className="card-header bg-white">Register</h5>
                        <br/>
                        <div className="card-body">
                        <div action="" className="form-group">

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">@</span>
                            <input type="text" class="form-control" placeholder="Username" name="username"  onChange={props.handleFormChange}></input>
                        </div>

                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email"  name="email" onChange={props.handleFormChange}></input>
                            <span class="input-group-text" id="basic-addon2">@example.com</span>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">**</span>
                            <input type="password" class="form-control" placeholder="Password"  name="password" onChange={props.handleFormChange}></input>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">**</span>
                            <input type="password" class="form-control" placeholder="Password Confirm"  name="password2" onChange={props.handleFormChange}></input>
                        </div>
                        <br/>
                        <button className="btn btn-success" onClick={props.handleFormSubmit}>{props.formLoading? <Loading />:"Submit"}</button>

                        </div>
                            
                        </div>
                </div>
                
            </div>
            
        </div>
     )
}