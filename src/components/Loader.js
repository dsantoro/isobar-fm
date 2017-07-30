import React, { Component } from 'react';

class Loader extends Component {

    render() {

        return(
            <div>
                <div className="loading-container flex align-center justify-center">

                    <h2>Retrieve data.<br />Please wait!</h2>
                </div>
            </div>
        )
    }
}

export default Loader;