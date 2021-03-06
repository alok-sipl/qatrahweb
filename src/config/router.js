import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../components/Auth/login';
import Signup from '../components/Auth/signup';
import ForgotPassword from '../components/Auth/forgot_password';
import ChangePasswordForm from '../components/Auth/change_password_fom';
import AccountVerification from '../components/account_verification';
import RegistrationSuccess from '../components/Auth/registration_success';
import RegistrationVerification from '../components/Auth/registration_verification';
import Home from '../components/Home/Home';
import Profile from '../components/Auth/profile';
import AddDevice from '../components/add_device';
import EditDevice from '../components/Device/EditDeviceComponent';
import DeviceDetail from '../components/device_detail';
import DeviceComponent from '../components/Device/DeviceComponent';
import History from '../components/Device/History';
import ViewDevice from '../components/Device/ViewDevice';

import ReminderSetting from '../components/Settings/remainder_settings';
import Supplier from '../components/Utility/Supplier';
import Alerts from '../components/Utility/Alerts';
import NotificationSetting from '../components/Settings/notification_setting';
import Contact from '../components/Utility/ContactUs';
import TermsPolicy from '../components/Utility/TermsAndPolicy';
import AboutUs from '../components/Utility/AboutUs';


export default class Router extends Component{
    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/forgot-password" component={ForgotPassword} />
                            <Route path="/change-password" component={ChangePasswordForm} />
                            <Route path="/account-verification" component={AccountVerification} />
                            <Route path="/registration-success" component={RegistrationSuccess} />
                            <Route path="/registration-verification" component={RegistrationVerification}/>
                            <Route path="/home" component={Home} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/add-device" component={AddDevice} />
                            <Route path="/edit-device/:device_id" component={EditDevice} />
                            <Route path="/view-device" component={DeviceDetail} />
                            <Route path="/device" component={DeviceComponent} />
                            <Route path="/history" component={History} />
                            <Route path="/device-detail/:id" component={ViewDevice} />

                            
                            <Route path="/reminder-setting/:device_id" component={ReminderSetting} />
                            <Route path="/supplier/:device_id" component={Supplier} />
                            <Route path="/alerts" component={Alerts} />
                            <Route path="/notification-setting" component={NotificationSetting} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/terms-policy" component={TermsPolicy} />
                            <Route path="/about-us" component={AboutUs} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
