import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class Contact extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Contact Us</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <div className="card-panel">
                            <div className="form-comman">
                                <form>
                                    <div className="form-group">
                                        <label><i className="fa fa-user f-" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Name" name="uname" required/>
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Email ID" name="emailid" required/>
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-comment f-" aria-hidden="true"></i></label>
                                        <textarea cols="3" rows="3" placeholder="Comment/Query"></textarea>
                                    </div>
                                    <div className="form-group text-center">
                                        <input type="submit" className="btn-blue-block btn" value="Submit"
                                               title="Submit"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <LedtNavigation />
            </div>
        )
    }
}


export default Contact;