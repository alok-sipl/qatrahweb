import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spinner} from "../common";
import {getDevices,resetDeviceDetails,onDeviceIdChanged,getHistory} from '../../actions';
import _ from 'lodash';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import firebase from 'firebase';
import {Bar} from 'react-pathjs-chart';


class History extends Component {
    state = {menuActive: false,isLoading:true,isSubmitted:false,filterDate:new Date(),filterType:"day"};

    componentWillMount()
    {
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

    /*
@Method : componentDidMount
@Params :
@Returns : *
*/
    componentDidMount()
    {
        if(this.props.device_id_temp)
        {
            this.props.getHistory({time_filter:this.state.filterType,device_id:this.props.device_id_temp,type:'history',date:new Date()});
        }
    }

    /*
 @Method : renderChartContent
 @Params :
 @Returns : *
 */
    renderChartContent() {
        let options = {
            width:400,
            margin: {
                top: 20,
                left: 25,
                bottom: 50,
                right: 20
            },
            color: '#2eb9f9',
            gutter: 20,
            animate: {
                type: 'oneByOne',
                duration: 3000,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#2eb9f9'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#2eb9f9'
                }
            }
        }

        if (this.props.loading) {
            return (
                <Spinner size="large"/>
            )
        }
        else {
            if(this.props.history.length > 0)
            {
                return (
                    <div>
                        <Bar  data={this.props.history} options={options} accessorKey='v'/>
                    </div>

                );
            }
            else
            {
                return(

                        <div style={styles.headerStyle}>
                            No records found
                        </div>
                    
                );
            }
        }



    }





    /*
@Method : OnFilterTypeChanged
@Params :
@Returns : *
*/
    OnFilterTypeChanged(type) {
        this.setState({filterType:type});
        if(this.props.device_id != undefined && this.props.device_id)
        {
            this.props.getHistory({time_filter:type,device_id:this.props.device_id,type:'history',date:new Date()});
        }
        else
        {
            this.props.getHistory({time_filter:type,device_id:this.props.device_id_temp,type:'history',date:new Date()});
        }

    }

    /*
@Method : onDeviceIdChanged
@Params :
@Returns : *
*/
    onDeviceIdChanged(deviceId) {
        this.props.onDeviceIdChanged(deviceId);
        this.props.getHistory({time_filter:this.state.filterType,device_id:deviceId,type:'history',date:new Date()});
    }
    /*
@Method : onSideMenuChange
@Params :
@Returns : *
*/
    onSideMenuChange() {
        this.setState({menuActive: true});
    }

    /*
   @Method : renderPickerItemsAndValues
   @Params :
   @Returns : *
   */
    renderPickerItemsAndValues()
    {
        return(
            _.map(this.props.deviceData,(val,i)=>{
                const {device_id,tank_name,tank_status} = val;
                return(
                    <option key={i} value={device_id} label={tank_name}/>
                )
            })
        );

    }

    /*
@Method : renderBackButton
@Params :
@Returns : *
*/
    renderBackButton(){
        if (Platform.OS === 'ios') {
            return (
                <Icon  style={{color:"#fff"}} name='ios-arrow-back'/>
            )
        }

    }

    /*
    @Method : renderPickerItems
    @Params :
    @Returns : *
    */
    renderPickerItems()
    {
        if(this.props.device_id)
        {
            return(
                <ul className="medium-block-grid-2 small-block-grid-1">
                <li>
                    <div className="form-group">
                        <select  selected={this.props.device_id}
                                
                                onChange={(event) => {
                                     if(event.target.value){
                                        this.onDeviceIdChanged(event.target.value)        
                                     }
                                }}
                                value={this.props.device_id} >
                            {this.renderPickerItemsAndValues()}
                        </select>
                    </div>
                </li>
                <li>
                    <div className="form-group">
                       {this.renderPickerItemsWithHistoryType()}
                    </div>
                </li>
            </ul>
            );
        }
        else
        {
            return(
                <ul className="medium-block-grid-2 small-block-grid-1">
              <li>
                    <div className="form-group">
                        <select  selected={this.props.device_id}
                                
                                onChange={(event) => {
                                    if(event.target.value){
                                       this.onDeviceIdChanged(event.target.value)        
                                    }
                               }}
                                value={this.props.device_id} >
                            {this.renderPickerItemsAndValues()}
                        </select>
                    </div>
                </li>
                <li>
                    <div className="form-group">
                       {this.renderPickerItemsWithHistoryType()}
                    </div>
                </li>
            </ul>
            );
        }
    }


