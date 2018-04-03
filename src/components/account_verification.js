import React, {Component} from 'react';

class AccountVerification extends Component{

    render(){
        return (
            <div>
                <div className="columns medium-12">
                    <div className="form-wrapper">
                        <div className="card">
                            <div className="card-inner">
                                <div className="form-logo">
                                    <img src="public/images/logo.png" className="logo"/>
                                        <h3>Verify Account</h3>
                                        <h5 className="sub-heading">Please enter the OTP we have sent to your<br/>
                                            registered mobile number.</h5>
                                        <form>
                                            <ul className="verify-otp">
                                                <li className="otp"><input type="text" placeholder="8"/></li>
                                                <li className="otp"><input type="text" placeholder="6"/></li>
                                                <li className="otp"><input type="text" placeholder="&nbsp;"/></li>
                                                <li className="otp"><input type="text" placeholder="&nbsp;"/></li>
                                            </ul>

                                            <div className="form-group">
                                                <input type="submit" className="btn-blue-block" value="SUBMIT" title="SUBMIT" />
                                            </div>

                                            <h5 className="sub-heading">I didn’t receive the code<br/>
                                                <a href="#" className="resend"> Please Resend </a></h5>
                                            <div className="form-fooetr">Back to <a href="signup" title="Sign Up">Sign Up</a></div>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountVerification;