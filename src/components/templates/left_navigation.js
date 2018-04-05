import React,{Component} from 'react';
import Logout from './logout';
import { BrowserRouter as Router, Route, Link, Prompt,Redirect } from "react-router-dom";

class LeftNavigation extends Component{

    render(){
        return(
            <div className="hide">
                <nav className="navigation" id="mobile_menu">
                    <ul>
                        <li className="user">
                            <a href="#">
                                <img src="public/images/user.png"/>
                                <span className="user-name">Abbie</span><span className="close-menu"><i className="fa fa-times" aria-hidden="true"></i></span>
                            </a>
                        </li>
                        <li>
                      <Link to="/Home" className="fa fa-home" aria-hidden="true">Home</Link>
                        </li>
                        <li>
                        <Link to="/device" className="fa fa-list" aria-hidden="true">Device Details</Link>
                        </li>
                        <li>
                        <Link to="/alerts" className="fa fa-exclamation-triangle" aria-hidden="true">Alerts</Link>
                        </li>
                        <li>
                            <Link to="/device-reading"><i className="fa fa-history" aria-hidden="true"></i>History</Link>
                        </li>

                        <li>
                        <Link to="/reminder-setting" className="fa fa-calendar-o" aria-hidden="true">Reminder Settings</Link>
                        </li>
                        <li>
                        <Link to="/notification-setting" className="fa fa-bell" aria-hidden="true">Notification Settings</Link>
                        </li>
                        <li>
                        <Link to="/profile" className="fa fa-user" aria-hidden="true">My Profile</Link>
                        </li>
                        <li>
                        <Link to="/contact" className="fa fa-phone" aria-hidden="true">Contact Us</Link>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default LeftNavigation;
