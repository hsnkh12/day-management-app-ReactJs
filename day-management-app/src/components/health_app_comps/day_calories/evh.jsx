import React from 'react'
import RenderDayCalories from './render'
import {ApiUrl} from '../../baseApiUrl'
import { withRouter } from "react-router";
import { filterState } from '../../../abstraction/general'
import { creationAllowed , dayRespondCheck , daySendRequest } from '../../../abstraction/days'


class DayCalories extends React.Component {

    state = { 
        day:{
            date :this.props.match.params.date,
            total_calories : 0.0
        },

        foods : [],
        check : null,
        isLoading : true,

    }



    componentDidMount(){

        let date = this.state.day.date
        var check = this.props.DateCheck(date) // Checking if the day in the past or today or fut (-1,0,1)

        daySendRequest("health/day-calories/",date,check)
        .then((res) => { 

            return dayRespondCheck(res,check)?
            this.setState({
                day: res.data.Day,
                foods: res.data.Foods,
                check:check,
                isLoading : false,
            }):
            this.setState({foods:[],check:check,isLoading : false,})


        })


    }


    handleDelete = (Wanted) =>{

        if(this.state.check===-1 || this.state.check===1){
            return null
        }

        ApiUrl.delete("health/day-calories/"+Wanted.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {


            this.componentDidMount()
            this.props.handleAlertMessage("Food deleted from day",'success')
        })
    }

    
    render() { 
        console.log(this.state)
        return ( <RenderDayCalories
            state = {this.state} 
            handleDelete = {this.handleDelete}
        /> );
    }
}
 
export default withRouter(DayCalories);