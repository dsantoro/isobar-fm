import React, { Component } from 'react';
import logo from './images/logo.png';
import notFoundImage from './images/no_results.png';
import axios from 'axios';

import SearchForm from './components/SearchForm';
import CardBand from './components/CardBand';
import Loader from './components/Loader';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {            
            busca : '',
            bands: [],
            cache: [],
            numResults: 0,
            hasResults: true,
            isLoading: false
        }

        this.onChangeTerm = this.onChangeTerm.bind(this)
        //this.onChangeFilter = this.onChangeFilter.bind(this)
    }

    componentWillMount() {

        const results = axios.get('https://iws-recruiting-bands.herokuapp.com/api/bands').then(function (res) {
            if(res.data.cod && res.data.message) {
                throw new Error(res.data.message);
            } else {
                return res.data;
            }
        }, function (res){
            throw new Error(res.data.message);
        });

        results.then((data) => {
            this.setState({
                bands: data,
                cache: data,
                numResults: data.length,
                isLoading: true
            })
        })
    }

    onChangeTerm(termoBusca) {

        if(termoBusca !== '') {

            let buscar = this.state.cache.filter((band) => {
                let regexp = new RegExp(termoBusca,'igm');						
				return regexp.test(band.name.toLowerCase());
            })

            this.setState({
                bands: buscar,
                numResults: buscar.length,
                hasResults: true
            })

            if(buscar.length === 0) {

                this.setState({
                    hasResults: false
                })

                setTimeout(() => {
                    this.setState({
                        hasResults: true,
                        bands: this.state.cache,
                        numResults: this.state.cache.length
                    })
                }, 3000 )
            }
        }
    }

    render() {

        return (
        <div className="App-container">
            
            <header>
                
                <div className="row flex align-center">
                    <div className="small-8 medium-9 large-10 columns">
                        <SearchForm 
                            changeTerm={this.onChangeTerm}
                        />
                    </div>
                    <div className="small-4 medium-3 large-2 columns">                    
                        <figure>
                            <img src={logo} alt="" title="Isobar.fm" />
                        </figure>
                    </div>
                </div>
            </header>
            <section className="some-infos">
                <div className="row">
                    <div className="small-9 columns">
                        {`${this.state.numResults} results found`}
                    </div>
                    <div className="small-3 columns">
                    </div>
                </div>
            </section>
            <main className="container">

                <div className="row">
                    <div className="small-12 columns">
                        {this.state.isLoading ? 
                            this.state.hasResults 
                            ?
                                <ul className="list-bands small-block-grid-1 medium-block-grid-2 large-block-grid-2">
                                    {this.state.bands.map((band) => {
                                        return(
                                            <li key={band.id} className="each-block">
                                                <CardBand
                                                    name={band.name}
                                                    image={band.image}
                                                    numPlays={band.numPlays}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul> 
                            :
                                <div>
                                    <p className="text-center">No matchs found. Returning in 3 seconds!</p>
                                    <img src={ notFoundImage } className="centered" alt=""/>
                                </div>
                            
                        :
                        <Loader />
                        }
                    </div>
                </div>
            </main>
        </div>
        );
    }
}

export default App;
