import React, {Component} from 'react';
import Header from './templates/header';
import LedtNavigation from './templates/left_navigation';

class NotificationSetting extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Notification Settings</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <div className="card-panel">
                            <div className="repeat"><span className="txt">Send Notification</span>
                                <label className="switch notifi">
                                    <input type="checkbox"/>
                                        <span className="slider round"></span>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                <LedtNavigation />
            </div>
        )
    }
}


export default NotificationSetting;