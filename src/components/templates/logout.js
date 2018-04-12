import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Prompt,Redirect } from "react-router-dom";
import firebase from 'firebase';

class Logout extends Component {
    state = {isLoaggedOut:false};
    constructor(props) {
        super(props)
        this.state.isLoaggedOut = false;
    }

    doSignOut = () => {
        firebase.auth().signOut().then(function() {
         
        }, function(error) {

      });
      

    }
    componentWillMount(){
    
    }

    render() {
        if(this.state.isLoaggedOut == true){

        }
        else{
            return (
                <Link to="" onClick={()=>{
                  this.doSignOut()
                }} href="" ><i className="fa fa-sign-out" ></i>Logout</Link>      
              )
        }
      
    }
}

export default Logout;
