import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAlerts, getUserDetailsForSettings} from '../../actions';
import Header from './../templates/header';
import LedtNavigation from './../templates/left_navigation';
import ListItemView from './ListItem';
import _ from 'lodash';
import firebase from 'firebase';
import {Spinner} from '../common';


class Alerts extends Component {
    state = {isLoading:true};

    /*
@Method : componentWillMount
@Params :
@Returns : *
*/
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=>
        {
            this.setState({isLoading:false})
            if(user)
            {
                if(user.emailVerified)
                {
                    this.props.getUserDetailsForSettings();
                    this.props.getAlerts();
                }
            }
        });

    }

    AlertItem(props) {
        props.alerts.map((alert) => {
            return <ListItemView alert={alert}/>
        })
    }

    /*
@Method : renderAlertIcon
@Params :
@Returns : *
*/
    renderAlertIcon(percentage) {
        if (percentage <= 25) {
            return (
                <span className="alert-icon"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
            )
        }
        else {
            return (
                <span className="info"><i className="fa fa-info-circle" aria-hidden="true"></i></span>
            )
        }
    }

    renderContent(){
        if(this.props.loading || this.state.isLoading)
        {
            return(
                <Spinner size="large"/>
            )
        }

        else{

            return (
                <ul className="list-items">
                    {this.props.alerts.map((alert, i) =>
                        <li key={i}>{this.renderAlertIcon(alert['percentage'])} {alert['message']}</li>
                    )}

                </ul>
            )

        }
    }

    /*
@Method : render
@Params :
@Returns : *
*/

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Alerts</h1>
                    </div>
                </div>
                <div className="row">
                    {this.renderContent()}
                </div>
                <LedtNavigation />
            </div>
        )

    }

};

const mapStateToProps = ({utility}) => {
    let alerts = [];
    if (utility.alerts) {
        alerts = [];
        _.map(utility.alerts, (val, uid) => {
            alerts.push(val)
        });
    }
    alerts = alerts.reverse();
    const {loading} = utility;
    console.log(loading);
    return {alerts, loading};
};

export default connect(mapStateToProps, {getUserDetailsForSettings, getAlerts})(Alerts);


