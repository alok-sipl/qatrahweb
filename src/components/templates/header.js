import React, {Component} from 'react';
import ReactDrawer from 'react-drawer';
import LeftNavigation from './left_navigation';
import { BrowserRouter as Router, Route, Link ,Redirect,NavLink} from "react-router-dom";
import firebase from 'firebase';
import Logout from './logout';





class Header extends Component {

    state = {
        open: false,
        position: 'left',
        noOverlay: true,
        isLoading: true,
        name:"",
        photo:"",
        isLoaggedOut:false,
      };
    constructor() {
        super();
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setNoOverlay = this.setNoOverlay.bind(this);
      }


      doSignOut = () => {

         let  confirmLogout = confirm("Are you sure, you want to logout?");
           if (confirmLogout == true) {
             firebase.auth().signOut().then(function() {
            this.setState({isLoaggedOut:true});
            }, function(error) {

            });
       }


    }

        /*
  @Method : componentWillMount
  @Desc   : will check that user is logged in or not
  @Params :
  @Returns : *
  */
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>
    {
      this.setState({isLoading:false})
      if(user)
      {
        if(user.emailVerified)
        {
            this.setState({name:firebase.auth().currentUser.displayName});
            this.setState({photo:firebase.auth().currentUser.photoURL})

        }
        else{
            this.setState({isLoaggedOut:true});
        }
      }
      else{
        this.setState({isLoaggedOut:true});


      }
    });

  }

          /*
  @Method : renderDrawerItems
  @Desc   : will check that user is logged in or not
  @Params :
  @Returns : *
  */
  renderDrawerItems(){

    return (
        <nav className="sidenav">
        <ul className="sidenav-list" >
                       <li className="user">
                       <a onClick={this.closeDrawer} >
                               <img src={this.state.photo}/>
                               <span className="user-name">{this.state.name}</span><span className="close-menu"><i className="fa fa-times" aria-hidden="true"></i></span>
                           </a>
                       </li>

                       <li className="list-item">
                             <NavLink activeStyle={styles.activeStyle} to="/Home"><i className="fa fa-home" aria-hidden="true"></i>Home</NavLink>
                       </li>
                       <li className="list-item">
                           <NavLink activeStyle={styles.activeStyle} to="/device"><i className="fa fa-list" aria-hidden="true"></i>Device Details</NavLink>
                       </li>
                       <li className="list-item">
                           <NavLink  activeStyle={styles.activeStyle} to="/alerts" ><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>Alerts</NavLink>
                       </li>
                       <li className="list-item">
                           <NavLink  activeStyle={styles.activeStyle} to="/history"><i className="fa fa-history" aria-hidden="true"></i>History</NavLink>
                       </li>

                       <li className="list-item">
                           <NavLink  activeStyle={styles.activeStyle} to="/notification-setting" ><i className="fa fa-bell" aria-hidden="true"></i>Notification Settings</NavLink>
                       </li>
                       <li className="list-item">
                           <NavLink activeStyle={styles.activeStyle} to="/profile" ><i className="fa fa-user" aria-hidden="true"></i>My Profile</NavLink>
                       </li>
                       <li className="list-item">
                           <NavLink  activeStyle={styles.activeStyle} to="/contact"><i  className="fa fa-phone" aria-hidden="true"></i>Contact Us</NavLink>
                       </li>
                       <li className="list-item">
                       <a onClick={()=>{
                  this.doSignOut() 
                }} ><i className="fa fa-sign-out" ></i>Logout</a>
                       </li>
                   </ul>
                   </nav>

    )
  }
      setPosition(e) {
        this.setState({position: e.target.value});
      }
      setNoOverlay(e) {
        this.setState({noOverlay: e.target.checked});
      }
      toggleDrawer() {
        this.setState({open: !this.state.open});
      }
      closeDrawer() {
        this.setState({open: false});
      }
      onDrawerClose() {
        this.setState({open: false});
      }
    render() {
        if(this.state.isLoaggedOut == true){
            return <Redirect to={"login"} />;

        }
        else if(this.state.isLoading == false )
        {
            return(
                <div  style={{overflow:'hidden'}}>
                    <div className="row">
                        <div className="medium-3 large-4 small-3 logo column">
                            <a href="/qatrah-web-html" title="Qatrah">
                                <img src="/public/images/logo-main.png"/>
                            </a>
                        </div>
                        <div className="medium-9 large-8 small-9 column text-right">
                            <a onClick={this.toggleDrawer} className="menu-icon"><span></span></a>
                        </div>
                    </div>
                    <ReactDrawer
              open={this.state.open}
              position={this.state.position}
              onClose={this.onDrawerClose}
              noOverlay={this.state.noOverlay}>  
                {this.renderDrawerItems()}
                   </ReactDrawer>
                </div>
            )
        }
        else{
            return (
                <div>
                    </div>
            )
        }
      
    }
}

const styles = {
activeStyle :
  {
    color: "#fff",
    backgroundColor: "#18aff5"

  }
}

export default Header;
