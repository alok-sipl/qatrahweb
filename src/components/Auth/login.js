import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {emailChanged, passwordChanged,loginUser, resetForm, facebookLogin,phoneChanged} from '../../actions';
import {Spinner} from '../common'
import { BrowserRouter as Router, Route, Link, Prompt,Redirect } from "react-router-dom";
import _ from 'lodash';
import RegistrationVerification from '../../components/Auth/registration_verification';





class Login extends Component {
    state = {isLoaded: true,isRedirectHome:false,isRedirectVerify:false,isEmailVerified:false, validationError: '',secureTextEntry:true, isSubmitted: false,showFooter:true};
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
        firebase.auth().onAuthStateChanged((user)=>
        {
            this.setState({isLoaded:false});
            if(user)
            {
                if(user.emailVerified)
                {
                   this.setState({isRedirectHome:true});

                }
            }
        });
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
        this.props.passwordChanged(this.validatePassword(this.removeInvalidChars(text)));
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
     @Method : onButtonPress
     @Params :
     @Returns : *
     */
    onButtonPress() {
        this.setState({isSubmitted: true})
        const {email, password} = this.props;

        if (this.validateEmail(email) && password) {
            this.setState({validationError: ''});
            this.props.loginUser({email,password},(data)=>{
               if(data == "success"){
                   this.setState({isRedirectHome:true});

               }
               else{
                       this.setState({isRedirectVerify:true});
               }
            });
        }
    }

    /*
    @Method : renderAction
    @Params :s
    @Returns : *
    */
    renderAction() {

        if (this.props.loading) {
            return (
                <Spinner size="small"/>
            )
        }
        else {
            return (
                <input
                    type="button"
                    onClick={()=>{
                        this.onButtonPress();
                    }}
                    className="btn-blue-block"
                    value="Log In"
                    title="Log In" />
            );
        }
    }
    /*
@Method : validateNumber
@Params :
@Returns : *
*/
    validateNumber(text) {
        let newText = '';
        let numbers = '0123456789+';

        for (var i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }

        return newText;
    }


    /*
 @Method : onEyeClick
 @Params :
 @Returns : *
 */
    onEyeClick()
    {

        this.setState({secureTextEntry:!(this.state.secureTextEntry)})

    }



    /*
@Method : renderError
@Params : email
@Returns : *
*/
    renderErrorPassword = (isSubmitted,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Password is required</div>
                </div>
            )
        }

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
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Email is required</div>
                </div>
            )
        }
        else if(isSubmitted && (!(isValid)))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Email is Invalid</div>
                </div>
            )
        }

    }

    renderPasswordField(){

        if(this.state.secureTextEntry){
            return(
                <div className="form-group">
                    <label><i className="fa fa-lock f-" aria-hidden="true"></i></label>
                    <input
                        type="password"
                        maxLength={16}
                        placeholder="Password"
                        name="password"
                        onChange={(event)=>{
                            this.onChangePassword(event.target.value)

                        }}
                        value = {this.props.password}
                    />
                    <i onClick={()=>{
                        this.onEyeClick();
                    }}  className="fa fa-eye pass-visibility" aria-hidden="true"></i>
                    {this.renderErrorPassword(this.state.isSubmitted,this.props.password)}

                </div>
            )

        }
        else
        {
            return(
                <div className="form-group">
                    <label><i className="fa fa-lock f-" aria-hidden="true"></i></label>
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        maxLength={16}
                        onChange={(event)=>{
                            this.onChangePassword(event.target.value)

                        }}
                        value = {this.props.password}
                    />
                    <i  onClick={()=>{
                        this.onEyeClick();
                    }} className="fa fa-eye-slash pass-visibility" aria-hidden="true"></i>
                    {this.renderErrorPassword(this.state.isSubmitted,this.props.password)}

                </div>
            )

        }


    }

    /*
@Method : validatePassword
@Params :
@Returns : *
*/
    validatePassword(text) {
        return text.replace(/\s/g,'');
    }


    /*
   @Method : renderContent
   @Params :
   @Returns : *
   */
    render() {
        if(this.state.isLoaded)
        {
            return (
                <Spinner size="large"/>
            )
        }
        else if (this.state.isRedirectHome == true) {
            return <Redirect to='/home'/>;
        }
        else if (this.state.isRedirectVerify == true) {
            return <RegistrationVerification />;
        }
        else{

            return (
                <div>
                    <div className="columns medium-12">
                        <div className="form-wrapper">
                            <div className="card">
                                <div className="card-inner">
                                    <div className="form-logo">
                                        <img src="public/images/logo.png" className="logo"/>
                                        <h3>Log In</h3>
                                        <form  >
                                            <div className="form-group">
                                                <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                                <input type="email"
                                                maxLength={45}
                                                       placeholder="Email ID"
                                                       name="email"
                                                       onChange={(event)=>{
                                                           this.onChangeEmail(event.target.value)

                                                       }} value={this.props.email}
                                                />
                                                {this.renderErrorEmail(this.state.isSubmitted,this.validateEmail(this.props.email),this.props.email)}


                                            </div>
                                            {this.renderPasswordField()}

                                            <div className="form-group">
                                                <div className="frgt-password"> <Link to="/forgot-password" className="frgt-password"> Forgot Password? </Link></div>
                                            </div>
                                            <div className="form-group">
                                                {this.renderAction()}
                                            </div>


                                            <div className="form-fooetr">New user?  <Link to="/signup"> Sign Up </Link></div>
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

    }


const mapStateToProps = ({auth}) => {
    const {email,phone,password, error, loading} = auth;
    return {email, phone,password, error, loading};

};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    facebookLogin,
    phoneChanged,
    resetForm
})(Login);
