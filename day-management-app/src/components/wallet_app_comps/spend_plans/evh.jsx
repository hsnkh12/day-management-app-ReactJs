import React from 'react'
import RenderSpendingPlan from './render'
import {ApiUrl} from '../../baseApiUrl'


class SpendingsPlan extends React.Component {

    state = { 
        plans:[],
        isOpen:false,
        form : {
            title:"",
            Type:"Weekly"
        },
        isLoading:true,
        formLoading : false
    }

    componentDidMount() {

        ApiUrl.get("wallet/spending-plans/")
        .catch((err) => console.log(err))
        .then((res) => {
            
            this.setState({
                plans:res.data.Plans,
                isOpen:false,
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

        let {name,value} = event.target
        let newForm = {...this.state.form}
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

        let formData = {...this.state.form}

        return formData.title === ""?this.props.handleAlertMessage("Title field is required","danger"):

        this.applyFormLoading()&

        ApiUrl.post("wallet/spending-plans/"
        ,formData
        )
        .catch( err => { console.log(err) })
        .then((res) => {
            let plans = this.state.plans
            plans.push(res.data)
            this.setState({
                plans:plans,
                isOpen:false,
                form:{
                    title:"",
                    Type:"Weekly"
                }
            })

            this.applyFormLoading()
            this.props.handleAlertMessage("New plan added","success")
            
        })

    }


    handleDelete = (WantedPlan) =>{

        let c = window.confirm("Are you sure you want to delete this?")
        if(c===false){return null}

        ApiUrl.delete("wallet/spending-plans/"+WantedPlan.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let plans = this.state.plans

            plans= plans.filter( plan => {
                return plan !== WantedPlan? plan : null
            })

            this.setState({
                plans:plans
            })
        })
    }

    
    render() { 

        return ( <RenderSpendingPlan
            state = {this.state}
            handleModal = {this.handleModal}
            handleFormChange = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            handleDelete = {this.handleDelete}
        /> );
    }
}
 
export default SpendingsPlan;