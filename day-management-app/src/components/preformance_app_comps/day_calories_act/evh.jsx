import React from 'react'
import {ApiUrl} from '../../baseApiUrl'
import { get_last_week  } from '../../../abstraction/days'
import { filterState } from '../../../abstraction/general'
import RenderDay from '../render_day_act'
class DayCaloriesActivity extends React.Component {

    state = { 

        chartData:{
            labels: [],
            datasets:[
              {
                label:'Last week calories',
                data:[ ],
              }
            ]
        },

        days : [],
        chart_open : 'none',
        isLoading : true,

    }



    componentDidMount(){

        ApiUrl.get("health/day-calories/"
        )
        .catch((err) => console.log(err))
        .then((res) => {

            let days = res.data.Days
            let chart = this.state.chartData
            let last_week = get_last_week(days)

            for( let i=0; i<last_week.length; i++){

                chart.labels.push(last_week[i].date)
            }


            this.setState({
                chartData:chart,
                days:days,
                isLoading : false,
            })
        })

    }


    handleChartDisplay = () =>{

        let display
        let data = []
        let days = get_last_week(this.state.days)
        let labels = this.state.chartData.labels

        for( let i=0 ; i<days.length; i++){
            data.push(parseFloat(days[i].total_calories))
        }

        this.setState({

            chart_open:!display,
            chartData:{
                labels : labels,
                datasets:[
                    {
                        label:"Last week calories",
                        data:data
                    }
                ]
            }
        })


    }


    handleDayDelete = (Wanted) =>{
        
        let c = window.confirm("Are you sure you want to delete this?")
        if(c===false){return null}

        ApiUrl.delete("health/day-calories-delete/"+Wanted.id+"/"
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
            < RenderDay
            state = {this.state}
            chart = {1}
            handleChartDisplay = {this.handleChartDisplay}
            handleDayDelete = {this.handleDayDelete}
            link = "/health/day-calories/"
            />
         );
    }
}
 
export default DayCaloriesActivity;