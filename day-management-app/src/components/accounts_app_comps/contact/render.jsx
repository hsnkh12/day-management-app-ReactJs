import React from 'react'



export default function RenderContact(props){

    return ( 
        

        <div className="row justify-content-center">
        
                <div className="card col-auto" style={{width:'370px'}} >
                    <h5 className="card-header bg-white">Contact/Reports form</h5>
                    <br/>

                    <div className="card-body">
  
                        <form  method="POST" className="form-group">

                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Your Email"  name="email"></input>
                                <span className="input-group-text" id="basic-addon2">@example.com</span>
                            </div>

                            <div className="input-group mb-3">
                                <textarea className="form-control" placeholder="Message" style={{height:'200px'}}></textarea>
                            </div>

                            <br/>
                            <button className="btn btn-success" >Send</button>


                        </form>
                        
                    </div>
            </div>

        </div>
    )

}