import axios from 'axios'
import React from 'react'
import RenderFoodSearch from './render'
import Axois from 'axios'

class FoodSearch extends React.Component {
    state = { 
        foodName:"",
        results:[],
        isLoading:false
    }

    handleFormChange = (event) =>{
        let {value} = event.target

        this.setState({
            foodName:value
        })
    }

    handleFormSubmit = () =>{

        this.state.foodName === ""?this.props.handleAlertMessage("Add a food name","danger"):

        this.setState({
            isLoading:true
        })
        
        axios.get("https://api.edamam.com/api/food-database/v2/parser?"+
        "app_id=242d1543"+
        "&app_key=4ae9b4c3a5e565399d71508602b89043"+
        "&title="+this.state.foodName+
        "&ingr="+this.state.foodName
        )
        .catch( err => {console.log(err)})
        .then( res =>{

            res.data.hints.length === 0? this.props.handleAlertMessage("Food not found","danger"):

            this.setState({
                results:res.data.hints,
                isLoading:false
            })
        })
    }
    render() { 
        return ( 
            <RenderFoodSearch 
            state = {this.state}
            handleFormChange = {this.handleFormChange}
            handleFormSubmit = {this.handleFormSubmit}
             />
         );
    }
}
 
export default FoodSearch;