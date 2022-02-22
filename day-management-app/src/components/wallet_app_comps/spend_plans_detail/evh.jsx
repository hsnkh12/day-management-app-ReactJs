import React from 'react'
import RenderSpendPlansDetail from './render'
import { withRouter } from "react-router";
import {ApiUrl} from '../../baseApiUrl'
import { formValidationCheck , formRespondCheck  } from '../../../abstraction/general'

class SpendPlansDetail extends React.Component {

    state = { 
        plan : {
            id: this.props.match.params.planId,
            title : '---'
        },
        form : {
            amount:0.0,
            more_details:"",
            day_number:1
        },
        budget : 0.0,
        spendings : [],
        isOpen : false,
        isLoading : true,
    }

    componentDidMount(){

        ApiUrl.get("wallet/spending-plans/"+this.state.plan.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {

            let spendings = res.data.Spendings
            let budget = 0
            let count = res.data.Plan.Type ==="Weekly"?7:30;
            let days = []
            for( let i=0 ; i<count ; i++){days.push({id:i,spends:[]})}

            for( let i = 0 ; i<spendings.length ; i++ ){
                budget+= parseFloat(spendings[i].amount)
                days[spendings[i].day_number-1].spends.push(spendings[i])
            }
            
            this.setState({
                plan : res.data.Plan,
                budget : budget ,
                isOpen : false,
                spendings : days,
                isLoading : false,
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
        let newForm = {...this.state.form}
        
        newForm.[name] = value

        this.setState({
            form:newForm
        })
    }


    handleFormSubmit = () =>{

        let formData = {...this.state.form}
        let not_valid = formValidationCheck(formData)
        return not_valid? this.props.handleAlertMessage(not_valid,"danger"):
        
        parseInt(formData.day_number) <= 0 || parseInt(formData.day_number) > this.state.spendings.length?
        this.props.handleAlertMessage("Day number is out of range","danger"):

        ApiUrl.post("wallet/spending-plan-detail/"+this.state.plan.id+"/"
        ,formData
        )
        .then((res) => {

            let spendings = this.state.spendings
            let budget = this.state.budget
            spendings[res.data.day_number-1].spends.push(res.data)

            this.setState({
                spendings : spendings,
                form : {
                    amount:0.0,
                    more_details:"",
                    day_number:1
                },
                budget: budget+ parseFloat(res.data.amount),
                isOpen:false
            })
        })
    }

    handleDelete = (Wanted) => {

        var day_number = Wanted.day_number
        ApiUrl.delete("wallet/spending-plan-detail/"+Wanted.id+"/"
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let days = this.state.spendings
            let spends = days[day_number-1].spends

            spends.filter( spend => {
                return spend.id === Wanted.id? null: spend
            })
            
            days[day_number-1].spends = spends

            this.setState({
                spendings:days,
            })
            this.componentDidMount()
        })
    }

    render() { 
        
        return ( 
            <RenderSpendPlansDetail
            state = {this.state}
            handleModal = {this.handleModal}
            handleFormChange  = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            handleDelete = {this.handleDelete}
            />
         );
    }
}
 
export default withRouter(SpendPlansDetail);