import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class EditDevice extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Edit Details </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <div className="card-panel">
                            <div className="form-comman">
                                <form>
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
                                    <div className="form-group">
                                        <ul className="medium-block-grid-2 small-block-grid-2">
                                            <li><input type="text" placeholder="1.5 mtr" value="1.5 mtr" name="" required className="text-center" /></li>
                                            <li><input type="text" placeholder="1 mtr" name="" value="1 mtr" required className="text-center"/></li>
                                        </ul>

                                    </div>
                                    <p className="text-center p-18x">Tank Capacity: (Computed by system in ltr)</p>
                                    <div className="form-group text-center">
                                        <input type="submit" className="btn-blue-block btn" value="Save" title="Submit" />
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


export default EditDevice;