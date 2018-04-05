import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

const INITIAL_STATE = {
    alerts: '',
    error: null,
};


class ListItem extends Component {

    /*
@Method : renderAlertIcon
@Params :
@Returns : *
*/
    renderAlertIcon(percentage) {
        if (percentage <= 25) {
            return (
                <Icon name="warning" style={{color: "red"}}/>
            )
        }
        else {
            return (
                <Icon name="alert" style={{color: "#2eb9f9"}} color="#2eb9f9"/>
            )
        }
    }

    /*
@Method : render
@Params :
@Returns : *
*/
    render() {

        if (this.props.alerts.length > 0) {
            return (
                <li style={styles.listItemStyle}>
                    {this.renderAlertIcon(percentage)}>
                    <span className="info"><i className="fa fa-info-circle"
                                              aria-hidden="true"></i></span>The water level in the home
                    tank is 95%.<span className="close">x</span></li>
            )
        } else {
            return (
                <li>There has no alert message</li>
            )
        }
    }
}

const mapStateToProps = ({utility}) => {
    const {loading} = utility;
    return {alerts, loading};
};

export default ListItem;