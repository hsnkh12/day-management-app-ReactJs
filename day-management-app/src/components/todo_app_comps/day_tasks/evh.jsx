import React from 'react'
import CalanderDayTasksRender from './render'
import {ApiUrl} from '../../baseApiUrl'
import { withRouter } from "react-router";
import {  formValidationCheck , formRespondCheck , filterState } from '../../../abstraction/general'
import { creationAllowed , dayRespondCheck , daySendRequest } from '../../../abstraction/days'

class DayTasks extends React.Component{

    state ={
        day:{
            date :this.props.match.params.date,
        },
        tasks : [],
        isOpen : false,
        form : {
            text:"",
            time:"",
            important:false
        },
        check : null,
        isLoading : true,
        formLoading : false
    }

    

    componentDidMount(){

        let date = this.state.day.date
        var check = this.props.DateCheck(date) // Checking if the day in the past or today or fut (-1,0,1)
        
        daySendRequest("todo/day-tasks/",date,check)
        .then( res =>

            dayRespondCheck(res,check)? // Checking if the respond valid
            this.setState({
                day:res.data.Day,
                tasks:res.data.Tasks,
                check:check,
                isLoading:false
            }):
            this.setState({tasks:[],check:check,isLoading:false}) // Nothing in this day

            )

       

        

    }

    
    handleModal = (isOpen) =>{

        if(this.state.check===-1){ // This day is in the past, not allowed
            return null
        }

        this.setState({
            isOpen:isOpen,
        })

    }


    handleFormChange = (event) =>{

        let {value,checked,type,name} = event.target
        let newForm = this.state.form

        type ==='checkbox'?newForm.important = checked:     
        newForm.[name] = value

        this.setState({
            form:newForm
        })
    }

    applyFormLoading = () =>{
        let loading = !this.state.formLoading
        this.setState({
            formLoading :loading
        })
    }

    handleFormSubmit = () =>{

        let create_condition = "False"
        if(this.state.check===-1){return null}
        else{
            create_condition = this.state.tasks.length>0?"False":"True" }// This day is in the past, not allowed

        let formData = this.state.form
        let not_valid = formValidationCheck(formData)

        if( not_valid ){
            return this.props.handleAlertMessage(not_valid,"danger")
        }// Validation check for the form
        
        this.applyFormLoading()

        ApiUrl.post("todo/day-tasks/?"+
        "date="+this.state.day.date+
        "&if_not_create="+create_condition
        ,formData
        )
        .catch( err => { console.log(err) })
        .then((res) => {

            if (formRespondCheck(res)){// Checking if the respond is valid

            let tasks = this.state.tasks
            tasks.push(res.data)

            this.setState({
                tasks:tasks,
                form : {
                    text : "",
                    time : "",
                    important : false
                },
                isOpen : false,
                isLoading : false,
            })
            this.props.handleAlertMessage("New task added","success")

            }

            this.applyFormLoading()

            
        })
       

    }


    handleDelete = (Wanted) => {

        if(this.state.check===-1){// This day is in the past, not allowed
            return null
        }

        ApiUrl.delete("todo/day-tasks/"+Wanted.id+"/"
        )
        .then((res) => {

            let tasks = this.state.tasks

            tasks = filterState(tasks,Wanted)

            this.setState({tasks:tasks})
            this.props.handleAlertMessage("Task deleted","success")

            
        })
    }


    handleCheck = (Wanted) =>{

        if(this.state.check===-1 || this.state.check===1){// This day is in the past or in future, not allowed
            return null
        }
        Wanted.completed=!Wanted.completed

        ApiUrl.put("todo/day-tasks/"+Wanted.id+"/",
        Wanted
        )
        .then((res) => {
            let tasks = this.state.tasks

            tasks = tasks.filter( task => {
                return task === Wanted? res.data : task
            })

            this.setState({tasks:tasks})
        })
    }


    render(){      
        
        
        return ( 

            <CalanderDayTasksRender 
            state = {this.state}
            handleModal ={this.handleModal}
            handleFormChange = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            handleCheck = {this.handleCheck}
            handleDelete = {this.handleDelete}
             />
         )
         
    }
    
}
 
export default withRouter(DayTasks) ;