import React from 'react'
import {ApiUrl} from '../../baseApiUrl'
import { get_last_week  } from '../../../abstraction/days'
import { filterState } from '../../../abstraction/general'
import RenderDay from '../render_day_act'

class DaySpendsActivity extends React.Component {

    state = { 

        chartData:{
            labels: [],
            datasets:[
              {
                label:'Last week spendings',
                data:[ ],
              }
            ]
        },

        days : [],
        spends_chart_open : 'none',
        earns_chart_open : 'none',
        isLoading : true,
        

    }


    componentDidMount(){

        ApiUrl.get("wallet/day-spendings-earnings/"
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

    handleChartDisplay = (type) =>{

        let display
        let data = []
        let days = get_last_week(this.state.days)
        let labels = this.state.chartData.labels

        if ( type === "s"){

            display = this.state.spends_chart_open

            for( let i=0 ; i<days.length; i++){
                data.push(parseFloat(days[i].total_spent))
            }

            return this.setState({
                spends_chart_open:!display,
                earns_chart_open:"none",
                chartData:{
                    labels : labels,
                    datasets:[
                        {
                            label:"Last week spendings",
                            data:data
                        }
                    ]
                }
                
            })

        }

        display = this.state.earns_chart_open

        for( let i=0 ; i<days.length; i++){
            data.push(parseFloat(days[i].total_earned))
        }
        this.setState({
            earns_chart_open:!display,
            spends_chart_open : "none",
            chartData:{
                labels : labels,
                datasets:[
                    {
                        label:"Last week earnings",
                        data:data
                    }
                ]
            }
        })

    }

    handleDayDelete = (Wanted) =>{

        let c = window.confirm("Are you sure you want to delete this?")
        if(c===false){return null}

        ApiUrl.delete("wallet/day-spendings-earnings-delete/"+Wanted.id+"/"
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
        console.log(this.state)
        return ( 
            <RenderDay
            state = {this.state}
            chart = {2}
            handleChartDisplay = {this.handleChartDisplay}
            handleDayDelete = {this.handleDayDelete}
            link = "/wallet/day-spendings-earnings/"
            
            />
         );
    }
}
 
export default DaySpendsActivity;