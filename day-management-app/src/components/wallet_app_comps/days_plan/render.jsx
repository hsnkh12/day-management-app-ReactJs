import React from 'react'
import {Accordion,Card,Button} from 'react-bootstrap'

export default function Days(props){

    const day = props.day
    let body = []
    for( let i =0 ; i< day.length ; i++){
        body.push(<li>{day[i].amount}</li>)
    }

    return ( 

        <div className="col-6">
            <Accordion defaultActiveKey="-1" >
                <Card className="bg-secondary">

                    <Card.Header className="row">
                        <Accordion.Toggle as={Button}  variant="link" eventKey={day.id+1} style={{textDecoration:'none',color:"white"}}>
                                <div className="col" >Day {day.id + 1}</div>
                                <hr/>
                                <div className="col" >{day.spends.length} spendings</div>  
                        </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey={day.id+1} >
                        <Card.Body >
                            <br/>
                                <div style={{color:'white'}} >
                                {day.spends.map( spend =>
                                    <>
                                    <div className="row">
                                    <div className="col-auto m-1">{spend.more_details}</div>
                                    <div className="col-auto m-1">{spend.amount}$</div>
                                    <div className="col-auto m-1"><button onClick={()=>props.handleDelete(spend)} className="btn btn-danger btn-sm">Delete</button></div>
                                    </div>
                                    <hr></hr>
                                    </>
                                )}
                                </div>
                        </Card.Body>
                    </Accordion.Collapse>

                </Card>
            </Accordion>
        <br/>
        </div>

        
     )
}