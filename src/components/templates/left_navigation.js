import React,{Component} from 'react';
import Logout from './logout';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class LeftNavigation extends Component{

    render(){
        return (<Router>
            <div  className="hide">
                <nav className="navigation" id="mobile_menu">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                            <li className="user">
                                <a href="#">
                                    <img src="public/images/user.png"/>
                                    <span className="user-name">Abbie</span><span className="close-menu"><i className="fa fa-times" aria-hidden="true"></i></span>
                                </a>
                            </li>
                            <li>
                                <Link to="/Home"><i className="fa fa-home" aria-hidden="true"></i>Home</Link>
                            </li>
                            <li>
                                <Link to="/device"><i className="fa fa-list" aria-hidden="true"></i>Device Details</Link>
                            </li>
                            <li>
                                <Link to="/alerts" ><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>Alerts</Link>
                            </li>
                            <li>
                                <Link to="/device-reading"><i className="fa fa-history" aria-hidden="true"></i>History</Link>
                            </li>

                            <li>
                                <Link to="/reminder-setting"><i  className="fa fa-calendar-o" aria-hidden="true"></i>Reminder Settings</Link>
                            </li>
                            <li>
                                <Link to="/notification-setting" ><i className="fa fa-bell" aria-hidden="true"></i>Notification Settings</Link>
                            </li>
                            <li>
                                <Link to="/profile" ><i className="fa fa-user" aria-hidden="true"></i>My Profile</Link>
                            </li>
                            <li>
                                <Link to="/contact"><i  className="fa fa-phone" aria-hidden="true"></i>Contact Us</Link>
                            </li>
                            <li>
                                <Logout />
                            </li>
                        </ul>
                </nav>
                </div>
        </Router>)
        // return(
        //     <Router>
        //       <div className="hide">
        //         <nav className="navigation" id="mobile_menu">
        //             <ul>
        //                 <li className="user">
        //                     <a href="#">
        //                         <img src="public/images/user.png"/>
        //                         <span className="user-name">Abbie</span><span className="close-menu"><i className="fa fa-times" aria-hidden="true"></i></span>
        //                     </a>
        //                 </li>
        //                 <li>
        //                   <Link to="/Home"><i className="fa fa-home" aria-hidden="true"></i>Home</Link>
        //                 </li>
        //                 <li>
        //                 <Link to="/device"><i className="fa fa-list" aria-hidden="true"></i>Device Details</Link>
        //                 </li>
        //                 <li>
        //                 <Link to="/alerts" ><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>Alerts</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/device-reading"><i className="fa fa-history" aria-hidden="true"></i>History</Link>
        //                 </li>
        //
        //                 <li>
        //                 <Link to="/reminder-setting"><i  className="fa fa-calendar-o" aria-hidden="true"></i>Reminder Settings</Link>
        //                 </li>
        //                 <li>
        //                 <Link to="/notification-setting" ><i className="fa fa-bell" aria-hidden="true"></i>Notification Settings</Link>
        //                 </li>
        //                 <li>
        //                 <Link to="/profile" ><i className="fa fa-user" aria-hidden="true"></i>My Profile</Link>
        //                 </li>
        //                 <li>
        //                 <Link to="/contact"><i  className="fa fa-phone" aria-hidden="true"></i>Contact Us</Link>
        //                 </li>
        //                 <li>
        //                     <Logout />
        //                 </li>
        //             </ul>
        //         </nav>
        //     </div>
        //     </Router>
        //
        // )
    }
}

export default LeftNavigation;
