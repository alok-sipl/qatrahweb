import React, {Component} from 'react';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import {Spinner} from '../common';
import {connect} from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import {NameChanged,getUserDetails,uploadPhoto,updateProfile,onChangeName,onAddressChange} from '../../actions';
import {showToast} from '../../actions/types';



class Profile extends Component {
  state = {isLoading:true,file: '',imagePreviewUrl: '',chooseFile:false,menuActive: false,isLoaded:null,isNameEditActive:false,isAddressEditActive:false};
  /*
  @Method : componentWillMount
  @Desc   : will check that user is logged in or not
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
          this.props.getUserDetails();
          this.setState({isLoading:false})

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
  let userId = this.props.userId;
  let dataURL = ""
    this.refs.fileUploader.click();
    e.preventDefault();


    if(e.target.files && e.target.files.length > 0){
         let reader = new FileReader();
         let file = e.target.files[0];
            if((file.type == "image/jpeg" || file.type == "image/png")){
              reader.onload = ()=>{
             dataURL = reader.result;
             dataURL = reader.result.split(',').pop();

            if(userId){
            this.props.uploadPhoto(dataURL,userId);
            }
           };
             reader.readAsDataURL(e.target.files[0]);

            }
            else
            {
                         showToast("danger","File Type is not valid.");
            }

    }



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


    return text;
  }

  /*
  @Method : removeInvalidChars
  @Params :
  @Returns : *
  */
  removeInvalidCharsAddress(text) {
    return text;
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
        <div style={{position:'relative'}}>
        <input type="text"  maxLength={80} onChange={(event)=>{this.onChangeName(event.target.value)}} value={this.props.name} placeholder="Name"  placeholderTextColor="#fff" style={{backgroundColor:'transparent',borderColor:'transparent',marginTop:20, color:'white'}}  />
        <div className="edit-name">
        <a  onClick={() => {this.updateName()}}><i className="fa fa-pencil" aria-hidden="true" style={{color:'white'}}></i></a>
        <a onClick={() => {this.setState({isNameEditActive:false})
        this.props.getUserDetails();
      }}><i className="fa fa-close" aria-hidden="true"></i></a>
</div>
        </div>

      )
    }
    else
    {
      return(
        <div >

        <div style={{marginTop:20,marginBottom:20,color:'white'}}> {this.props.name} <a  onClick={() => {this.setState({isNameEditActive:true})}}><i className="fa fa-pencil" aria-hidden="true" style={{marginLeft:10, color:'white'}}></i></a>
 </div>
        
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

        <h4><span><i className="fa fa-map-marker" aria-hidden="true"></i></span> Address <span></span></h4>
    <p className="device-id">
          <div>
        <textarea rows="4" cols="50" maxLength={150} style={{maxHeight:100,height:100,left:10,maxWidth:"100%",top:10,position:'relative', borderRadius:25}} onChange={(event)=>{this.onChangeAddress(event.target.value)}} value={this.props.address}   placeholder="Address" />
<div className="act-group">
        <a  onClick={() => {this.updateAddress()}}><i className="fa fa-pencil" aria-hidden="true"></i></a>
        <a onClick={() => {this.setState({isAddressEditActive:false})
        this.props.getUserDetails();
      }}><i className="fa fa-close" aria-hidden="true"></i></a>
      </div>
      </div>
     </p>
     </div>



    );
  }
  else
  {
    return(
      <div>

        <h4><span><i className="fa fa-map-marker" aria-hidden="true"></i></span> Address <span><a  onClick={() => {this.setState({isAddressEditActive:true})}}><i className="fa fa-pencil" aria-hidden="true" style={{float:'right'}}></i></a></span></h4>
    <p className="device-id">
     {this.props.address}
     </p>
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
     if(this.props.loading || this.state.isLoading)
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
                 <div >
                     <img  onClick={(e)=>{this._handleImageChange(e)}} src={this.props.profile_picture} className="profile-icon"/>
                 </div>
             );
         }
         else
         {
             return(
                 <div >
                     <img onClick={(e)=>{this._handleImageChange(e)}} src="/public/images/no_photo.jpg"  className="profile-icon"/>
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

  <div style={{display:"none"}} >
    <div className="previewComponent">


           <form onSubmit={(e)=>this._handleSubmit(e)}>
             <input className="fileInput" ref="fileUploader"
               type="file"
                accept=".jpg,.jpeg,.png"
               onChange={(e)=>{
               this._handleImageChange(e)

               }} />
             <button className="submitButton"
               type="submit"
               onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
           </form>
           <div className="imgPreview">
             {$imagePreview}
           </div>
         </div>
         </div>


    {this.renderProfilePicture()}
    <div style={{marginTop:20}}>
    <div className="upload-pic"><img  onClick={(e)=>{this._handleImageChange(e)}} src="public/images/camera.png"/></div>

    {this.renderNameTextBoxOrEditIcon()}
    </div>
    </div>
    <ul className="list-divs m-t20 profile-details list-items">
    <li>
    <h4><span><i className="fa fa-envelope" aria-hidden="true"></i></span> Email ID</h4>
    <p className="device-id">{this.props.email}</p>
    </li>
    <li>
    <h4><span><i className="fa fa-phone" aria-hidden="true"></i></span>Mobile Number</h4>
    <p className="device-id">{this.props.phone}</p>
    </li>
    <li>
    {this.renderAddressTextBoxOrEditIcon()}
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
  if(this.props.loading || this.state.isLoading)
  {
         return (
             <Spinner size="large"/>
         )
  }
  else
  {
    return (
      <div style={styles.containerBackgroundColor}>
      <div className="row">
      <div className="columns medium-12">
      <Header />

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
