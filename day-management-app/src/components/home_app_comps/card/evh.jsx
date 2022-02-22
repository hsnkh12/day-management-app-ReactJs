import React from 'react'


class Card extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div class="card  app-card" style={{height:'200px'}}>
                <div class="row g-0">
                    <div class="col-3"style={{display:'grid',placeItems:'center'}}>
                        <i class={this.props.icon} style={{fontSize:'60px'}}></i>
                    </div>
                    <div class="col-9">
                        <div class="card-body">
                            <h5 class="card-title">{this.props.title}</h5>
                            <p class="card-text">{this.props.text}</p>
                            <p class="card-text"><small class="text-muted">{this.props.price}</small></p>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Card ;