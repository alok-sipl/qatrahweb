import React, {Component} from 'react';
import Header from './../templates/header';
import LedtNavigation from './../templates/left_navigation';
import {connect} from 'react-redux';
import {resetForm} from '../../actions';

class TermsAndPolicy extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Terms and Policy</h1>
                        <div className="row">
                            <div className="columns medium-12">
                                <div className="card-panel static-content">
                                    <h2 className="sub-heading">1. Who may use the Services</h2>
                                    <p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    <h2 className="sub-heading">2. Sed ut perspiciatis unde omnis iste</h2>
                                    <p className="m-b30">When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    <h2 className="sub-heading">3. Ut enim ad minima</h2>
                                    <p className="m-b30">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
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

export default connect(mapStateToProps,{resetForm})(TermsAndPolicy);