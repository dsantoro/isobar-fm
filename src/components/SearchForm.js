import React, { Component } from 'react';

class SearchForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            term: ''
        }

        this.onSubmitTerm = this.onSubmitTerm.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmitTerm(e) {
        e.preventDefault();
        this.props.changeTerm(this.state.term);
        this.setState({
            term: ''
        })
    }

    onChange(e) {
        this.setState({ [e.target.name] : e.target.value })
    }

    render() {

        return(
            <form onSubmit={this.onSubmitTerm} action="" className="fit-form">

                <input
                    onChange={this.onChange}
                    value={this.state.term}
                    type="search"
                    name="term"
                    placeholder="Buscar..." 
                />
                <button type="submit"></button>
            </form>
        )
    }
}

export default SearchForm;