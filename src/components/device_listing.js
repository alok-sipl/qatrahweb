import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class DeviceListing extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">My Devices</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <ul className="list-items">
                            <li>
                                <h4>Home Tank</h4>
                                <p className="device-id">Device ID: <span>ABXZ9865</span><span className="list-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span></p>
                            </li>
                            <li>
                                <h4>Office Tank</h4>
                                <p className="device-id">Device ID: <span>XGHY6589</span><span className="list-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span></p>
                            </li>
                            <li>
                                <h4>Office Tank 2</h4>
                                <p className="device-id">Device ID: <span>DNKHS4586</span><span className="list-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span></p>
                            </li>
                            <li>
                                <h4>Appartment Tank</h4>
                                <p className="device-id">Device ID: <span>AGTHB1523</span><span className="list-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span></p>
                            </li>
                        </ul>

                    </div>
                </div>
                <LedtNavigation />
            </div>
        )
    }
}


export default DeviceListing;