import React from 'react'
import RenderDaySpendEarn from './render'
import {ApiUrl} from '../../baseApiUrl'
import { withRouter } from "react-router";
import { formValidationCheck , formRespondCheck , filterState } from '../../../abstraction/general'
import { creationAllowed , dayRespondCheck , daySendRequest } from '../../../abstraction/days'

class DaySpendEarn extends React.Component {

    state = {
        wallet:0.0,
        day:{
            date :this.props.match.params.date,
            total_spent : 0.0,
            total_earned : 0.0,
        },
        money_changes : [],
        isOpen : false,
        form : {
            amount:0.0,
            more_details:"",
            type:"spending",
            priority: false,
            checkBoxDis : this.type==="spending"?false:true
        },
        check : null,
        isLoading : true,
        formLoading:false
    }



    componentDidMount(){

        let date = this.state.day.date
        var check = this.props.DateCheck(date) // Checking if the day in the past or today or fut (-1,0,1)

        daySendRequest("wallet/day-spendings-earnings/",date,check)
        .then((res) => {

            if(dayRespondCheck(res,check)){

                var earnings = res.data.Earnings
                var money_changes = res.data.Spendings

                for( let i=0 ; i<earnings.length ; i++){// Gathering all together
                    money_changes.push(earnings[i])
                }
                
                this.setState({
                    wallet:res.data.Wallet,
                    day:res.data.Day,
                    money_changes : money_changes,
                    check:check,
                    isLoading:false
                })

            }

            else{ this.setState({money_changes:[],check:check,isLoading:false}) }
        })
    }


    handleModal = (isOpen) =>{

        if(this.state.check===-1){
            return null
        }

        this.setState({
            isOpen:isOpen,
        })

    }

    applyFormLoading = () =>{
        let loading = !this.state.formLoading
        this.setState({
            formLoading :loading
        })
    }


    handleFormChange = (event) =>{

        let {value,checked,type,name} = event.target
        let newForm = {...this.state.form}

        type === 'checkbox'? newForm.priority = checked:
        newForm.[name] = value

        newForm.checkBoxDis = newForm.type === "spending"?false:true// If spend it means that priority option is available else not

        this.setState({
            form:newForm
        })

    }


    handleFormSubmit = () =>{

        if(this.state.check===-1){
            return null
        }

        let prems = creationAllowed(this.state.check)
        let formData = {...this.state.form}
        let amount = parseFloat(formData.amount)
        let not_valid = formValidationCheck(formData)

        return not_valid? this.props.handleAlertMessage(not_valid,"danger"):// Validation check for the form:
        amount> parseFloat(this.state.wallet) && formData.type === "spending" ||
        amount < 0? this.props.handleAlertMessage("Money amount is not valid","danger"):

        this.applyFormLoading()&
        
        ApiUrl.post("wallet/day-spendings-earnings/?"+
        "date="+this.state.day.date+
        "&if_not_create="+prems.create_condition+
        "&type="+formData.type
        ,formData
        )
        .catch(err=>console.log(err))
        .then((res) => {

            if (formRespondCheck(res)){

                let money_changes = this.state.money_changes
                money_changes.push(res.data)
                this.handleNumbersChange(amount,formData.type,"add")

                this.setState({
                    money_changes : money_changes,
                    isOpen : false,
                    form : {
                        amount:0.0,
                        more_details:"",
                        type:"spending",
                        priority: false,
                        checkBoxDis : this.type==="spending"?false:true
                    },
                })

                this.props.handleAlertMessage("New action added","success")
            }

            this.applyFormLoading()
            
        })
    }


    handleNumbersChange = (amount,type,action) => {

        let wallet =parseFloat(this.state.wallet)
        let total_spent = parseFloat(this.state.day.total_spent)
        let total_earned = parseFloat(this.state.day.total_earned)
        let date = this.state.day.date

        if ( type === "spending"){

            wallet += action==="add"? -amount:amount
            total_spent += action ==="add"? amount:-amount
            
        }
        else {
            wallet += action==="add"? amount:-amount
            total_earned += action ==="add"? amount:-amount
        }

        this.setState({
            wallet :wallet,
            day : {
                date:date,
                total_spent:total_spent,
                total_earned:total_earned
            }
        })

    }


    handleDelete = (Wanted,type) => {

        if(this.state.check===-1){
            return null
        }

        let amount = parseFloat(Wanted.amount)

        ApiUrl.delete("wallet/day-spendings-earnings/"+Wanted.id+"/?"+
        "type="+type
        )
        .catch((err) => console.log(err))
        .then((res) => {
            let money_changes = this.state.money_changes

            money_changes= filterState(money_changes,Wanted)
            this.handleNumbersChange(amount,type,"delete")

            this.setState({money_changes:money_changes})
            this.props.handleAlertMessage("Task deleted","success")

            
        })
    }
    

    render() { 
        
        return ( 
            
            <RenderDaySpendEarn
            state = {this.state}
            handleModal = {this.handleModal}
            handleFormChange = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
            handleDelete = {this.handleDelete}
            />
         )
    }
}
 
export default withRouter(DaySpendEarn) ;