import React from 'react'
import {ApiUrl} from '../../baseApiUrl'
import { filterState } from '../../../abstraction/general'
import RenderDay from '../render_day_act'


class DayTasksActivity extends React.Component {
    state = { 
        days : [],
        isLoading : true,
    }

    componentDidMount(){

        ApiUrl.get("todo/day-tasks/"
        )
        .catch((err) => console.log(err))
        .then((res) => {

            let days = res.data.Days
            this.setState({
                days:days,
                isLoading : false,
            })
        })

    }

    handleDayDelete = (Wanted) =>{

        let c = window.confirm("Are you sure you want to delete this?")
        if(c===false){return null}

        ApiUrl.delete("todo/day-tasks-delete/"+Wanted.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let days = this.state.days

            days= filterState(days,Wanted)

            this.setState({days:days})
            this.props.handleAlertMessage("Day deleted","success")
        })

    }

    render() { 
        return ( 
            <RenderDay
            state = {this.state}
            chart = {null}
            link = "/todo/day-tasks/"
            />
         );
    }
}
 
export default DayTasksActivity