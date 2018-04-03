import React, {Component} from 'react';
import {Link, withRouter,} from 'react-router-dom';

const INITIAL_STATE = {
    email: '',
    password: '',
    mobile: '',
    error: null,
};

class Signup extends Component {

    constructor(props) {
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
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push('login');
            })
            .catch(error => {
                this.setState({'error': error});
            });

    }

    render() {
        const {
            email,
            password,
            mobile,
            error,
        } = this.state;


        const isInvalid =
            password === '' ||
            email === '' ||
            mobile === '';


        return (
            <div>
                <div className="columns medium-12">
                    <div className="form-wrapper">
                        <div className="card">
                            <div className="card-inner">
                                <div className="form-logo">
                                    <img src="public/images/logo.png" className="logo"/>
                                    <h3>Sign Up</h3>
                                    <form onSubmit={this.onSubmit}>
                                        {error && <div className="alert alert-danger">{error.message}</div>}
                                        <div className="form-group">
                                            <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                            <input
                                                type="text"
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
                                                value={password}
                                                onChange={event => this.setState({'password': event.target.value})}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label><i className="fa fa-phone" aria-hidden="true"></i></label>
                                            <input
                                                type="text"
                                                placeholder="Mobile Number"
                                                name="mobile"
                                                value={mobile}
                                                onChange={event => this.setState({'mobile': event.target.value})}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                disabled={isInvalid}
                                                type="submit"
                                                className="btn-blue-block"
                                                value="Sign Up"
                                                title="Sign Up"
                                            />
                                        </div>
                                        <div className="form-fooetr">Already have an account? <a href="login">Login</a>
                                        </div>
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

export default Signup;