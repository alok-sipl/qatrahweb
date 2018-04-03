import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class DeviceDetail extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Device Details</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <div className="card-panel">
                            <div className="form-comman">
                                <form>
                                    <div className="form-group">
                                        <label><i className="fa fa-tablet" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Device ID" name="" required  value="ABXZ9865" />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-file-text" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Device Name" name="" required value="Home Tank" />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-map-marker" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Tank Location" name="" required value="1415 Cross Beam Dr, Charlotte" />
                                    </div>

                                    <div className="form-group">
                                        <label><i className="fa fa-database" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Tank Location" name="" required  value="Cylindrical Tank" />
                                    </div>
                                    <p className="text-center p-18x m-t20">Tank Capacity: (Computed by system in ltr)</p>
                                    <div className="form-group text-center">
                                        <input type="submit" className="btn-blue-block btn" value="Edit" title="Submit" />
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


export default DeviceDetail;