import React,{Component} from 'react';
import Logout from './logout';

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
                            <a href="dashboard"><i className="fa fa-home" aria-hidden="true"></i>Home</a>
                        </li>
                        <li>
                            <a href="device"><i className="fa fa-list" aria-hidden="true"></i>Device Details</a>
                        </li>
                        <li>
                            <a href="alerts"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>Alerts</a>
                        </li>
                        <li>
                            <a href="device-reading"><i className="fa fa-history" aria-hidden="true"></i>History</a>
                        </li>
                        <li>
                            <a href="reminder-setting"><i className="fa fa-calendar-o" aria-hidden="true"></i>Reminder Settings</a>
                        </li>
                        <li>
                            <a href="notification-setting"><i className="fa fa-bell" aria-hidden="true"></i>Notification Settings</a>
                        </li>
                        <li>
                            <a href="profile"><i className="fa fa-user" aria-hidden="true"></i>My Profile</a>
                        </li>
                        <li>
                            <a href="contact"><i className="fa fa-phone" aria-hidden="true"></i>Contact Us</a>
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