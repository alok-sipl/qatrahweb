import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

const divStyle = {
    height: '220px'
};

class Dashboard extends Component {


    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Dashboard</h1>
                        <div className="row eq-parent">
                            <div className="columns medium-6">
                                <div className="card-panel">
                                    <h2 className="p-b25">
                                        <div className="row">
                                            <div className="columns medium-10">
                                                Home Tank
                                            </div>
                                        </div>
                                    </h2>
                                    <div className="grey-bg payment-panel eq-child">
                                        <div className="chart-container text-center">
                                            <img src="public/images/home-tank-graph.png" alt="" width="240" />
                                            <div className="chart-text">60% Full <br/>at 02:00 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="columns medium-6">
                                <div className="card-panel">
                                    <h2 className="p-b25">
                                        <div className="row">
                                            <div className="columns medium-10">
                                                Office Tank
                                            </div>
                                        </div>
                                    </h2>
                                    <div className="grey-bg payment-panel eq-child">
                                        <div className="chart-container text-center" style={divStyle}>
                                            <img src="public/images/office-tank-graph.png" alt="" width="240" />
                                            <div className="chart-text">80% Full <br/>at 12:15 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="columns medium-6">
                                <div className="card-panel">
                                    <h2 className="p-b25">
                                        <div className="row">
                                            <div className="columns medium-10">
                                                Office Tank 2
                                            </div>
                                        </div>
                                    </h2>
                                    <div className="chart-container text-center">
                                        <img src="public/images/office-tank2-graph.png" alt="" width="240" />
                                        <div className="chart-text">25% Full <br/>at 01:00 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="columns medium-6">
                                <div className="card-panel">
                                    <h2 className="p-b25">
                                        <div className="row">
                                            <div className="columns medium-10">
                                                Apartment Tank
                                            </div>
                                        </div>
                                    </h2>
                                    <div className="chart-container text-center">
                                        <img src="public/images/apartment-tank-graph.png" alt="" width="240" />
                                        <div className="chart-text">80% Full <br/>at 12:15 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="columns medium-6">
                                <div className="card-panel">
                                    <h2 className="p-b25">
                                        <div className="row">
                                            <div className="columns medium-10">
                                                Home Tank 2
                                            </div>
                                        </div>
                                    </h2>
                                    <div className="chart-container text-center">
                                        <img src="public/images/home-tank2-graph.png" alt="" width="240" />
                                        <div className="chart-text">60% Full <br/>at 02:00 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="columns medium-6">
                                <div className="card-panel">
                                    <h2 className="p-b25">
                                        <div className="row">
                                            <div className="columns medium-10">
                                                Apartment Tank 2
                                            </div>
                                        </div>
                                    </h2>
                                    <div className="chart-container text-center">
                                        <img src="public/images/apartment-tank2-graph.png" alt="" width="240" />
                                        <div className="chart-text">80% Full <br/>at 12:15 PM</div>
                                    </div>
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


export default Dashboard;