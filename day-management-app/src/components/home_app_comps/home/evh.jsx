import React from 'react'
import RenderHome from './render'

class Home extends React.Component {
    state = {
        isOpen : false,
        apps_options : {
            todo : [{name:"Today's Tasks",link : "/todo/day-tasks/"+this.props.get_today()},{name:"Long-Term Tasks",link : "/todo/long-term-tasks"},{name:"Random Tasks",link : "/todo/random-tasks"}],
            wallet : [{name:"Today's Spendings",link : "/wallet/day-spendings-earnings/"+this.props.get_today()},{name:"Spending Plans",link:"/wallet/spending-plans"}],
            health : [{name:"Today's Calories",link : "/health/day-calories/"+this.props.get_today()},{name:"Food Search",link:"/health/food-search/"}],
            performance : [{name:"Spendings",link : "/performace/days-spends-earns-activity"},{name:"Health",link:"/performace/days-calories-activity"},{name:"Tasks",link:"/performace/days-tasks-activity"}]
        },
        options : [],
        
    }

    handleModal = (isOpen,options) =>{

        this.setState({
            options:options,
            isOpen:isOpen,
        })

    }
    render() { 
       


        return ( 
            <RenderHome 
                state = {this.state}
                handleModal = {this.handleModal}
            />
         );
    }
}
 
export default Home ;