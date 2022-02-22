import React from 'react'
import { withRouter } from "react-router";
import RenderFoodDetail from './render'
import axios from 'axios';
import {ApiUrl} from '../../baseApiUrl'

class FoodDetail extends React.Component {

    state = { 
        dataNeeded : {
            
            ingredients:[
                {
                quantity:1,
                measureURI: "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                foodId : this.props.match.params.foodId,
                }
            ]
        },

        food :{
            name : "---",
        },

        related : {
            dietLabels: [""],
            healthLabels : [""],
            totalNutrients : {ENERC_KCAL : { label:"Calories" , quantity:0}},
        },

        form : {
            time:"Breakfast"
        },

        isOpen : false,
        isLoading:true,
    }

    componentDidMount(){

        axios.post("https://api.edamam.com/api/food-database/v2/nutrients?app_id=242d1543&app_key=4ae9b4c3a5e565399d71508602b89043",
        this.state.dataNeeded
        )
        .catch( err => {console.log(err)})
        .then( res => {
            this.setState({
                food: {
                    name : res.data.ingredients[0].parsed[0].food,
                },
                related : {
                    dietLabels: res.data.dietLabels,
                    healthLabels : res.data.healthLabels,
                    totalNutrients : res.data.totalNutrients,

                },
                isLoading:false,
            })
        })
    }

    handleModal = (isOpen) =>{

        this.setState({
            isOpen:isOpen,
        })

    }

    handleGramsChange = (event) =>{
        let {value} = event.target


        let data = this.state.dataNeeded
        data.ingredients[0].quantity = parseInt(value)

        this.setState({
            dataNeeded : data
        })
        
    }

    handleGramsApply = () =>{
        this.setState({
            isLoading:true
        })
        this.componentDidMount()
    }

    handleFormChange = (event) =>{
        let {value} = event.target

        this.setState({
            form:{ time : value}
        })
        
    }

    handleFormSubmit = () =>{

        let state = this.state
        let detail = state.dataNeeded.ingredients[0]
        

        let form = {
            name : state.food.name,
            foodId : detail.foodId,
            grams : parseInt(detail.quantity),
            calories : parseInt(state.related.totalNutrients.ENERC_KCAL.quantity),
            time : state.form.time
        }

        ApiUrl.post("health/day-calories/?"+
        "date="+this.props.get_today()+
        "&if_not_create=True"+
        "&start=True", form
        )
        .then ( res => { this.setState({
            form :{
                time : "Breakfast",
                
            },
            isOpen:false
        })

        this.props.handleAlertMessage("Added to your day",'success')
    })
    }

    render() { 

        return ( 
            <RenderFoodDetail 
                state = {this.state}
                handleGramsChange = {this.handleGramsChange}
                handleModal = {this.handleModal}
                handleFormChange = {this.handleFormChange}
                handleFormSubmit = {this.handleFormSubmit}
                handleGramsApply = {this.handleGramsApply}
            />
         );
    }
}
 
export default withRouter(FoodDetail);