import React, {Component} from 'react';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';

class Profile extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">My Profile</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <div className="card-panel">
                            <div className="my-profile">
                                <img src="public/images/user-profile.png"/>
                                    <div className="upload-pic"><a href="#"><img src="public/images/camera.png"/></a></div>
                                    <p>Abbie Brown &nbsp;&nbsp;<a href="#"><i className="fa fa-pencil" aria-hidden="true"></i></a></p>
                            </div>
                            <ul className="list-items m-t20 profile-details">
                                <li>
                                    <h4><span><i className="fa fa-envelope" aria-hidden="true"></i></span> Email ID</h4>
                                    <p className="device-id"> abbie_brown@gmail.com </p>
                                </li>
                                <li>
                                    <h4><span><i className="fa fa-phone" aria-hidden="true"></i></span>Mobile Number</h4>
                                    <p className="device-id">+1 704-359-4013 </p>
                                </li>
                                <li>
                                    <h4><span><i className="fa fa-envelope" aria-hidden="true"></i></span> Address<span><i className="fa fa-pencil" aria-hidden="true"></i></span></h4>
                                    <p className="device-id"> 5501 Josh Birmingham Pkwy, Charlotte, North Carolina 28208, USA </p>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <LedtNavigation />
            </div>
        )
    }
}


export default Profile;