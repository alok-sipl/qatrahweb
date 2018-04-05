import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Prompt, Redirect} from "react-router-dom";

import RegistrationVerification from '../../components/Auth/registration_verification';

class RegistrationSuccess extends Component{

    state = {isVerificationActive:false};

    render(){

        if(this.state.isVerificationActive == true){
            return (
                <RegistrationVerification />
            );
        }
        else
        {
            return (
                <div>
                    <div className="columns medium-12">
                        <div className="form-wrapper">
                            <div className="card">
                                <div className="card-inner">
                                    <div className="form-logo">
                                        <img src="public/images/logo.png" className="logo"/>
                                        <h3>Congratulations!</h3>
                                        <h5 className="sub-heading">You have been registered successfully!</h5>
                                        <div className="congo m-tb30"><img src="public/images/congratulations.png"/></div>
                                        <div className="form-group">
                                            <a onClick={()=>{
                                                this.setState({isVerificationActive:true})
                                            }} className="btn-blue-block"> Go to Home</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default RegistrationSuccess;