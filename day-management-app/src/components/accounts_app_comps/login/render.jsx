import React from 'react'
import Loading from '../../reuseable_comps/all_loadings/laoding/render'


export default function RenderLogin(props){

    return ( 
        <div className="container">

            

            <div className="row justify-content-center">
                    <div className="card col-auto" style={{width:"370px"}}>
                        <h5 className="card-header bg-white">Login</h5>
                        <br/>
                        <div className="card-body">
                        <div action="" className="form-group">

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">@</span>
                            <input type="text" class="form-control" placeholder="Username"  onChange={props.handleFormChange} name="username" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">**</span>
                            <input type="password" class="form-control" placeholder="password" onChange={props.handleFormChange} name="password" aria-label="password" aria-describedby="basic-addon1"></input>
                        </div>
                        <br/>
                        <button className="btn btn-success" onClick={props.handleFormSubmit}>   
                        {props.formLoading? <Loading />:"Submit"}
                        </button>
                        <br/>
                        <br/>
                        <a href="/register">don't have an account? Sign up</a>

                        </div>
                            
                        </div>
                    </div>

            </div>
            

 
            

        </div>
     )
}