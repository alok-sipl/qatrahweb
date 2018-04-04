import React, {Component} from 'react';
class RegistrationVerification extends Component {
  state = {isLoaded: null,email:""};

  render() {
    return (


      <div>
      <div className="columns medium-12">
      <div className="form-wrapper">
      <div className="card">
      <div className="card-inner">
      <div className="form-logo">
      <img src="public/images/logo.png" className="logo"/>
      <h3>Hi {this.state.email} </h3>
      <h4 className="sub-heading"> Your email is not verified,To resend the verification email, Click Resend next to the email address that you want to verify, and we will send an email to that address
      </h4>
      <h6> لم يتم التحقق من بريدك الإلكتروني ، لإعادة إرسال رسالة التحقق ، انقر فوق إعادة إرسال بجوار عنوان البريد الإلكتروني الذي تريد التحقق منه ، وسنرسل رسالة بريد إلكتروني إلى هذا العنوان
      </h6>
      <div className="congo m-tb30"><img src="public/images/congratulations.png"/></div>
      <div className="form-group">
      <a href="index" className="btn-blue-block">Resend Verification Link</a>
      </div>
      <div className="form-group">
      <a href="index" className="btn-blue-block">Cancel</a>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }

}


export default RegistrationVerification;
