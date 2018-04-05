import React, {Component} from 'react';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import {connect} from 'react-redux';
import {addNotificationSettings,getUserDetailsForNotificationSettings,OnSendNotificationChanged} from '../../actions';
import _ from 'lodash';
import firebase from 'firebase';
class NotificationSetting extends Component {
  state = {menuActive: false,isSubmitted:false};


  componentWillMount() {
    firebase.auth().onAuthStateChanged((user)=>
    {
      this.setState({isLoading:false})
      if(user)
      {
        if(user.emailVerified)
        {
          this.props.getUserDetailsForNotificationSettings();
        }
      }
    });

  }


  /*
  @Method : onButtonPress
  @Params :
  @Returns : *
  */
  onButtonPress(text) {
    this.setState({isSubmitted: true})
    const {userId} = this.props;
    if (userId) {
      this.props.addNotificationSettings({is_user_notification:text,userId});
    }
  }

  /*
  @Method : OnSendNotificationChanged
  @Params :
  @Returns : *
  */
  OnSendNotificationChanged(text) {
    this.props.OnSendNotificationChanged(text);
    this.onButtonPress(text)
  }

  render() {
    let isChecked = false;
    if(this.props.is_user_notification==true){
      isChecked=true;
    }
    else{
      isChecked=false;
    }
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
      <input type="checkbox"  defaultChecked={this.props.is_user_notification}  onChange={(event)=>{
        this.OnSendNotificationChanged(event.target.checked)}} value={this.props.is_user_notification}/>
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

  const mapStateToProps = ({setting}) => {
    const {loading,userId} = setting;
    let is_user_notification = false;
    if((setting.is_user_notification == undefined) || (setting.is_user_notification == false) || (setting.is_user_notification == "false")){
        is_user_notification = false;
    }
    else{
        is_user_notification = true;

    }
    return {loading,is_user_notification,userId};

  };

  export default connect(mapStateToProps, {addNotificationSettings,getUserDetailsForNotificationSettings,OnSendNotificationChanged})(NotificationSetting);
