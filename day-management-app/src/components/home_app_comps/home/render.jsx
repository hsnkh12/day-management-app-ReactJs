import React from 'react'
import Card from "../card/evh"
import Modal from 'react-modal'
import {Link} from 'react-router-dom'


function RenderHome(props){

    const free = <><i class="fas fa-unlock"></i> Free to use</>
    const premium = <><i class="fas fa-lock"></i> Buy premium to use it</>
    return ( 
        <div>
            
                <div className="container">
                    <div className="row  row-cols-md-3 g-4 justify-content-center" style={{gridGap:"2px"}}>

                        <div className="col-auto" style={{minWidth:'350px'}} onClick={() => props.handleModal(true,props.state.apps_options.todo)}>
                            <Card 
                            title="Tasks manager" text = {"Using tasks manager, you can manage your all daily and long-term tasks "} icon = { "fas fa-tasks" }
                            price = {free}
                            />
                        </div>

                        <div className="col-auto" style={{minWidth:'350px'}} onClick={() => props.handleModal(true,props.state.apps_options.wallet)}>
                            <Card 
                            title="Wallet manager" text = {"Using wallet manager, you can manage your daily finance activities"} icon = { "fas fa-wallet" }
                            price = {free}
                            />
                        </div>

                        <div className="col-auto" style={{minWidth:'350px'}} onClick={() => props.handleModal(true,props.state.apps_options.health)}>
                            <Card 
                            title="Health maneger" text = {"Using health manager, you can manage your daily health activities"} icon = { "fas fa-heartbeat" }
                            price = {free}
                            />
                        </div>

                        <Link className="col-auto"  to="/goals" style={{textDecoration:'none',color:'black',minWidth:'350px'}}>
                            <Card 
                            title="Goals manager" text = {"Using goals manager, you can manage and track your long-term goals"} icon = { "fas fa-bullseye" }
                            price = {free}
                            />
                        </Link>

                        <div className="col-auto" style={{minWidth:'350px'}} onClick={() => props.handleModal(true,props.state.apps_options.performance)}>
                            <Card 
                            title="Performance"  text = {"Using performance, you can see and track all your daily activities in this website"} icon = { "fas fa-chart-bar" }
                            price = {free}
                            />
                        </div>

                        <Link className="col-auto" to="/notepad" style={{textDecoration:'none',color:'black',minWidth:'350px'}}>
                            <Card 
                            title="Notepad"  text = {"Using notepad manager, you can manage your notes with a pro text editior"} icon = { "fas fa-clipboard" }
                            price = {free}
                            />
                        </Link>
                    </div>
                    

                    <Modal 
                    isOpen={props.state.isOpen}
                    style={{content:{
                        top:"10%",
                        bottom:"auto",
                        right:"10%",
                        left:"10%",
                        
                    }}}
                    >
                    
                    

                            {props.state.options.map( opt => 
                                <div className="row justify-content-center m-1" style={{backgroundColor:"rgb(247, 247, 247)",borderRadius:"3px"}}>
                                    
                                        <Link to={opt.link} className="col-md-12 modal-row-home "style={{
                                            textDecoration:"none"
                                            ,padding:"30px"
                                            ,textAlign:"center"
                                            ,color:"rgb(41, 41, 41)"
                                            ,borderRadius:'8px'
                                            }}>
                                        
                                            <h5>{opt.name}</h5>
                                        
                                        </Link>
                                    
                                </div>
                            )}
                        

                         <hr/>

                         <div className="row justify-content-center m-1">
                             <div className="col-auto">
                             <button className='btn btn-dark' onClick={() => props.handleModal(false,[])} style={{width:"200px",height:"50px"}}>Get back</button>
                             </div>
                         </div>

                        
                    
                
                    </Modal>
                    
                </div>
                
            </div>
     )
}

export default RenderHome