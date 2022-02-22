import React from 'react'
import RenderRegister from './render'
import axios from 'axios'
import {  formValidationCheck , formRespondCheck } from '../../../abstraction/general'

class Register extends React.Component {

    state = { 
        form : {
            username : "",
            email : "",
            password : "",
            password2 : "",
        },
        formLoading:false
    }


    handleFormChange = (event) =>{

        let { name , value } = event.target
        let formData = this.state.form
        formData.[name] = value

        this.setState({
            form : formData
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
        let not_valid = formValidationCheck(formData)

        return not_valid? this.props.handleAlertMessage(not_valid,"danger"):

        this.applyFormLoading()&

        axios.post("https://md-be-db-758.herokuapp.com/api/accounts/register/",formData)
        .then( res => {

            if (formRespondCheck(res)){
            window.location.href="/login"
            }

            this.applyFormLoading()
  
            
        })


    }

    render() { 
        return ( 
            <RenderRegister 
            formLoading = {this.state.formLoading}
            handleFormChange = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            />
         );
    }
}
 
export default Register;