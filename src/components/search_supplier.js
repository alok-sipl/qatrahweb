import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class SearchSupplier extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Search Suppliers <a href="#" className="fr"><i className="fa fa-search p-l10 gray" aria-hidden="true"></i></a> <a href="#" className="fr filter"><i className="fa fa-filter gray" aria-hidden="true" className="m-r15"></i></a></h1>
                        <div className="filter-box">
                            <img src="public/images/pop-up.png"/>
                        </div>
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
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.9347225924394!2d-104.61148568466835!3d38.25781997967432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713a31fa0b6bf4b%3A0x82d3881a6684aa9e!2sClark+Spring+Water+Co!5e0!3m2!1sen!2sin!4v1521636106302"  frameborder="0" width="100%" height="400" style="border:0" allowfullscreen></iframe>
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


export default SearchSupplier;