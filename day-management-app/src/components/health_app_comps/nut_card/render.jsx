import React from 'react'

function NutCard(props){

    const nut = props.nut
    const q = props.quantity
    const totalNut = () => {

        let nuts = []

        for ( let key in nut ){

            nuts.push(
            <>
                {nut.[key].label} : {nut.[key].quantity}{nut.[key].unit}
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style={{width:nut.[key].quantity/q*100}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <br/>
            </>
            )

        }

        return nuts
    }
    return (
        <div class="card">
            <div class="card-body" style={{display:'grid'}}>
                <div>
                    <h5 class="card-title">Approximate Nutrients </h5>
                    {props.loading}
                </div>
                <br/>
                <div>
                    <input type="number" onChange={props.handleGramsChange} value={props.quantity} style={{width:"60px",textAlign:"center"}}/> grams
                    <br/>
                    <br/>
                    <button className="btn btn-info btn-sm" onClick={props.handleGramsApply}>Apply</button>
                </div>
                <hr/>
            </div>
            
            <div>
                
                <div className="container">
                    {totalNut()}
                </div>
                <br/>
            </div>
        </div>
    )
}

export default NutCard