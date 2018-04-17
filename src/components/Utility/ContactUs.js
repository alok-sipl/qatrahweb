import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './../templates/header';
import LedtNavigation from './../templates/left_navigation';
import {addContactUsDetails, OnNameChanged, OnEmailChanged, resetForm, OnQueryChanged} from '../../actions';
import firebase from 'firebase';
//import {showToast} from "../../ref/src/actions/types";
import {Spinner} from '../common'


class ContactUs extends Component {

    constructor(props) {
        super(props);

    }

    state = {isSubmitted: false, validationError: '',isLoading:true};

    componentWillMount() {
        this.props.resetForm();
        firebase.auth().onAuthStateChanged((user)=>
        {
            this.setState({isLoading:false})
            if(user)
            {
                if(user.emailVerified)
                {
                    this.props.OnNameChanged(user.displayName);
                    this.props.OnEmailChanged(user.email);
                }
            }
        });
        let userInfo = firebase.auth().currentUser;

    }


    /*
 @Method : onButtonPress
 @Params :
 @Returns : *
 */
    onButtonPress() {
        this.setState({isSubmitted: true})
        const {email, name, query} = this.props;
            if (email && name && query) {
                this.setState({isSubmitted: false})
                this.props.addContactUsDetails({name, email, query});
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
  @Method : OnNameChanged
  @Params :
  @Returns : *
  */
    OnNameChanged(text) {
        this.props.OnNameChanged(this.removeInvalidChars(this.validateText(text)));
    }

    /*
  @Method : OnEmailChanged
  @Params :
  @Returns : *
  */
    OnEmailChanged(text) {
        this.props.OnEmailChanged(this.removeInvalidChars(text));
    }

    /*
@Method : validateText
@Params :
@Returns : *
*/
    validateText(text) {

        return text;
    }


    /*
@Method : renderErrorName
@Params : email
@Returns : *
*/
    renderErrorName = (isSubmitted,isValid,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Name is required</div>
                </div>
            )
        }
        else if(isSubmitted && (!(isValid)))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Name is Invalid</div>
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

    /*
@Method : renderErrorName
@Params : email
@Returns : *
*/
    renderErrorName = (isSubmitted,isValid,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Name is required</div>
                </div>
            )
        }
        else if(isSubmitted && (!(isValid)))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Name is Invalid</div>
                </div>
            )
        }

    }

    /*
@Method : renderErrorName
@Params : email
@Returns : *
*/
    renderErrorQuery = (isSubmitted,isValid,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Query is required</div>
                </div>
            )
        }
        else if(isSubmitted && (value.length > 500))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Query will not more than 500 character</div>
                </div>
            )
        }
        else if(isSubmitted && (!(isValid)))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Query is Invalid</div>
                </div>
            )
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
@Method : OnQueryChanged
@Params :
@Returns : *
*/
    OnQueryChanged(text) {
        this.props.OnQueryChanged(text);
    }

    /*
@Method : validateFirstSpace
@Params :
@Returns : *
*/
    validateFirstSpace(text) {
        let myString = text;

        let spacesAtStart = myString.length - myString.trimLeft().length

        return spacesAtStart;
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
                    value="Send"
                    title="Send"
                />
            );
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
                                <label><i className="fa fa-user f-" aria-hidden="true"></i></label>
                                <input
                                    onChange={(event)=>{
                                        this.OnNameChanged(event.target.value)

                                    }}
                                    value = {this.props.name}
                                    type="text"
                                    placeholder="Name"
                                    name="uname"
                                />
                                {this.renderErrorName(this.state.isSubmitted,this.validateText(this.props.name),this.props.name)}
                            </div>
                            <div className="form-group">
                                <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                <input
                                    onChange={(event)=>{
                                        this.OnEmailChanged(event.target.value)

                                    }}
                                    value = {this.props.email}
                                    type="text"
                                    placeholder="Email ID"
                                    name="emailid"
                                    disabled={true}
                                />
                                {this.renderErrorEmail(this.state.isSubmitted,this.validateEmail(this.props.email),this.props.email)}
                            </div>
                            <div className="form-group">
                                <label><i className="fa fa-comment f-" aria-hidden="true"></i></label>
                                <textarea
                                    onChange={(event)=>{
                                        this.OnQueryChanged(event.target.value)

                                    }}
                                    value = {this.props.query}
                                    cols="3" rows="3"
                                    placeholder="Comment/Query">

                                        </textarea>
                                {this.renderErrorQuery(this.state.isSubmitted,this.validateText(this.props.query),this.props.query)}
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


    render() {
        return (
            <div>
                <div className="row">
                    <div className="columns medium-12">
                    <Header/>

                        <h1 className="page-title">Contact Us</h1>
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

const mapStateToProps = ({utility}) => {
    const {email, name, query, loading} = utility;
    return {email, name, query, loading};

};

export default connect(mapStateToProps, {
    addContactUsDetails,
    OnNameChanged,
    OnEmailChanged,
    OnQueryChanged,
    resetForm
})(ContactUs);