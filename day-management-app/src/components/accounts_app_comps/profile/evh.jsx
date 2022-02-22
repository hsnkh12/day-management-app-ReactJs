import React from 'react'
import CalanderDayTasksRender from './render'
import {ApiUrl} from '../../baseApiUrl'
import RenderProfile from './render'
import {  formValidationCheck , formRespondCheck } from '../../../abstraction/general'

class Profile extends React.Component {
    state = { 
        user : {
            first_name : "",
            last_name : "",
            username : "",
            email : "",
            
        }
    }

    componentDidMount(){

        ApiUrl.get("accounts/profile/")
        .catch(err=>{ console.log(err)})
        .then( res =>{

            this.setState({
                user:res.data
            })
        }
        )
    }

    handleFormChange = (event) =>{

        let { name , value } = event.target
        let formData = this.state.user

        formData.[name] = value

        this.setState({
            user:formData
        })
    }

    handleFormSubmit = () =>{
        let form = this.state.user

        ApiUrl.put("accounts/profile/",form)
        .then( res =>{

            if (formRespondCheck(res)){
                
                this.props.handleAlertMessage("Profile updated","success")
            }

        }
        )


    }


    render() { 
        return ( 
            <RenderProfile 
            user = {this.state.user}
            handleFormChange = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            />
         );
    }
}
 
export default Profile;