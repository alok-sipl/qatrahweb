import React, {Component} from 'react';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import {connect} from 'react-redux';
import {OnTitleChanged,addReminderSettings,getUserDetailsForSettings,OnFromDateChanged,OnToDateChanged,OnIntervalInMinutesChanged,OnRepeatChanged,OnRepeatDurationChanged,OnAlertLevelChanged,OnIntervalInMinutesChangedForMinutes,OnIntervalInMinutesChangedForHours} from '../../actions';
import _ from 'lodash';
import {showToast,alerts,minutes,hours} from '../../actions/types';

class RemainderSettings extends Component {
  state = {menuActive: false,isSubmitted:false,interval_in_minutes_for_minutes:"",interval_in_minutes_for_hours:""};

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Reminder Settings</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        <div className="card-panel">
                            <div className="form-comman">
                                <form>
                                    <div className="form-group">
                                        <label><i className="fa fa-bars" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Title" name="" required  />
                                    </div>
                                    <ul className="medium-block-grid-2 small-block-grid-1">
                                        <li className="p-b0"> <div className="form-group">
                                            <label><i className="fa fa-calendar-o" aria-hidden="true"></i></label>
                                            <input type="text" placeholder="From Date" name="" required  />
                                        </div></li>
                                        <li className="p-b0"><div className="form-group">
                                            <label><i className="fa fa-calendar-o" aria-hidden="true"></i></label>
                                            <input type="text" placeholder="To Date" name="" required  />
                                        </div></li>
                                    </ul>
                                    <div className="form-group">
                                        <label><i className="fa fa-clock-o" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Interval in mins" name="" required />
                                    </div>
                                    <div className="repeat"><span className="txt">Repeat</span>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                                <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label><i className="fa fa-retweet" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Repeat Duration" name="" required  />
                                    </div>

                                    <div className="form-group">
                                        <label><i className="fa fa-bell" aria-hidden="true"></i></label>
                                        <input type="text" placeholder="Alert Level" name="" required   />
                                    </div>

                                    <div className="form-group text-center">
                                        <input type="submit" className="btn-blue-block btn" value="save" title="Submit" />
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


export default RemainderSettings;
