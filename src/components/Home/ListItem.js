import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spinner} from '../common';
import {getDevices,getSearchDeviceList,getUserDetails} from '../../actions';
import _ from 'lodash';
import firebase from 'firebase';
import Header from '../templates/header'
import LedtNavigation from '../templates/left_navigation';

const divStyle = {
    height: '220px'
};

class Home extends Component {
    state = {menuActive: false,isSearchClicked:false,isLoading:true,searchText:""};
    /*
@Method : componentWillMount
@Params :
@Returns : *
*/
    componentWillMount() {
        this.setState({isLoading:false})
        this.props.getDevices();
        this.props.getUserDetails();
    }



    /*
@Method : filter
@Params :
@Returns : *
*/
    filter(text)
    {
        let filteredDevices = this.props.deviceDataTemp.filter(devices => {
            if(!(devices.tank_name == undefined))
            {
                return ((devices.tank_name.indexOf(text) > -1)||((devices.tank_name.toLowerCase().indexOf(text) > -1))||((devices.tank_name.toUpperCase().indexOf(text) > -1))) ;
            }
            else
            {
                return {};
            }
        });
        this.props.getSearchDeviceList({"search":filteredDevices});


    }

    /*
@Method : removeInvalidChars
@Params :
@Returns : *
*/
    removeInvalidChars(text) {
        let newText = '';
        let numbers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';

        for (var i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }

        return newText;
    }


    /*
@Method : onChangeSearch
@Params :
@Returns : *
*/
    onChangeSearch(text)
    {
        if(text)
        {
            this.setState({searchText:this.removeInvalidChars(text)});
            this.filter(this.removeInvalidChars(text));

        }
        else
        {
            this.setState({searchText:""});
            this.props.getDevices();
        }
    }



    /*
@Method : onRowPress
@Params :
@Returns : *
*/
    onRowPress(data) {
        if(data.device_id)
        {
            // Actions.ViewDevice({deviceId:data.device_id});
        }
    }

    /*
@Method : convertDate
@Params :
@Returns : *
*/
    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }

    /*
@Method : formatAMPM
@Params :
@Returns : *
*/
    formatAMPM(date) {
        let deviceDate = this.convertDate((new Date(date)));
        let Today = this.convertDate((new Date()))
        if(deviceDate == Today)
        {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            let strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
        else
        {
            return deviceDate;
        }

    }

    /*
@Method : convertNumberToDetcimal
@Params :
@Returns : *
*/
    convertNumberToDetcimal(number)
    {
        if(parseFloat(number))
        {
            let numberTemp = parseFloat(number)/100;
            return numberTemp;
        }
        else
        {
            let numberTemp = 0;
            return numberTemp;
        }

    }



    /*
@Method : render
@Params :
@Returns : *
*/


    render() {
        if(this.props.loading)
        {
            return (
                <Spinner size="large"/>
            )
        }
        else
        {
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
    };
}


const mapStateToProps = ({device}) => {
    let deviceData =[];
    let deviceDataTemp= [];
    let loading = true;
    if(device.deviceData)
    {
        deviceData =[];
        _.map(device.deviceData,(val,uid)=>{
            deviceData.push(val)
        });
    }
    if(device.deviceDataTemp)
    {
        deviceDataTemp =[];
        _.map(device.deviceDataTemp,(val,uid)=>{
            deviceDataTemp.push(val)
        });
    }
    deviceData = deviceData.reverse();
    loading = device.loading;
    return {loading, deviceData,deviceDataTemp};
};

export default connect(mapStateToProps, {getDevices,getSearchDeviceList,getUserDetails})(Home);