    /*
@Method : renderDropDownIcon
@Params :
@Returns : *
*/
    renderDropDownIcon() {
        if (Platform.OS === 'ios') {
            return (
                <Icon  style={{color:"#b3c7f9",position:"absolute",top:10,right:1,zIndex:-1}} name='md-arrow-dropdown'/>

            )
        }
    }


        /*
        @Method : renderPickerItemsWithHistoryType
        @Params :
        @Returns : *
        */
        renderPickerItemsWithHistoryType()
        {
            return(
                    <select  selected={this.state.filterType}
                            onChange={(event)=>{
                                this.OnFilterTypeChanged(event.target.value)
                            }} value={this.state.filterType}
                            mode="dropdown">
                        <option  value="day" label="Daily"/>
                        <option  value="week" label="Weekly"/>
                        <option  value="month" label="Monthly"/>
                    </select>
            );
        }



    /*
     @Method : renderContent
     @Params :
     @Returns : *
     */
    renderContent() {
       return (
        <div className="form-comman">
              {this.renderPickerItems()}
        <form>
        
            <div className="device-graph-img">
            <div style={{color:'black',fontSize:20}}>Water Reading Level</div>
                  <div>Consumption(%)</div>
            {this.renderChartContent()}
            </div>
          
        </form>
        </div>
        );
    }


    /*
@Method : renderContentData
@Params :
@Returns : *
*/
    renderContentData()
    {
        if(this.props.loading || this.state.isLoading)
        {
            return(
                <Spinner size="large"/>
            )
        }
        else if (this.props.deviceData.length > 0)
        {
            return(
                <div className="row">
                <div className="columns medium-12">
                    <div className="card-panel">
                      {this.renderContent()}
                    </div>
                </div>
            </div>
            )
        }
        else
        {
            return(
                <div style={styles.noRecordStyle}>
                    No Records Found
                </div>
            )
        }
    }
    /*
@Method : render
@Params :
@Returns : *
*/
render() {
    return (
        <div>
            <div className="row">
                <div className="columns medium-12">
                <Header />

                    <h1 className="page-title">Device Details</h1>
                </div>
            </div>
            {this.renderContentData()}
            <LedtNavigation />
        </div>
    )
}
}


const styles = {
    containerBackgroundColor:{
        backgroundColor: '#fbfbfe'
    },
    headerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15
    },
    forgotPasswordButtonCardItemStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        fontWeight:'bold'
    },
    pickerStyle:{
        borderWidth:1,
        backgroundColor:'#fff',
        borderRadius:100,
        justifyContent:'flex-start',
        borderColor:'#ddd',
        overflow:'hidden'
    },
    noRecordStyle:{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: '50%',
        left: '50%',
        backgroundColor: "rgba(242, 242, 242, 0.4)",
        zIndex: 2
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}
const mapStateToProps = ({device}) => {
    const {device_id,loading,history} = device;
    let device_name = device.device_name;
    let tank_name = device.tank_name;

    if(device_name){
        device_name =  device_name.trim();
    }

    if(tank_name){
        tank_name =  tank_name.trim();
    }

    let deviceData =[];
    let device_id_temp = "";
    if(device.deviceData)
    {
        deviceData =[];
        _.map(device.deviceData,(val,uid)=>{
            if(val.tank_name){
                val.tank_name = val.tank_name.trim()
            }
            if(val.device_name){
                val.device_name = val.device_name.trim()
            }
            deviceData.push(val)
        });
        if(deviceData.length > 0){
         device_id_temp = deviceData[0].device_id;
        }
    }
    deviceData = deviceData.reverse();
    return {device_id,device_id_temp,deviceData, device_name,tank_name,loading,history};

};

export default connect(mapStateToProps, {getDevices,getHistory,resetDeviceDetails,onDeviceIdChanged})(History);
