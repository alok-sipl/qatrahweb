import React, {Component} from 'react';
import {connect} from 'react-redux';
import LedtNavigation from './../templates/left_navigation';
import {Spinner} from "../common";
import {changePassword,resetForm} from '../../actions';
import {showToast} from '../../actions/types';
import  firebase from 'firebase';
import Header from '../templates/header';





class ChangePasswordForm extends Component {
    state = {menuActive: false,isLoading:true,isSubmitted:false,newPassword:"",confirmPassword:"",oldPassword:""};

    componentWillMount() {
        this.props.resetForm();
        firebase.auth().onAuthStateChanged((user)=>
        {
            this.setState({isLoading:false})
            if(user)
            {
                if(user.emailVerified)
                {

                }
            }
        });

    }

    /*
@Method : validatePasswordOnSubmmit
@Params : password
@Returns : *
*/
    validatePasswordOnSubmmit = (password) => {
        var re = /^(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    };

    /*
 @Method : onButtonPress
 @Params :
 @Returns : *
 */
    onButtonPress() {
        this.setState({isSubmitted: true})
        const {newPassword,confirmPassword,oldPassword} = this.state;
        if(newPassword && confirmPassword && oldPassword)
        {
            if(confirmPassword == newPassword)
            {
                if(this.validatePasswordOnSubmmit(newPassword))
                {
                    this.props.changePassword({old_password:oldPassword,password:newPassword},()=>{
                        this.setState({newPassword:"",confirmPassword:"",oldPassword:"",isSubmitted:false});
                    });

                }
                else
                {
                    showToast("danger","Password should have minimum 6 Charcters, 1 caps,1small, 1 Special charcter, 1 number.");
                }

            }
            else
            {
                showToast("danger","Password and Confirm Password should be same.");
            }
        }

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
@Method : onOldPasswordChanged
@Params :
@Returns : *
*/
    onOldPasswordChanged(text) {
        this.setState({oldPassword:this.removeInvalidChars(text.trim())});
    }


    /*
@Method : onConfirmPasswordChanged
@Params :
@Returns : *
*/
    onConfirmPasswordChanged(text) {
        this.setState({confirmPassword:this.removeInvalidChars(text.trim())});
    }


    /*
@Method : onNewPasswordChanged
@Params :
@Returns : *
*/
    onNewPasswordChanged(text) {
        this.setState({newPassword:this.removeInvalidChars(text.trim())});
    }



    /*
@Method : renderAction
@Params :s
@Returns : *
*/
    renderAction() {

        if (this.props.loading || this.state.isLoading) {
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
                    className="btn-blue-block btn"
                    value="Submit"
                    title="Submit"
                />
            );
        }
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
 @Method : renderOldErrorPassword
 @Params : email
 @Returns : *
 */
    renderOldErrorPassword = (isSubmitted, value) => {
        if (isSubmitted && value == '') {
            return (
                <div style={{flex: 1}}>
                    <div style={{color: 'red'}}>Old Password is required</div>
                </div>

            )
        }
    }


    /*
@Method : renderNewErrorPassword
@Params : email
@Returns : *
*/
    renderNewErrorPassword = (isSubmitted, value) => {
        if (isSubmitted && value == '') {
            return (
                <div style={{flex: 1}}>
                    <div style={{color: 'red'}}>New Password is required</div>
                </div>

            )
        }
    }

    /*
@Method : renderNewErrorPassword
@Params : email
@Returns : *
*/
    renderConfirmErrorPassword = (isSubmitted, value) => {
        if (isSubmitted && value == '') {
            return (
                <div style={{flex: 1}}>
                    <div style={{color: 'red'}}>Confirm Password is required</div>
                </div>

            )
        }
    }



    renderContent(){
        if (this.state.isLoading) {
            return (
                <Spinner size="large"/>
            )
        }
        else{
            return (

                <div className="card-panel">
                    <div className="form-comman">
                        <form>
                            <div className="form-group">
                                <label><i className="fa fa-lock f-" aria-hidden="true"></i></label>

                                <input
                                    onChange={(event)=>{
                                        this.onOldPasswordChanged(event.target.value)

                                    }}
                                    maxLength={16}
                                    value = {this.state.oldPassword}
                                    type="password"
                                    placeholder="Old password"
                                    name="opassword"
                                />
                                {this.renderOldErrorPassword(this.state.isSubmitted,this.state.oldPassword)}
                            </div>
                            <div className="form-group">
                                <label><i className="fa fa-lock f-" aria-hidden="true"></i></label>
                                <input
                                    onChange={(event)=>{
                                        this.onNewPasswordChanged(event.target.value)

                                    }}
                                    value = {this.state.newPassword}
                                    type="password"
                                    maxLength={16}
                                    placeholder="New password"
                                    name="opassword"
                                />
                                {this.renderNewErrorPassword(this.state.isSubmitted,this.state.newPassword)}
                            </div>
                            <div className="form-group">
                                <label><i className="fa fa-lock f-" aria-hidden="true"></i></label>
                                <input
                                    onChange={(event)=>{
                                        this.onConfirmPasswordChanged(event.target.value)

                                    }}
                                    value = {this.state.confirmPassword}
                                    maxLength={16}
                                    type="password"
                                    placeholder="Confirm password"
                                    name="opassword"
                                />
                                {this.renderConfirmErrorPassword(this.state.isSubmitted,this.state.confirmPassword)}
                            </div>
                            <div className="form-group text-center">
                                {this.renderAction()}

                            </div>
                        </form>
                    </div>
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
                        <Header/>

                        <h1 className="page-title">Change Password</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="columns medium-12">
                        {this.renderContent()}
                    </div>
                </div>
                <LedtNavigation/>
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
        alignItems: 'center'
    },
    forgotPasswordButtonCardItemStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        fontWeight:'bold'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}
const mapStateToProps = ({auth}) => {
    const {loading} = auth;
    return {loading};

};

export default connect(mapStateToProps, {changePassword,resetForm})(ChangePasswordForm);
