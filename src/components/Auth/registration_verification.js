import React, {Component} from 'react';
import firebase from 'firebase';
import {
    showToast
} from '../../actions/types';

class RegistrationVerification extends Component {
    state = {isLoaded: null, email: ""};

    componentWillMount() {
        this.setEmail();
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
 @Method : onButtonPressBack
 @Params :
 @Returns : *
 */
    onButtonPressBack() {
        firebase.auth().signOut().then(() => {

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
                    Actions.Auth({type: 'reset'});
                }, (error) => {
                    showToast("danger", "Sorry some error occurred, please try again later!");
                });
            })
            .catch(() => {
                showToast("danger", "Sorry some error occurred, please try again later!");
            })
    }


    render() {
        return (

            <div>
                <div className="columns medium-12">
                    <div className="form-wrapper">
                        <div className="card">
                            <div className="card-inner">
                                <div className="form-logo">
                                    <img src="public/images/logo.png" className="logo"/>
                                    <h3>Hi {this.state.email} </h3>
                                    <h4 className="sub-heading"> Your email is not verified,To resend the verification
                                        email, Click Resend next to the email address that you want to verify, and we
                                        will send an email to that address
                                    </h4>
                                    <h6> لم يتم التحقق من بريدك الإلكتروني ، لإعادة إرسال رسالة التحقق ، انقر فوق إعادة
                                        إرسال بجوار عنوان البريد الإلكتروني الذي تريد التحقق منه ، وسنرسل رسالة بريد
                                        إلكتروني إلى هذا العنوان
                                    </h6>
                                    <div className="congo m-tb30"><img src="public/images/congratulations.png"/></div>
                                    <div className="form-group">
                                        <a href="index" className="btn-blue-block">Resend Verification Link</a>
                                    </div>
                                    <div className="form-group">
                                        <a href="index" className="btn-blue-block">Cancel</a>
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


export default RegistrationVerification;
