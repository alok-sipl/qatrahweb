import ReactDOM from 'react-dom';
import RouterComponent from './config/router';
import React, {Component} from 'react';
import firebase from 'firebase';
import  {Provider} from 'react-redux';
import  {createStore,applyMiddleware} from 'redux';
import  ReduxThunk from 'redux-thunk';
import  reducers from './reducers';
let     store = createStore(reducers,{},applyMiddleware(ReduxThunk));
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import ReduxToastr from 'react-redux-toastr'






class App extends Component {
    
state ={isLoaggedOut:false}
    componentWillMount()
    {
        const config = {
            apiKey: "AIzaSyCf8FWItY_h43oS9KfJdvcDrvULZ3xLx0E",
           authDomain: "waterleveldetector-db2b3.firebaseapp.com",
           databaseURL: "https://waterleveldetector-db2b3.firebaseio.com",
           projectId: "waterleveldetector-db2b3",
           storageBucket: "waterleveldetector-db2b3.appspot.com",
           messagingSenderId: "978606290204"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const messaging = firebase.messaging();
         messaging.requestPermission().then(function() {
  console.log('Notification permission granted.');
  return messaging.getToken();

}).then(function(token){
console.log(token);

})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

    }



  

    render() {
        return (
            <Provider store={store}  >
                <div style={{overflow:'hidden'}} >
                      <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar/>
                    <RouterComponent/>

                </div>
            </Provider>
        )
    };
};

ReactDOM.render(<App/>, document.querySelector('#wrapper'));