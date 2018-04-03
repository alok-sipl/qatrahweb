import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Router from './config/router';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    render() {
        return (
            <div>
                <Router/>
            </div>
        );
    };
};

ReactDOM.render(<App/>, document.querySelector('#wrapper'));