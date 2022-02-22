import React from 'react'
import Calander from '../calander/render'
import CardList from '../../reuseable_comps/card_list/render'

function LongTermTasksRender(props){

    

    return ( 
        
        <div className="container">

        <CardList inputs={[props.state.date.day,props.state.date.month,props.state.date.year]} 
        bg = {"light"}/>

        <br/><hr/><br/>

        <Calander 
        state = {props.state}
         />

        </div>
        
     )
}

export default LongTermTasksRender