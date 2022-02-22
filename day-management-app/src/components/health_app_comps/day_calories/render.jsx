import React from 'react'
import SubTable from '../../reuseable_comps/sub_table/render'
import DayCaloriesTable from '../day_calories_table/render'
import {Link} from 'react-router-dom'
import CardList from '../../reuseable_comps/card_list/render'
import Loading from '../../reuseable_comps/all_loadings/laoding/render'

function RenderDayCalories(props){

    const H4Style={
        color:'white',
        marginBottom:'-1px',
        padding:'10px'
    }

    const orgFoods = () =>{

        let times = [[],[],[],[]]
        let foods = state.foods

        for ( let i = 0 ; i<foods.length ; i++){

            foods[i].time === "Breakfast"?times[0].push(foods[i]):
            foods[i].time === "Lunch"?times[1].push(foods[i]):
            foods[i].time === 'Dinner'?times[2].push(foods[i]):
            times[3].push(foods[i])

        }

        return times
    }

    const state = props.state
    const addBtn = <Link className="btn btn-success" to="/health/food-search/" disabled={state.check===0 || state.check===1? false:true}>Add Food</Link>
    return (
        <div className="container">

            

            <CardList 
            inputs={[state.day.date,"",addBtn]} 
            bg = {"light"} />
            <br/>

            <SubTable 
                keys = {["Total calories"]}
                values = {[props.state.isLoading?<Loading />:state.day.total_calories+"cal"]}
            />

            <br/><hr/><br/>

            <div>
                <h4 style={H4Style} className="bg-dark">Breakfast</h4>
                <DayCaloriesTable foods={orgFoods()[0]} handleDelete={props.handleDelete} isLoading={props.state.isLoading}/>
            </div>

            <br/>

            <div>
                <h4 style={H4Style} className="bg-dark">Lunch</h4>
                <DayCaloriesTable foods={orgFoods()[1]} handleDelete={props.handleDelete} isLoading={props.state.isLoading}/>
            </div>

            <br/>

            <div>
                <h4 style={H4Style} className="bg-dark">Dinner</h4>
                <DayCaloriesTable foods={orgFoods()[2]} handleDelete={props.handleDelete} isLoading={props.state.isLoading}/>
            </div>

            <br></br>

            <div>
                <h4 style={H4Style} className="bg-dark">Snacks</h4>
                <DayCaloriesTable foods={orgFoods()[3]} handleDelete={props.handleDelete} isLoading={props.state.isLoading}/>
            </div>



        </div>
    )
}

export default RenderDayCalories