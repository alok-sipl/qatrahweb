import React, {Component} from 'react';

class ForgotPassword extends Component{

    render(){
        return (
                <div className="columns medium-12">
                    <div className="form-wrapper">
                        <div className="card">
                            <div className="card-inner">
                                <div className="form-logo">
                                    <img src="public/images/logo.png" className="logo"/>
                                        <h3>Forgot Password?</h3>
                                        <h5 className="sub-heading">Enter your email address to recover<br/> your password</h5>
                                        <form>
                                            <div className="form-group">
                                                <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                                <input type="text" placeholder="Email ID" name="emailid" required />
                                            </div>

                                            <div className="form-group">
                                                <input type="submit" className="btn-blue-block" value="Send" title="Send" />
                                            </div>
                                            <div className="form-fooetr">Back to <a href="login">Log In</a></div>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default ForgotPassword;