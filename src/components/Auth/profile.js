import React, {Component} from 'react';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import {Spinner} from '../common';
import {connect} from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import {NameChanged,getUserDetails,uploadPhoto,updateProfile,onChangeName,onAddressChange} from '../../actions';

class Profile extends Component {
  state = {file: '',imagePreviewUrl: '',chooseFile:false,menuActive: false,isLoaded:null,isNameEditActive:false,isAddressEditActive:false};
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
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    //alert('hiiiii');
    this.refs.fileUploader.click();
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
alert(file);
    reader.readAsDataURL(file)
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
  {
    if(this.state.isNameEditActive)
    {
      return(
        <div>
        <Input onChange={(event)=>{this.onChangeName(event.target.value)}} value={this.props.name} placeholder="Name"  placeholderTextColor="#fff"   style={styles.editProfileName.button} />
        <a  onClick={() => {this.updateName()}}><i className="fa fa-pencil" aria-hidden="true"></i></a>
        <a onClick={() => {this.setState({isNameEditActive:false})
        this.props.getUserDetails();
      }}><i className="fa fa-close" aria-hidden="true"></i></a>

        </div>

      );
    }
    else
    {
      return(
        <div>
        <div> {this.props.name}  </div>
        <a  onClick={() => {this.setState({isNameEditActive:true})}}><i className="fa fa-pencil" aria-hidden="true"></i></a>

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
        <input type="text" multiline={true} maxLength={130} numberOfLines={5} style={{maxHeight:180,height:100,left:10}} onChange={(event)=>{this.onChangeAddress(event.target.value)}} value={this.props.address}   placeholder="Address" />

        <a  onClick={() => {this.updateAddress()}}><i className="fa fa-pencil" aria-hidden="true"></i></a>
        <a onClick={() => {this.setState({isAddressEditActive:false})
        this.props.getUserDetails();
      }}><i className="fa fa-close" aria-hidden="true"></i></a>
      </div>

    );
  }
  else
  {
    return(

      <div>
      <div>   {this.props.address}</div>
      </div>

    );
  }

}

    onUploadProfilePress()
    {

            //this.props.changeProfilePicture(image);
            this.props.uploadPhoto('image',this.props.userId);

    }

/*
@Method : renderProfilePicture
 @Params :
 @Returns : *
 */
 renderProfilePicture() {
     if(this.props.loading)
     {
         return (
             <Spinner size="large"/>
         )
     }
     else
     {

         if(this.props.profile_picture)
         {
             return(
                 <div  onClick={()=>{
                     this.onUploadProfilePress();
                 }}>
                     <img  src={{ uri: this.props.profile_picture }} />
                 </div>
             );
         }
         else
         {
             return(
                 <div onClick={()=>{
                     this.onUploadProfilePress();
                 }}>
                     <img src="public/images/no_photo.jpg" />
                 </div>

             );
         }
     }


}


renderData() {
  let {imagePreviewUrl} = this.state;
let $imagePreview = null;
if (imagePreviewUrl) {
  $imagePreview = (<img src={imagePreviewUrl} />);
} else {
  $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
}
  return (
    <div>
    <div className="row">
    <div className="columns medium-12">
    <div className="card-panel">
    <div className="my-profile">


    <div className="previewComponent">


           <form onSubmit={(e)=>this._handleSubmit(e)}>
             <input className="fileInput" ref="fileUploader"
               type="file"
               onChange={(e)=>this._handleImageChange(e)} />
             <button className="submitButton"
               type="submit"
               onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
           </form>
           <div className="imgPreview">
             {$imagePreview}
           </div>
         </div>


    {this.renderProfilePicture()}
    <div className="upload-pic"><img onClick={(e)=>{this._handleImageChange(e)}} src="public/images/camera.png"/></div>

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
    <h4><span><i className="fa fa-map-marker" aria-hidden="true"></i></span> Address <span><a  onClick={() => {this.setState({isAddressEditActive:true})}}><i className="fa fa-pencil" aria-hidden="true"></i></a></span></h4>
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
      <div style={styles.containerBackgroundColor}>
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


const styles = {
  containerBackgroundColor: {
    backgroundColor: '#fbfbfe'
  },

  headerStyle:{
    backgroundColor:'transparent',
    shadowOpacity: 0,
    elevation: 0
  },
  cardItemBackgroundColor : {
    backgroundColor: 'transparent'
  },
  editProfileName:{
    backgroundColor: 'transparent',
    textAlign:'center',
    justifyContent: 'center',
    paddingBottom:85,
    paddingTop:30,
    display:'flex',
    button:{
      placeholderText:"#fff",
      color:'white',
      fontSize:16,
      placeholderTextColor:'#fff'
    },
    editButton:{
      color:'white',
      fontSize:16,
      paddingLeft:10
    }
  },
  profileHeader:{
    backgroundColor: 'transparent',
    cardItemBackgroundColor :{
      paddingTop:20,
      backgroundColor: 'transparent',
      textAlign:'center',
      justifyContent: 'center',
      alignItems: 'center',
      styleAvatar : {
        backgroundColor: 'transparent',
        padding:5,
        borderColor:'white',
        alignItems: 'center'
      }
    }
  },
  listItemStyle:{
    marginRight:15,
    borderBottomWidth:0,
    borderColor:'transparent',
    borderBottomWidth:2,
    paddingBottom:5,
    shadowOpacity: 0.2,
    elevation: 0.2,
    title:{
      color:'black'
    }
  },
  iconStyle:{
    color:"#2eb9f9",
  },
  iconSmall:{
    color:"#2eb9f9",
    fontSize:16
  },
  iconStyleClose:{
    color:"red"
  },
  iconStyleBackButton:{
    color:"#fff"
  },
  listStyle:{
    paddingTop:12
  },
  nameStyle:{
    justifyContent:'flex-start',
    flexDirection:'row',
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
