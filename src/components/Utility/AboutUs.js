import React, {Component} from 'react';
import Header from './../templates/header';
import LedtNavigation from './../templates/left_navigation';
import {connect} from "react-redux";
import {resetForm} from "../../actions";

class AboutUs extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Qatrah App</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <div className="card-panel">
                            <div className="form-comman">

                                <h5 className="text-center m-tb30">Version 1.0</h5>
                                <p className="text-center copyright"> &copy; 2018, All right reserved.</p>
                                <div className="form-group text-center">
                                    <input type="submit" className="btn-blue-block btn" value="Contact us" title="Submit" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <LedtNavigation />
            </div>
        )
    }
}


const mapStateToProps = ({utility}) => {
    const {loading} = utility;
    return {loading};
};

export default connect(mapStateToProps,{resetForm})(AboutUs);