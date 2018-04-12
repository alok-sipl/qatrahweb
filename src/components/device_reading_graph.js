import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class History extends Component {

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
                                    <ul className="medium-block-grid-2 small-block-grid-1">
                                        <li>
                                            <div className="form-group">
                                                <select>
                                                    <option>Home Tank</option>
                                                    <option>Cylindrical Tank </option>
                                                </select>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-group">
                                                <label><i className="fa fa-calendar-o" aria-hidden="true"></i></label>
                                                <input type="text" placeholder="Tank Location" name="" required value="Dec/14" />
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="device-graph-img"><img src="public/images/device-graph.png"/></div>
                                    <div className="form-group text-center">
                                        <input type="submit" className="btn-blue-block btn" value="Search the suppliers" title="Submit" />
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


export default DeviceReadingGraph;