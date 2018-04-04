import React, {Component} from 'react';
import {Link, withRouter,} from 'react-router-dom';
import {emailChanged,resetForm,firstNameChanged, lastNameChanged, passwordChanged, registerUser,phoneChanged} from '../../actions';
import {connect} from 'react-redux';


class Signup extends Component {
  state = { isLoaded: false, validationError: '',secureTextEntry:true, isSubmitted: false,showFooter:true};
  constructor(props) {
    super(props);


  }

  /*
  @Method : componentWillMount
  @Desc   : will check that user is logged in or not
  @Params :
  @Returns : *
  */
  componentWillMount() {

    this.props.resetForm();
  }
  /*
  @Method : componentWillUnmount
  @Desc   :
  @Params :
  @Returns : *
  */
  componentWillUnmount () {

  }

  /*
  @Method : _keyboardDidShow
  @Desc   :
  @Params :
  @Returns : *
  */
  _keyboardDidShow () {
    this.setState({showFooter: false});
  }

  /*
  @Method : _keyboardDidHide
  @Desc   :
  @Params :
  @Returns : *
  */

  _keyboardDidHide () {
    this.setState({showFooter: true});
  }


  /*
  @Method : removeInvalidChars
  @Params :
  @Returns : *
  */
  removeInvalidChars(text) {
    let regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
    return text.replace(regex, '');
  }


  /*
  @Method : onChangeEmail
  @Params :
  @Returns : *
  */
  onChangeEmail(text) {
    this.props.emailChanged(this.removeInvalidChars(text));
  }

  /*
  @Method : onChangePassword
  @Params :
  @Returns : *
  */
  onChangePassword(text) {
    this.props.passwordChanged((this.removeInvalidChars(text)));
  }

  /*
  @Method : validatePasswordOnSubmmit
  @Params : password
  @Returns : *
  */
  validatePasswordOnSubmmit = (password) => {
    let re = /^(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };



  /*
  @Method : validatePhoneNumber
  @Params : phone
  @Returns : *
  */
  validatePhoneNumber = (phone) => {
    if(phone.length > 9)
    {
      let re = /^\+[1-9]{1}[0-9]{3,14}$/;
      return re.test(phone);
    }
    else
    {
      return false;
    }
  };


  /*
  @Method : onButtonPress
  @Params :
  @Returns : *
  */
  onButtonPress() {
    this.setState({isSubmitted: true})
    const {email, password, phone} = this.props;
    if (this.validateEmail(email) && password && this.validatePhoneNumber(phone) && this.validatePasswordOnSubmmit(password)) {
      this.setState({validationError: ''})
      // navigator.geolocation.getCurrentPosition(
      //     (position) => {
      //         this.props.registerUser({email,password,phone,position});
      //     },
      //     (error) => alert(error.message),
      //     {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
      // );
      this.props.registerUser({email,password,phone});



    }
  }
  /*
  @Method : renderAction
  @Params :
  @Returns : *
  */
  renderAction() {

    if (this.props.loading) {
      return (
        <Spinner size="large"/>
      )
    }
    else {
      return (
        <Button  onPress={this.onButtonPress.bind(this)}>
        Sign Up
        </Button>
      );
    }
  }
  /*
  @Method : validateEmail
  @Params : email
  @Returns : *
  */
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };


  /*
  @Method : validatePassword
  @Params :
  @Returns : *
  */
  validatePassword=(text)=> {
    return text.replace(/\s/g,'');
  }

  /*
  @Method : validateNumber
  @Params :
  @Returns : *
  */
  validateNumber(text) {
    let newText = '';
    let numbers = '+0123456789';

    for (var i = 0; i < text.length; i++) {
      if ( numbers.indexOf(text[i]) > -1 ) {
        newText = newText + text[i];
      }
    }

    return newText;
  }
  /*
  @Method : renderError
  @Params : email
  @Returns : *
  */
  renderErrorEmail = (isSubmitted,isValid,value)=>
  {
    if(isSubmitted && (value == ''))
    {
      return (
        <div style={{flex:1,alignSelf:'flex-start'}}>
        <div style={{color:'red'}}>Email is required</div>
        </div>
      )
    }
    else if(isSubmitted && (!(isValid)))
    {
      return (
        <div style={{flex:1}}>
        <div style={{color:'red',left:100}}>Email is Invalid</div>
        </div>
      )
    }

  }

