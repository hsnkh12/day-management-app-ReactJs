import React from 'react'
import {Link} from 'react-router-dom'
import ListLoading from '../../reuseable_comps/all_loadings/list_loading/render'
import EmptyList from '../../reuseable_comps/empty_list/render'

function RenderFoodSearch(props){

    return (
        <div className="container">
            
            <div className="row ">
                <div className="col-9">
                    <input type="text" className="form-control" placeholder="Food name" onChange={props.handleFormChange}/>
                </div>
                <div className="col-1">
                <button className="btn btn-info" onClick = {props.handleFormSubmit}>Search</button>
                </div>
                
            </div>
            <br/><hr/><br/>

            <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center" style={{gridGap:"20px"}}>

                { props.state.isLoading? 

                <ListLoading />
                
                :
                props.state.results.length>0?

                props.state.results.map( result =>{ 

                    let link = "/health/food-search/"+result.food.foodId
                    return (
                        <Link class="col" to={link}>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{result.food.label}</h5>
                                    
                                </div>
                            </div>
                        </Link>)
                }   ):
                <EmptyList />
            }
                
                
                
                
            </div>
        </div>
    )
}

export default RenderFoodSearch