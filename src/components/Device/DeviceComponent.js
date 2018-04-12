import React, {Component} from 'react';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import {connect} from 'react-redux';
import {getDevices,getSearchDeviceList} from '../../actions';
import _ from 'lodash';
import firebase from 'firebase';
import {Spinner} from '../common';


class DeviceComponent extends Component {
  state = {menuActive: false,isSearchClicked:false,searchText:"",isLoading:true};
  componentWillMount() {
      firebase.auth().onAuthStateChanged((user)=>
      {
          this.setState({isLoading:false})
          if(user)
          {
              if(user.emailVerified)
              {
                  this.props.getDevices();
              }
          }
      });

  }

listViewData(){
  if(this.props.loading || this.state.isLoading)
  {
      return(
          <Spinner size="large"/>
      )
  }
  else if(this.props.deviceData.length == 0)
  {
      return(
          <div style={styles.noRecordStyle}>
              No Records Found
          </div>
      )
  }
  else
  {

    if(this.props.deviceData != undefined) {
    const totalDevice   = this.props.deviceData.length;

    return (
      <div>
        {this.DeviceDetailsInnerView()}
      </div>
    );
  }

}
}

DeviceDetailsInnerView() {

    if(this.props.deviceData != undefined) {
      return _.map(this.props.deviceData, (val,i)=> {
        const {
          device_id,tank_name,tank_status
        } = val;
        console.log(val);

  return (
          <div className="row" key={i}>
              <div className="columns medium-12">
                  <ul className="list-items">
                      <li>
                          <h4>{tank_name}</h4>
                          <p className="device-id">Device ID: <span>{device_id}</span><span className="list-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span></p>
                      </li>

                  </ul>

              </div>
          </div>
          );
        });
      }
    }
  render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">My Devices</h1>
                    </div>
                </div>
                <div className="row">
                  {this.listViewData()}
                </div>
                <LedtNavigation />
            </div>
        )

}
}


const mapStateToProps = ({device}) => {
    let deviceData =[];
    let deviceDataTemp=[];
    let loading = true;
    if(device.deviceData)
    {
        deviceData =[];
        _.map(device.deviceData,(val,uid)=>{
            if(val.tank_name){
                val.tank_name = val.tank_name.trim()
            }
            deviceData.push(val)
        });
    }
    if(device.deviceDataTemp)
    {
        deviceDataTemp =[];
        _.map(device.deviceDataTemp,(val,uid)=>{
            if(val.tank_name){
                val.tank_name = val.tank_name.trim()
            }
            deviceDataTemp.push(val)
        });
    }
    console.log(deviceData);
    deviceData = deviceData.reverse();
    loading = device.loading;
    return {loading, deviceData,deviceDataTemp};
};

export default connect(mapStateToProps, {getDevices,getSearchDeviceList})(DeviceComponent);
const styles ={
    noRecordStyle:{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: '50%',
        left: '50%',
        backgroundColor: "rgba(242, 242, 242, 0.4)",
        zIndex: 2
    }
};
