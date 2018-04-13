import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Prompt,Redirect } from "react-router-dom";
import firebase from 'firebase';

class Logout extends Component {
    state = {isLoaggedOut:false};
    constructor(props) {
        super(props)
    }

  
    componentWillMount(){
    
    }

    render() {
        if(this.state.isLoaggedOut == true){

        }
        else{
            return (
                <a onClick={()=>{
                  this.doSignOut()
                }}  ><i className="fa fa-sign-out" ></i>Logout</a>      
              )
        }
      
    }
}

export default Logout;
