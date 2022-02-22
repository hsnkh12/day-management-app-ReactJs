import React from 'react'
import RandomTasksRender from './render'
import {ApiUrl} from '../../baseApiUrl'


class RandomTasks extends React.Component {
    state = { 
        tasks : [],
        form : {
            text : ""
        },
        isLoading : true
    }

    componentDidMount(){

        ApiUrl.get("todo/random-tasks/")
        .catch((err) => console.log(err))
        .then((res) => {
            this.setState({
                tasks:res.data.Tasks,
                isLoading : false
            })
        })

    }

    handleFormChange = (event) =>{
        
        let {value} = event.target
        let newForm = {...this.state.form}

        newForm.text = value;   

        this.setState({
            form:newForm
        })
    }

    handleFormSubmit = () =>{

        let formData = {...this.state.form}
        return formData.text ===""? this.props.handleAlertMessage("Task field is required","danger"):

        ApiUrl.post("todo/random-tasks/"
        ,formData
        )
        .catch( err => { console.log(err) })
        .then((res) => {
            let tasks = this.state.tasks
            tasks.push(res.data)
            this.setState({
                tasks : tasks,
                form : {
                    text:""
                }
            })
        })

    }

    handleDelete = (Wantedtask) => {

        ApiUrl.delete("todo/random-tasks/"+Wantedtask.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let tasks = this.state.tasks

            tasks = tasks.filter( task => {
                return task !== Wantedtask? task : null
            })

            this.setState({tasks:tasks})
            this.props.handleAlertMessage("Task deleted","success")

            
        })
    }

    handleCheck = (Wantedtask) =>{

        Wantedtask.completed=!Wantedtask.completed

        ApiUrl.put("todo/day-tasks/"+Wantedtask.id+"/",
        Wantedtask
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let tasks = this.state.tasks


            tasks = tasks.filter( task => {
                return task === Wantedtask? res.data : task
            })

            this.setState({tasks:tasks})
        })
    }

    render() { 

        return  (
            <RandomTasksRender 
            state = {this.state}
            handleFormChange = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            handleDelete = {this.handleDelete}
            handleCheck = {this.handleCheck}

            />)
    }
}
 
export default RandomTasks;