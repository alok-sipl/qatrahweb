import React, {Component} from 'react';
import Header from './templates/header';
import Alert from './alert';
import LedtNavigation from './templates/left_navigation';

const INITIAL_STATE = {
    alerts: '',
    error: null,
};


class AlertList extends Component {


    constructor(props) {
        super(props);

        this.state = {
            alerts: [],
            error: ''
        }

        this.setState({alerts : db.getAlerts()});

    }

    render() {
        return (
            <div>
                <Header/>
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Alerts</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <Alert alerts={this.state.alerts}/>
                        {/*<ul className="list-items">*/}
                        {/*<li><span className="info"><i className="fa fa-info-circle" aria-hidden="true"></i></span>The water level in the home tank is 95%.<span className="close">x</span></li>*/}
                        {/*<li><span className="alert-icon"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span>The water level in the home tank is 25%.<span className="close">x</span></li>*/}
                        {/*<li><span className="info"><i className="fa fa-info-circle" aria-hidden="true"></i></span>The water level in the tank is 50% left.<span className="close">x</span></li>*/}
                        {/*<li><span className="info"><i className="fa fa-info-circle" aria-hidden="true"></i></span>The water level in the tank is 75%.<span className="close">x</span></li>*/}
                        {/*<li><span className="alert-icon"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span>The water level in home tank is below 5%.<span className="close">x</span></li>*/}
                        {/*<li><span className="info"><i className="fa fa-info-circle" aria-hidden="true"></i></span>The water level in office tank is below 50%.<span className="close">x</span></li>*/}
                        {/*</ul>*/}

                    </div>
                </div>
                <LedtNavigation/>
            </div>
        )
    }
}


export default AlertList;