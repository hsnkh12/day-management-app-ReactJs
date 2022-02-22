import React from 'react'
import RenderLogin from './render'
import axios from 'axios'
import {  formValidationCheck , formRespondCheck } from '../../../abstraction/general'


class Login extends React.Component {

    state = { 
        form : {
            username : "",
            password : "",
        },
        formLoading : false
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

        axios.post("https://md-be-db-758.herokuapp.com/api/accounts/login/",formData)
        .catch( err => {})
        .then( res => {

            if (res)
            {
                localStorage.setItem("Token", res.data.token)
                localStorage.setItem("user", "authed")
                window.location.href="/"
                this.props.handleAlertMessage("Logged in ","success")
            }
            else{
                this.props.handleAlertMessage("Username or password is incorrect, try again","danger")
            }

            this.applyFormLoading()
            
        })

    }
    render() { 
        return ( 
            <RenderLogin 
            formLoading = {this.state.formLoading}
            handleFormChange = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            />
         );
    }
}
 
export default Login;