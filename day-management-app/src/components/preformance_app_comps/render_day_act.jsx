import React from 'react'
import Chart from './chart/render'
import CardList from '../reuseable_comps/card_list/render'
import ListLoading from '../reuseable_comps/all_loadings/list_loading/render'
import EmptyList from '../reuseable_comps/empty_list/render'


export default function RenderDay(props){

    const state = props.state

    return ( 
        <div className="container">

            <CardList 
            inputs={["Days History"]}
            bg = {"light"}          
            />

            <br/><hr/><br/>

            {
                props.chart ===2 ?
                <>
                    <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-info btn-lg" onClick={()=>props.handleChartDisplay("s")}>Spendings chart</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-info btn-lg"  onClick={()=>props.handleChartDisplay("e")}>Earnings chart</button>
                    </div>
                    </div>
                    <br/>

                    <>
                        <Chart data={state.chartData} display={state.spends_chart_open} type={"line"}/>
                    </>
                    <>
                        <Chart data={state.chartData} display={state.earns_chart_open} type={"line"} />
                    </>

                    <br/>
                    <br/>
                </>:
                    props.chart === 1?
                    <>
                    <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-info btn-lg" onClick={props.handleChartDisplay}>Calories chart</button>
                    </div>
                    </div>
                    <br/>

                    <>
                        <Chart data={state.chartData} display={state.chart_open} type={"bar"}/>
                    </>

                    <br/>
                    <br/>
                </>:""
            }
            

            {   state.isLoading?
                    <ListLoading />
                :

                state.days.length>0?
                
                state.days.map( day =>
                <>
                    <CardList 
                        inputs={[day.date,<button className="btn btn-danger" onClick={()=>props.handleDayDelete(day)}>Delete</button>]}
                        link = {props.link+day.date}          
                    />
                    <br/>   
                </>
                )
                :
                <EmptyList />
            }
            
                

                    
            
        </div>
     )
}