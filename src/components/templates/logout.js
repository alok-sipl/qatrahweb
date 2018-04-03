import React, {Component} from 'react';


class Logout extends Component {
    constructor(props) {
        super(props)
    }

    doSignOut = () => {
        alert('Hey');

    }

    render() {
        return (
            <a href="/login" onClick={this.doSignOut}><i className="fa fa-sign-out"></i>Logout1</a>
        )
    }
}

export default Logout;