import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class AddDevice extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Add Device</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <div className="card-panel">
                            <div className="form-comman">
                                <form>
                                    <div className="form-group">
                                        <label><i className="fa fa-tablet" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Device ID" name="" required />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-file-text" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Device Name" name="" required />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-map-marker" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Tank Location" name="" required />
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-window-maximize" aria-hidden="true"></i></label>
                                        <select>
                                            <option>Rectangular Tank</option>
                                            <option>Rectangular Tank 1</option>
                                            <option>Rectangular Tank 2</option>
                                            <option>Rectangular Tank 3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <ul className="medium-block-grid-3 small-block-grid-1">
                                            <li><input type="text" placeholder="Height (mtr)" name="" required className="text-center" /></li>
                                            <li><input type="text" placeholder="Width (mtr)" name="" required className="text-center"/></li>
                                            <li><input type="text" placeholder="Length (mtr)" name="" required className="text-center"/></li>
                                        </ul>

                                    </div>
                                    <p className="text-center p-18x">Tank Capacity: (Computed by system in ltr)</p>
                                    <div className="form-group text-center">
                                        <input type="submit" className="btn-blue-block btn" value="SAVE" title="Submit" />
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


export default AddDevice;