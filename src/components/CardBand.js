import React, { Component } from 'react';
import notFoundImage from './../images/no_results.png';

class CardBand extends Component {

    render(props) {

        return(
            <div>
                <div className="row flex align-end">

                    <div className="small-3 columns">
                        <img src={ this.props.image } onerror={ notFoundImage } alt=""/>
                    </div>
                    <div className="small-9 columns">
                        <h2>{ this.props.name }</h2>
                        <h6>{ `${this.props.numPlays} plays` }</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardBand;