import React from 'react'
import RenderGoalsMain from './render'
import {ApiUrl} from '../../baseApiUrl'
import { formRespondCheck , filterState } from '../../../abstraction/general'

class GoalsMain extends React.Component {
    
    state = { 
        goals:[],
        isOpen : false,
        form:{
            title:"---",
            target_hours:1,
        },
        isLoading:true,
        formLoading:false
    }


    
    componentDidMount(){

        ApiUrl.get("goals/goal-works/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            this.setState({
                goals:res.data.Goals,
                isLoading:false
            })
        })

    }

    
    handleModal = (isOpen) =>{

        this.setState({
            isOpen:isOpen,
        })
    }


    handleFormChange = (event) =>{

        let {value,name} = event.target
        let formData = this.state.form
        formData.[name] = value

        this.setState({
            form:formData
        })
    }


    applyFormLoading = () =>{
        let loading = !this.state.formLoading
        this.setState({
            formLoading :loading
        })
    }


    handleFormSubmit = () =>{

        let formData = this.state.form

        return parseFloat(formData.target_hours)>20? this.props.handleAlertMessage("Max hours 20","danger"):

        this.applyFormLoading()&

        ApiUrl.post("goals/goal-works/",
        formData
        )
        .catch((err) => console.log(err))
        .then((res) => {

            if (formRespondCheck(res)){

            let goals = this.state.goals
            goals.push(res.data)
            this.setState({
                gaols:goals,
                isOpen:false,
                form:{
                    title:'---',
                    target_hours:1,
                }
            })

            this.props.handleAlertMessage("New goal added","success")
            }

            this.applyFormLoading()
        })


    }


    handleDelete = (Wanted) =>{

        let c = window.confirm("Are you sure you want to delete this?")
        if(c===false){return null}

        ApiUrl.delete("goals/goal-works/"+Wanted.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let goals = this.state.goals

            goals = filterState(goals,Wanted)

            this.setState({goals:goals})
            this.props.handleAlertMessage("Goal deleted","success")
        })
    }

    render() { 

        return ( 
            <RenderGoalsMain 
            state = {this.state}
            handleModal ={this.handleModal}
            handleFormChange={this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            handleDelete = {this.handleDelete}/>
         );
    }
}
 
export default GoalsMain;