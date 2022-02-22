import React from 'react'
import SubTable from '../../reuseable_comps/sub_table/render'
import CardList from '../../reuseable_comps/card_list/render'
import ListLoading from '../../reuseable_comps/all_loadings/list_loading/render'
import EmptyList from '../../reuseable_comps/empty_list/render'


export default function RenderGoalDetail(props){

    const state = props.state
    const is_achieved = state.goal.is_achieved

    const addBtn = state.goal.work_started?<button className="btn btn-danger" onClick={props.startEnd} >End Work</button>:
    <button className="btn btn-success" onClick={props.startEnd} disabled={is_achieved}>Start Work</button>
    
    let tr = props.convertTimeToSecond(state.goal.target_hours+":00:00") 
    const prec = (tr- props.convertTimeToSecond(state.goal.time_left) ) *100 

    return ( 
        <div className="container">


            <CardList
            inputs={[state.goal.title,state.time_passing,addBtn ]}
            bg = {"light"}
            />

            <br/>

            <SubTable 
                keys = {["Target hr","Time left","prec done"]}
                values = {[state.goal.target_hours,state.goal.time_left,(prec/tr).toFixed(2)+"%"]}
            />

            <br/><hr/><br/>

            {   props.state.isLoading? 
                <ListLoading />
                :
                state.works.length>0?

                state.works.map( work => 
                <>
                    <CardList  
                    inputs = {[work.time_spent,work.date,<button onClick={()=>props.handleDelete(work)} className="btn btn-danger">Remove</button>]}
                    link = {"#"}
                    />
                    <br/>
                </>
                
            )
            :
            <EmptyList />
        }
            
            



        </div>
     )
}