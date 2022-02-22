import React from 'react'
import {Link} from 'react-router-dom'

function Calander(props){
 

    const state = props.state

    const expiredStyle = {
        height:"65px",
        cursor:'not-allowed',
        backgroundColor:"rgb(153, 153, 153)",

    }

    const nonExpiredStyle = {
        height:"65px",
        cursor:"pointer",

    }

    const cell = {
        paddingBottom:'20px',
        backgroundColor:"",
        display:"block",
        textDecoration:'none',
        color:'black'
    }
    
    const calander_cells = () => {
        var weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri','Sat'];
        var days = state.days
        var row = []
        var calander = []
        var count = state.firstDayInMonth
        var days_count = 1
        

        for ( let i=0 ; i< 6 ;i++){
            
            for( let c = 1 ; c<=7 ; c++){

                if (c > count){

                    if(days_count > days){ break }
                    
                    if( days_count < state.date.day ){

                        row.push(<td style={expiredStyle}>{days_count}</td>)
                    }
                    
                    else if(days_count >= state.date.day){

                        let date = state.today[0]+"-"+state.today[1]+"-"+days_count
                        let link = "/todo/day-tasks/"+date
                        row.push(
                        <td style={nonExpiredStyle}><Link style={cell} to={link} >{days_count}</Link></td>
                    )}
                    days_count++
                }

                else{
                    row.push(<td style={expiredStyle}></td>)
                }

            }

            calander.push(row)
            count = 0
            row = []
            
        }
        return calander
    }
    console.log(calander_cells())


    return ( 
        
        <table class="table " >

            <thead className="table table-dark" >
                <tr>
                    <th  scope="col" style={{textAlign:'center'}} >Sun</th>
                    <th scope="col" style={{textAlign:'center'}}>Mon</th>
                    <th scope="col" style={{textAlign:'center'}}>Tues</th>
                    <th scope="col" style={{textAlign:'center'}}>Wed</th>
                    <th scope="col" style={{textAlign:'center'}}>Thu</th>
                    <th scope="col" style={{textAlign:'center'}}>Fri</th>
                    <th scope="col" style={{textAlign:'center'}}>Sat</th>
                </tr>
            </thead>
            
            <tbody>

                { calander_cells().map( cell => 
                    <tr>{cell}</tr>
                )}
                
            </tbody>

            
            

        </table> 
    );

}
 
export default Calander;