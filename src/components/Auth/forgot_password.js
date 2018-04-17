import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {emailChanged, forgotPassword,resetForm} from '../../actions';
import {Spinner} from '../common';
import { BrowserRouter as Router, Route, Link, Prompt,Redirect } from "react-router-dom";


class ForgotPassword extends Component{

    state = {isLoaded: true,isRedirectHome:false, validationError: '', isSubmitted: false,showFooter:true};

    constructor(props) {
        super(props);

    }



    /*
@Method : componentWillUnmount
@Desc   :
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
        @Params : email props
        @Returns : *
        */
    onChangeEmail(text) {
        this.props.emailChanged(this.removeInvalidChars(text));
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


    /*
      @Method : onButtonPress
      @Params :
      @Returns : *
      */
    onButtonPress() {
        this.setState({isSubmitted: true});
        const {email} = this.props;
        if (this.validateEmail(email)) {
            this.props.forgotPassword({email});

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
                    value="Send"
                    title="Send"
                />
            );
        }
    }


    render(){
        if(this.state.isLoaded)
        {
            return (
                <Spinner size="large"/>
            )
        }
        else if (this.state.isRedirectHome == true) {
            return <Redirect to='/home'/>;
        }
        else{

            return (
                <div className="columns medium-12">
                    <div className="form-wrapper">
                        <div className="card">
                            <div className="card-inner">
                                <div className="form-logo">
                                    <img src="public/images/logo.png" className="logo"/>
                                    <h3>Forgot Password?</h3>
                                    <h5 className="sub-heading">Enter your email address to recover<br/> your password</h5>
                                    <form>
                                        <div className="form-group">
                                            <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                            <input
                                                onChange={(event)=>{
                                                    this.onChangeEmail(event.target.value)

                                                }} value={this.props.email}
                                                type="text"
                                                maxLength={45}
                                                placeholder="Email ID"
                                                name="emailid"
                                            />
                                            {this.renderErrorEmail(this.state.isSubmitted,this.validateEmail(this.props.email),this.props.email)}
                                        </div>

                                        <div className="form-group">
                                            {this.renderAction()}
                                        </div>
                                        <div className="form-fooetr">Back to <Link to="/login">Log In </Link></div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }
    }
}

const styles = {
    containerBackgroundColor:{
        backgroundColor: '#fbfbfe'
    },
    headerStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        color:'black'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = ({auth}) => {
    const {email, loading} = auth;
    return {email, loading};

};

//export default ForgotPassword;
export default connect(mapStateToProps, {emailChanged,resetForm,forgotPassword})(ForgotPassword);