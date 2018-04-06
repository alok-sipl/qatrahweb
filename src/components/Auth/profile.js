import React, {Component} from 'react';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import {Spinner} from '../common';
import {connect} from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import {NameChanged,getUserDetails,uploadPhoto,updateProfile,onChangeName,onAddressChange} from '../../actions';

class Profile extends Component {
  state = {menuActive: false,isLoaded:null,isNameEditActive:false,isAddressEditActive:false};
  /*
   @Method : componentWillMount
   @Desc   : will check that user is logged in or not
   @Params :
   @Returns : *
   */
   componentWillMount() {
       firebase.auth().onAuthStateChanged((user)=>
       {
           this.setState({isLoading:false})
           if(user)
           {
               if(user.emailVerified)
               {
                    this.props.getUserDetails();
               }
           }
       });

   }

  /*
@Method : validateFirstSpace
@Params :
@Returns : *
*/
  validateFirstSpace(text)
  {
      let myString = text;

      let spacesAtStart = myString.length - myString.trimLeft().length

      return spacesAtStart;
  }


  /*
 @Method : onButtonPress
 @Desc   :
 @Params :
 @Returns : *
 */

  onButtonPress()
  {
      const  {name,profile_picture,userId,address} = this.props;
      if(userId)
      {
          if((name != undefined) || (profile_picture != undefined) || (address != undefined))
          {
              this.props.updateProfile({name,profile_picture,address,userId});
          }
      }
  }




  /*
@Method : updateAddress
@Desc   :
@Params :
@Returns : *
*/

  updateAddress()
  {
      if(this.props.address != undefined)
      {
          if(this.validateFirstSpace(this.props.address) > 0)
          {
             showToast('danger',"Address is not valid");


          }
          else
          {
              if(this.props.address)
              {
                  this.setState({isAddressEditActive:false})
                  this.onButtonPress();
              }
          }
      }

  }


  /*
@Method : updateName
@Desc   :
@Params :
@Returns : *
*/

