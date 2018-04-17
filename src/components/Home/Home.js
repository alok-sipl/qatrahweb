import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spinner} from '../common';
import {getDevices,getSearchDeviceList,getUserDetails} from '../../actions';
import _ from 'lodash';
import firebase from 'firebase';
import Header from '../templates/header'
import LedtNavigation from '../templates/left_navigation';
import CircularProgressbar from 'react-circular-progressbar';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";



const divStyle = {
    height: '220px'
};

class Home extends Component {
    state = {isLoaggedOut:false,menuActive: false,isSearchClicked:false,isLoading:true,searchText:""};
    /*
@Method : componentWillMount
@Params :
@Returns : *
*/
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=>
        {
            if(user)
            {
                if(user.emailVerified)
                {
                    this.props.getDevices();
                    this.props.getUserDetails();
                    this.setState({isLoading:false})


                }
                else{
                    this.setState({isLoaggedOut:true});

                }
            
            }
            else{
                this.setState({isLoaggedOut:true});
            }
        });

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
  @Method : renderLastGridData
  @Params :
  @Returns : *
  */

    renderLastGridData()
    {
        if((this.props.deviceData.length>1) && (this.props.deviceData.length%2==1)) {

            let colorProgress = styles.progressBarBorderColor;
            if (this.props.deviceData[this.props.deviceData.length-1].settings){
                {
                    if(parseFloat(this.props.deviceData[this.props.deviceData.length-1].settings.alert_level_change) > parseFloat(this.props.deviceData[this.props.deviceData.length-1].tank_status.percentage))
                    {
                        colorProgress =styles.progressBarBorderColorDenger;

                    }
                }
            }

            return(
                <div className="row" key ={this.props.deviceData[this.props.deviceData.length-1].device_id}>
                   <Link to={`device-detail/${this.props.deviceData[this.props.deviceData.length-1].device_id}`}>
                    <div className="columns medium-6">
                        <div className="card-panel">
                            <h2 className="p-b25">
                                <div className="row">
                                    <div className="columns medium-10">
                                        {this.props.deviceData[this.props.deviceData.length-1].tank_name}
                                    </div>
                                </div>
                            </h2>
                            <div className="chart-container text-center">
                                <CircularProgressbar percentage={(this.props.deviceData[this.props.deviceData.length-1].tank_status.percentage)}  className="progressbar-red" />
                                <div className="chart-text">{this.props.deviceData[this.props.deviceData.length-1].tank_status.percentage}% Full <br/>at {this.formatAMPM(new Date(this.props.deviceData[this.props.deviceData.length-1].tank_status.time))}</div>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
            );
        }
    }


    /*
@Method : renderListViewData
@Params :
@Returns : *
*/
    renderListViewData() {
        if(this.props.loading || this.state.isLoading)
        {
            return(
                <Spinner size="large"/>
            )
        }
        else
        {
            if(this.props.deviceData.length>0)
            {
                if(this.props.deviceData.length ==1)
                {
                    return(
                        _.map(this.props.deviceData,(val,i)=>{
                            const {device_id,tank_name,tank_status} = val;
                            let colorProgress = styles.progressBarBorderColor;
                            if (val.settings){
                                {
                                    if(parseFloat(val.settings.alert_level_change) > parseFloat(tank_status.percentage))
                                    {
                                        colorProgress =styles.progressBarBorderColorDenger;

                                    }
                                }

                            }

                            return(
                                <div className="row" key ={device_id}>
                                 <Link to={`device-detail/${device_id}`}>
                                    <div className="columns medium-6">
                                        <div className="card-panel">
                                            <h2 className="p-b25">
                                                <div className="row">
                                                    <div className="columns medium-10">
                                                        {tank_name}
                                                    </div>
                                                </div>
                                            </h2>
                                            <div className="chart-container text-center" style={{width:240}}>
                                                <CircularProgressbar percentage={(tank_status.percentage)}  />
                                                <div className="chart-text">{tank_status.percentage}% Full  <br/>at {this.formatAMPM(new Date(tank_status.time))}</div>
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            )
                        })
                    );
                }
                else
                {
                    return(
                        _.map(this.props.deviceData,(val,i)=>{
                            const {device_id,tank_name,tank_status} = val;
                            let colorProgress = styles.progressBarBorderColor;
                            if (val.settings){
                                {
                                    if(parseFloat(val.settings.alert_level_change) > parseFloat(tank_status.percentage))
                                    {
                                        colorProgress =styles.progressBarBorderColorDenger;

                                    }
                                }
                            }
                            let tempId = i+1;
                            if(tempId%2==0)
                            {
                                return(
                                    <div className="row" key= {this.props.deviceData[i-1].device_id}>
                                        <Link to={`device-detail/${this.props.deviceData[i-1].device_id}`}>
                                        <div className="columns medium-6">
                                            <div className="card-panel">
                                                <h2 className="p-b25">
                                                    <div className="row">
                                                        <div className="columns medium-10">
                                                            {this.props.deviceData[i-1].tank_name}
                                                        </div>
                                                    </div>
                                                </h2>
                                                <div className="chart-container text-center">
                                                    <CircularProgressbar percentage={(this.props.deviceData[i-1].tank_status.percentage)} className="progressbar-red" />
                                                    <div className="chart-text">{this.props.deviceData[i-1].tank_status.percentage}% Full<br/>at {this.formatAMPM(new Date(this.props.deviceData[i-1].tank_status.time))}</div>
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                        <Link to={`device-detail/${this.props.deviceData[i].device_id}`}>
                                        <div className="columns medium-6">
                                            <div className="card-panel">
                                                <h2 className="p-b25">
                                                    <div className="row">
                                                        <div className="columns medium-10">
                                                            {this.props.deviceData[i].tank_name}
                                                        </div>
                                                    </div>
                                                </h2>
                                                <div className="chart-container text-center">
                                                    <CircularProgressbar  percentage={(this.props.deviceData[i].tank_status.percentage)}  className="progressbar-red" />
                                                    <div className="chart-text">{this.props.deviceData[i].tank_status.percentage}% Full <br/>at {this.formatAMPM(new Date(this.props.deviceData[i].tank_status.time))}</div>
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                    </div>
                                )
                            }
                        })
                    );

                }


            }

        }
    }

    /*
@Method : renderContent
@Params :
@Returns : *
*/
    renderContent(){
        if(this.state.isLoaggedOut == true){
            return <Redirect to={"login"} />;

        }
        else if(this.props.loading || this.state.isLoading )
        {
            return (
                <div>
                    <Spinner size="large"/>
                </div>
            )
        }
        else if(this.props.deviceData.length == 0)
        {
            return(
                <div className="row">

                    <div className="columns medium-12">
                    <Header/>

                <div style={styles.noRecordMsgStyle}>
                    Your device has not been registered in the app.Please purchase device and registered it or visit our website www.qatrah.com to purchase.
                </div>
                </div>
                </div>
            )
        }
        else{
            return (
                <div className="row">
                    <div className="columns medium-12">
                    <Header/>
                        <h1 className="page-title">Dashboard</h1>


                        {this.renderLastGridData()}
                        {this.renderListViewData()}

                    </div>
                </div>
            );

        }

    }



    /*
@Method : render
@Params :
@Returns : *
*/


    render()
    {
            return (
                <div>
                    {this.renderContent()}
                </div>
            )


    };
}

