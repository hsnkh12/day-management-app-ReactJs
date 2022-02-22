import React from 'react'
import LongTermTasksRender from './render'


class LongTermTasks extends React.Component {
    state = { 
        date : {
            day:"",
            month:"",
            year:"",
        },
        days:0 ,
        firstDayInMonth : "",
        today : this.props.get_today().split("-")
     }

    daysCount = () =>{
        let year = new Date().getFullYear()
        let month = new Date().getMonth()+1
        return new Date(year, month, 0).getDate();
    }

    getDayOf = (dateString)=>{

        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri','Sat'];
        var d = new Date(dateString);
        return days[d.getDay()];
    }

    componentDidMount(){

        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

        this.setState({
            date :{
                day: this.state.today[2],
                month : months[ new Date().getMonth()],
                year : new Date().getFullYear()
            },
            days:this.daysCount(),
            firstDayInMonth : firstDay.getDay()
        })


    }
    render() { 
        
        return  ( <LongTermTasksRender 
            state = {this.state}
        /> )
        
    }
}
 
export default LongTermTasks;