  updateName()
  {
      if(this.props.name != undefined) {

          if(this.validateFirstSpace(this.props.name) > 0)
          {
              showToast('danger',"Name is not valid");

          }
          else {
              if (this.props.name) {
                  this.setState({isNameEditActive: false})
                  this.onButtonPress();
              }
          }
      }


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
@Method : removeInvalidChars
@Params :
@Returns : *
*/
  removeInvalidCharsAddress(text) {
      let regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      return text.replace(regex, '');
  }
  /*
@Method : onChangeAddress
@Params :
@Returns : *
*/
  onChangeAddress(text)
  {
      this.props.onAddressChange(this.removeInvalidCharsAddress(text));

  }
  /*
 @Method : onChangeName
 @Params :
 @Returns : *
 */
  onChangeName(text)
  {
      this.props.NameChanged(this.removeInvalidChars(text));

  }
  /*
@Method : renderNameTextBoxOrEditIcon
@Params :
@Returns : *
*/
  renderNameTextBoxOrEditIcon()
  {  if(this.state.isNameEditActive)
          {
              return(
                  <div >
                      <div error={(this.props.name == '')} rounded>
                          <Input onChangeText={this.onChangeName.bind(this)} value={this.props.name} placeholder="Name"  placeholderTextColor="#fff"   style={styles.editProfileName.button} />
                          <input
                              type="button"
                              onClick={() => {
                                  this.updateName();
                              }}
                              className="md-create"
                              value=""
                              title=""/>

                              <input
                                  type="button"
                                  onClick={() => {
                                    this.setState({isNameEditActive:false});
                                    this.props.getUserDetails();
                                  }}
                                  className="close"
                                  value=""
                                  title=""/>


                      </div>
                  </div>

              );
          }
          else
          {
              return(
                  <div>
                      <div> {this.props.name}</div>
                      <label onClick={()=>{this.setState({isNameEditActive:true})}}><i className="fa fa-md-create" aria-hidden="true"></i></label>
                    
                  </div>
              );
          }

      }


  /*
    @Method : renderAddressTextBoxOrEditIcon
    @Params :
    @Returns : *
   */

  renderAddressTextBoxOrEditIcon()
  {
          if(this.state.isAddressEditActive)
          {
              return(
                  <div>
                      <div last error={(this.props.address == '')}>
                      <label><i className="fa fa-pin" aria-hidden="true"></i></label>
                            <div style={{flex:1,aligndivs:'stretch'}}>
                              <Input  multiline={true} maxLength={130} numberOfLines={5} style={{maxHeight:180,height:100}} onChangeText={this.onChangeAddress.bind(this)} value={this.props.address}   placeholder="Address" />
                          </div>
                          <div style={{flex:1,aligndivs: 'flex-end',alignSelf: 'flex-start',flexDirection: 'row',maxWidth:90,display:'flex'}}>
                          <input
                              type="button"
                              onClick={() => {
                                  this.updateAddress();
                              }}
                              className="btn-blue-block"
                              value=""
                              title=""/>

                              <label><i className="fa fa-md-create" aria-hidden="true"></i></label>
                              <input
                                  type="button"
                                  onClick={() => {
                                    this.setState({isAddressEditActive:false})
                                    this.props.getUserDetails();
                                  }}
                                  className="btn-blue-block"
                                  value=""
                                  title=""/>
                              <label><i className="fa fa-close" aria-hidden="true"></i></label>


                          </div>
                      </div>
                  </div>
              );
          }
          else
          {
              return(
                  <div style={{justifyContent:'space-between',display:'flex'}}>
                    <label><i className="fa fa-pin" aria-hidden="true"></i></label>
                          <div>
                              <div>Address</div>
                              <div>{this.props.address}</div>
                          </div>

                      <div style={{flex:1,aligndivs: 'flex-start',alignSelf: 'flex-start',maxWidth:30}}>

                      <input
                          type="button"
                          onClick={() => {
                            this.setState({isAddressEditActive:true});
                          }}
                          className="btn-blue-block"
                          value=""
                          title=""/>

                              <label><i className="fa fa-close" aria-hidden="true"></i></label>

                      </div>
                  </div>
              );
          }

      }






  renderData() {
    return (
      <div>
      <div className="row">
      <div className="columns medium-12">
      <div className="card-panel">
      <div className="my-profile">
      <img src="public/images/user-profile.png"/>
      <div className="upload-pic"><a href="#"><img src="public/images/camera.png"/></a></div>
      {this.renderNameTextBoxOrEditIcon()}
      </div>
      <ul className="list-divs m-t20 profile-details">
      <li>
      <h4><span><i className="fa fa-envelope" aria-hidden="true"></i></span> Email ID</h4>
      <p className="device-id">{this.props.email}</p>
      </li>
      <li>
      <h4><span><i className="fa fa-phone" aria-hidden="true"></i></span>Mobile Number</h4>
      <p className="device-id">{this.props.phone}</p>
      </li>
      <li>
      <h4><span><i className="fa fa-envelope" aria-hidden="true"></i></span> Address<span><i className="fa fa-pencil" aria-hidden="true"></i></span></h4>
      <p className="device-id"> {this.renderAddressTextBoxOrEditIcon()}</p>
      </li>

      </ul>
      </div>
      </div>
      </div>
      <LedtNavigation />
      </div>
    )
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
        <h1 className="page-title">My Profile</h1>
        </div>
        </div>

        {this.renderData()}
        </div>

      );
    }
  }
}


const mapStateToProps = ({auth}) => {
  const {profile_picture,address,userId,name,loading,phone,email} = auth;
  return {loading,profile_picture,address,userId,name,phone,email};

};
export default connect(mapStateToProps, {
  getUserDetails,
  NameChanged,
  uploadPhoto,
  updateProfile,
  onChangeName,
  onAddressChange
})(Profile);