const styles = {

    containerBackgroundColor: {
        backgroundColor: '#fbfbfe'
    },
    customHeaderStyle:{
        backgroundColor:'transparent',
        elevation: 0,
        shadowOpacity:0,borderBottomWidth:0
    },
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    listItemStyle:{
        borderWidth:8,
        borderColor:'transparent'

    },
    progressBardTextStyle:
        {
            color: '#2eb9f9'
        },
    textStyle: {
        color:'#000'
    },
    progressStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:7,
        paddingBottom:10
    },
    progressLinkIcon:{
        color:"#2eb9f9",
        fontSize:22
    },
    progressBarBorderColor: '#2eb9f9',
    progressBarBorderColorDenger: 'red',
    noRecordStyle:{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: '50%',
        left: '50%',
        backgroundColor: "rgba(242, 242, 242, 0.4)",
        zIndex: 2
    },
      noRecordMsgStyle:{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: '50%',
        left: '20%',
        backgroundColor: "rgba(242, 242, 242, 0.4)",
        zIndex: 2
    }
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
    console.log(deviceData);
    deviceData = deviceData.reverse();
    loading = device.loading;
    return {loading, deviceData,deviceDataTemp};
};

export default connect(mapStateToProps, {getDevices,getSearchDeviceList,getUserDetails})(Home);