  /*
  @Method : renderError
  @Params : email
  @Returns : *
  */
  renderErrorPassword = (isSubmitted,isValid,value,isLengthMessageShow)=>
  {
      if(isSubmitted && value=='')
      {
          return (
            <div style={{flex:1}}>
            <div style={{color:'red'}}>Password is required</div>
            </div>

          )
      }
      else if(isSubmitted && (!(isValid)))
      {
          if(isLengthMessageShow)
          {
              return (
                <div style={{flex:1}}>
                <div style={{color:'red'}}>Password should have minimum 8 Charcters and 1 capital letter.</div>
                </div>

              )
          }

      }

  }



  /*
  @Method : onChangePhoneNumber
  @Params :
  @Returns : *
  */
  onChangePhoneNumber(text) {
    this.props.phoneChanged(this.validateNumber(text));
  }

  /*
@Method : renderErrorPhone
@Params : email
@Returns : *
*/
  renderErrorPhone = (isSubmitted,isValid,value)=>
  {
      if(isSubmitted && (value == ''))
      {
          return (
            <div style={{flex:1}}>
            <div style={{color:'red'}}>Mobile Number is required</div>
            </div>

          )
      }
      else if(isSubmitted && (!(isValid)))
      {
          return (
            <div style={{flex:1}}>
            <div style={{color:'red'}}>Mobile Number is not valid, it should be like (+XXXXXXXXXXXX) </div>
            </div>

          )
      }

  }

  /*
 @Method : validatePhone
 @Params : password
 @Returns : *
 */
  validatePhone = (phone) => {
      if(phone.length > 9)
      {
          let re = /^\+[1-9]{1}[0-9]{3,14}$/;
          return re.test(phone);
      }
      else
      {
          return false;
      }
  }


  /*
  @Method : renderAction
  @Params :
  @Returns : *
  */

  render() {
    const {
      email,
      password,
      mobile,
      error,
    } = this.state;


    const isInvalid =
    password === '' ||
    email === '' ||
    mobile === '';


    return (
      <div>
      <div className="columns medium-12">
      <div className="form-wrapper">
      <div className="card">
      <div className="card-inner">
      <div className="form-logo">
      <img src="public/images/logo.png" className="logo"/>
      <h3>Sign Up</h3>
      <form >
      {error && <div className="alert alert-danger">{error.message}</div>}
      <div className="form-group">
      <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
      <input
      type="email"
      placeholder="Email ID"
      name="email"
      value={email}

      onChange={(event)=>{
        this.setState({'email': event.target.value})
        this.onChangeEmail(event.target.value)

      }} value={this.props.email}
      />

      {this.renderErrorEmail(this.state.isSubmitted,this.validateEmail(this.props.email),this.props.email)}

      </div>
      <div className="form-group">
      <label><i className="fa fa-lock f-" aria-hidden="true"></i></label>
      <input
      type="password"
      placeholder="Password"
      name="password"
      value={password}
      onChange={(event)=>{
        this.setState({'password': event.target.value})
        this.onChangePassword(event.target.value)
      }}value={this.props.password}
      />
      {this.renderErrorPassword(this.state.isSubmitted,this.validatePasswordOnSubmmit(this.props.password),this.props.password,(this.props.password.length > 0))}

      </div>
      <div className="form-group">
      <label><i className="fa fa-phone" aria-hidden="true"></i></label>
      <input
      type="text"
      maxLength={13}
      placeholder="Mobile Number"
      name="mobile"
      value={mobile}
      onChange={(event)=>{
        this.setState({'mobile': event.target.value})
        this.onChangePhoneNumber(event.target.value)
      }}
      value={this.props.phone}
      />
    {this.renderErrorPhone(this.state.isSubmitted,this.validatePhone(this.props.phone),this.props.phone)}
      </div>

      <div className="form-group">
      <input
      disabled={isInvalid}
      type="button"
      onClick={()=>{
        this.onButtonPress();
      }}
      className="btn-blue-block"
      value="Sign Up"
      title="Sign Up"
      />
      </div>
      <div className="form-fooetr">Already have an account? <a href="login">Login</a>
      </div>
      </form>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}
const mapStateToProps = ({auth}) => {
  const {email, password,phone, first_name, last_name, error, loading} = auth;
  return {email, password,phone, first_name, last_name, error, loading};

};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  registerUser,
  lastNameChanged,
  firstNameChanged,
  phoneChanged,
  resetForm
})(Signup);
