import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class SupplierListing extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Search Suppliers</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">

                        <div className="card-panel">
                            <div className="tab">
                                <button className="tablinks" onclick="openCity(event, 'map')">Map View</button>
                                <button className="tablinks" onclick="openCity(event, 'list')">List View</button>
                            </div>

                            <div id="map" className="tabcontent text-center" style="display: block;">
                                <img src="public/images/maps.png"/>
                            </div>

                            <div id="list" className="tabcontent">
                                <ul className="list-items">
                                    <li>
                                        <h4>Ace water</h4>
                                        <p className="information m-t20"><span className="details"><i className="fa fa-map-marker" aria-hidden="true"></i></span>Rancho Cucamonga, CA, United States <span className="favourite"><i className="fa fa-heart" aria-hidden="true"></i></span></p>
                                        <p className="information"><span className="details"><i className="fa fa-envelope" aria-hidden="true"></i></span>ranchocucamonga@gmail.com </p>
                                        <p className="information"><span className="details"><i className="fa fa-phone" aria-hidden="true"></i></span>+1 909-989-1978 </p>

                                    </li>
                                    <li>
                                        <h4>Ace water</h4>
                                        <p className="information m-t20"><span className="details"><i className="fa fa-map-marker" aria-hidden="true"></i></span>Rancho Cucamonga, CA, United States <span className="favourite"><i className="fa fa-heart" aria-hidden="true"></i></span></p>
                                        <p className="information"><span className="details"><i className="fa fa-envelope" aria-hidden="true"></i></span>ranchocucamonga@gmail.com </p>
                                        <p className="information"><span className="details"><i className="fa fa-phone" aria-hidden="true"></i></span>+1 909-989-1978 </p>

                                    </li>
                                    <li>
                                        <h4>Voss USA</h4>
                                        <p className="information m-t20"><span className="details"><i className="fa fa-map-marker" aria-hidden="true"></i></span>236 W 30th St #12, New York, NY 10001, USA <span className="favourite"><i className="fa fa-heart-o" aria-hidden="true"></i></span></p>
                                        <p className="information"><span className="details"><i className="fa fa-envelope" aria-hidden="true"></i></span>info@vosswater.com </p>
                                        <p className="information"><span className="details"><i className="fa fa-phone" aria-hidden="true"></i></span>+1 212-995-2425 </p>

                                    </li>
                                    <li>
                                        <h4>Voss USA</h4>
                                        <p className="information m-t20"><span className="details"><i className="fa fa-map-marker" aria-hidden="true"></i></span>236 W 30th St #12, New York, NY 10001, USA <span className="favourite"><i className="fa fa-heart-o" aria-hidden="true"></i></span></p>
                                        <p className="information"><span className="details"><i className="fa fa-envelope" aria-hidden="true"></i></span>info@vosswater.com </p>
                                        <p className="information"><span className="details"><i className="fa fa-phone" aria-hidden="true"></i></span>+1 212-995-2425 </p>

                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <LedtNavigation />
            </div>
        )
    }
}


export default SupplierListing;