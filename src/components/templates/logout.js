import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Prompt,Redirect } from "react-router-dom";


class Logout extends Component {
    constructor(props) {
        super(props)
    }

    doSignOut = () => {
        alert('Hey');

    }

    render() {
        return (
          <Link to="/login" onClick={this.doSignOut}><i className="fa fa-sign-out" ></i>Logout</Link>

        )
    }
}

export default Logout;
