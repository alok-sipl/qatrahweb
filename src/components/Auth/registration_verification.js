import React, {Component} from 'react';
import firebase from 'firebase';
import {Spinner} from '../common'
import {BrowserRouter as Router, Route, Link, Prompt, Redirect} from "react-router-dom";
import _ from 'lodash';
import Login from '../../components/Auth/login';


import {
    showToast
} from '../../actions/types';

class RegistrationVerification extends Component {
    state = {isLoaded: null, email: "", isRedirectLogin: false};

    componentWillMount() {
        this.setEmail();
        // const messaging = firebase.messaging();
        //
        //
        // messaging.requestPermission().then(function() {
        //     messaging.getToken().then(function(currentToken) {
        //         if (currentToken) {
        //            alert(currentToken);
        //         } else {
        //             // Show permission request.
        //             console.log('No Instance ID token available. Request permission to generate one.');
        //         }
        //     }).catch(function(err) {
        //         console.log('An error occurred while retrieving token. ', err);
        //     });
        //     // ...
        // }).catch(function(err) {
        //    alert('Unable to get permission to notify.', err);
        // });
    }

    setEmail() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({isLoaded: true})
            if (user) {
                this.setState({email: user.email});
            }
        });
    }

    /*
  @Method : renderAction
  @Params :
  @Returns : *
  */
    renderActionBack() {

        return (
            <input
                type="button"
                onClick={() => {
                    this.onButtonPressBack();
                }}
                className="btn-blue-block"
                value="Cancel"
                title="Cancel"/>

        );

    }


    /*
    @Method : renderAction
    @Params :
    @Returns : *
    */
    renderAction() {
        return (
            <input
                type="button"
                onClick={() => {
                    this.onButtonPress();
                }}
                className="btn-blue-block"
                value="Resend Verification Link"
                title="Resend Verification Link"/>
        );
    }


    /*
 @Method : onButtonPressBack
 @Params :
 @Returns : *
 */
    onButtonPressBack() {
        firebase.auth().signOut().then(() => {
            this.setState({isRedirectLogin: true})
        }, (error) => {
            showToast("danger", "Sorry some error occurred, please try again later!");
        });

    }


    /*
 @Method : onButtonPress
 @Params :
 @Returns : *
 */
    onButtonPress() {
        firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
                firebase.auth().signOut().then(() => {
                    showToast('success', 'We have received your request and an email containing verification link has been send to your registered email.');
                    this.setState({isRedirectLogin: true})
                }, (error) => {
                    showToast("danger", "Sorry some error occurred, please try again later!");
                });
            })
            .catch(() => {
                showToast("danger", "Sorry some error occurred, please try again later!");
            })

    }


    render() {
        if (this.state.isRedirectLogin == true) {
            return <Login />;
        }
        else {
            return (

                <div>
                    <div className="columns medium-12">
                        <div className="form-wrapper">
                            <div className="card">
                                <div className="card-inner">
                                    <div className="form-logo">
                                        <img src="public/images/logo.png" className="logo"/>
                                        <h3>Hi {this.state.email} </h3>
                                        <h4 className="sub-heading"> Your email is not verified,To resend the
                                            verification email, Click Resend next to the email address that you want to
                                            verify, and we will send an email to that address
                                        </h4>
                                        <h6> لم يتم التحقق من بريدك الإلكتروني ، لإعادة إرسال رسالة التحقق ، انقر فوق
                                            إعادة إرسال بجوار عنوان البريد الإلكتروني الذي تريد التحقق منه ، وسنرسل
                                            رسالة بريد إلكتروني إلى هذا العنوان
                                        </h6>
                                        <div className="congo m-tb30"><img src="public/images/congratulations.png"/>
                                        </div>
                                        <div className="form-group">
                                            {this.renderAction()}
                                        </div>
                                        <div className="form-group">
                                            {this.renderActionBack()}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

}


export default RegistrationVerification;
