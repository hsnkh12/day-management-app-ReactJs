import React from 'react'



export default function RenderProfile(props){

    return ( 

        <div className="row justify-content-center">

            <div className="card col-auto" style={{width:'370px'}} >
                <h5 className="card-header bg-white">Profile form</h5>
                <br/>

                <div className="card-body">
                    <form  method="POST" className="form-group">

                        <p>First name : </p>

                        <div className="input-group mb-3">
                            
                            <input type="text" className="form-control" value={props.user.first_name} onChange={props.handleFormChange}  name="first_name"></input>
                            <span className="input-group-text" id="basic-addon2"></span>
                        </div>

                        <p>Last name : </p>

                        <div className="input-group mb-3">
                            
                            <input type="text" className="form-control" value={props.user.last_name} onChange={props.handleFormChange} name="last_name"></input>
                            <span className="input-group-text" id="basic-addon2"></span>
                        </div>

                        <p> Username :  </p>

                        <div className="input-group mb-3">
                            
                            <input type="text" className="form-control" value={props.user.username} onChange={props.handleFormChange} name="username"></input>
                            <span className="input-group-text" id="basic-addon2">@</span>
                        </div>

                        <p>Email :  </p>

                        <div className="input-group mb-3">
                            
                            <input type="text" className="form-control" value={props.user.email} onChange={props.handleFormChange} name="email"></input>
                            <span className="input-group-text" id="basic-addon2">@example.com</span>
                        </div>



                        <br/>
                        <button className="btn btn-success" onClick={props.handleFormSubmit} >Update</button>

                    </form>
                    
                </div>
            </div>

        </div>
     )
}