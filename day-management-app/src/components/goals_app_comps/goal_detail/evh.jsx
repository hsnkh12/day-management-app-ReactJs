import React from 'react'
import {ApiUrl} from '../../baseApiUrl'
import RenderGoalDetail from './render'
import { withRouter } from "react-router";
import {converSecondsToTime, convertTimeToSecond , getLocalTime} from './time.js'


class GoalDetail extends React.Component {

    state = { 
        goal : {
            id : this.props.match.params.goalId,
            title : "---",
            target_hours : 0.0,
            time_left : "00:00:00"
        },
        works : [],
        time_passing : "",
        isLoading:true,
    }



    componentDidMount(){

        ApiUrl.get("goals/goal-works/"+this.state.goal.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            this.setState({
                goal : res.data.Goal,
                works : res.data.Works,
                time_passing : "00:00:00",
                isLoading:false
            })

            this.control()
        })
    }
      

    run = () =>{
        
        var work_started_in_sec = convertTimeToSecond(this.state.goal.work_started)
        var local_time_in_sec = convertTimeToSecond(getLocalTime())

        var deff = local_time_in_sec-work_started_in_sec

        this.setState({time_passing: converSecondsToTime(deff)})
    }


    control = () =>{

        
        const intev = setInterval( () => {

            if (this.state.time_passing.indexOf("-")!=-1 || parseFloat(this.state.time_passing.split(":").slice(0,2))>20 ){

                clearInterval(intev)
                this.setState({ time_passing : "00:00:00"})
                this.props.handleAlertMessage("Something went wrong","danger")
                this.startEnd()

            }

            this.state.goal.work_started===null?clearInterval(intev):this.run()

            },1000)


    }


    startEnd = () =>{

        let goal = {...this.state.goal}
        let action = goal.work_started?"end":"start"

        if ( action === "start" && this.state.goal.is_achieved){

            return this.props.handleAlertMessage("This goal is already achieved 100%","danger")
        }
 

        ApiUrl.put("goals/goal-works/"+this.state.goal.id+"/?"+
        "action="+action+
        "&spent="+convertTimeToSecond(this.state.time_passing)+
        "&time_started="+getLocalTime()
        )
        .catch((err) => console.log(err))
        .then((res) => {
            this.componentDidMount()
        })

        

    }


    handleDelete = (Wanted)=>{

        ApiUrl.delete("goals/delete-work/"+Wanted.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let works = this.state.works

            works = works.filter( work => {
                return work !== Wanted? work : null
            })

            this.setState({works:works})
            this.props.handleAlertMessage("Work removed","success")
        })

    }


    render() {

        console.log(this.state.goal.work_started)

        
        return ( 
            <RenderGoalDetail

            state = {this.state}
            control = {this.control}
            startEnd = {this.startEnd}
            handleDelete = {this.handleDelete}
            convertTimeToSecond = {convertTimeToSecond}

            />
         );
    }
}
 
export default withRouter(GoalDetail);