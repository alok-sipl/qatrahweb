import React, {Component} from 'react';
import {Link, withRouter,} from 'react-router-dom';
import {auth} from "../firebase/firebase";


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;
        auth.signInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push('dashboard');
            })
            .catch(error => {
                this.setState({'error': error});
            });

    }

    render(){

        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div>
                <div className="columns medium-12">
                    <div className="form-wrapper">
                        <div className="card">
                            <div className="card-inner">
                                <div className="form-logo">
                                    <img src="public/images/logo.png" className="logo"/>
                                        <h3>Log In</h3>
                                        <form onSubmit={this.onSubmit}>
                                            {error && <div className="alert alert-danger">{error.message}</div>}
                                            <div className="form-group">
                                                <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                                <input type="text"
                                                       placeholder="Email ID"
                                                       name="email"
                                                       value={email}
                                                       onChange={event => this.setState({'email': event.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label><i className="fa fa-lock f-" aria-hidden="true"></i></label>
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password"
                                                    onChange={event => this.setState({'password': event.target.value})}
                                                />
                                                <i className="fa fa-eye pass-visibility" aria-hidden="true"></i>
                                            </div>
                                            <div className="form-group">
                                                <a href="forgot-password" className="frgt-password" title="Forgot Password?">Forgot Password?</a>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    disabled={isInvalid}
                                                    type="submit"
                                                    className="btn-blue-block"
                                                    value="Log In"
                                                    title="Log In" />
                                            </div>
                                            <div className="form-fooetr">New user? <a href="signup" title="Sign Up">Sign Up</a></div>
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

export default Login;
