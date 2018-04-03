import ReactDOM from 'react-dom';
import RouterComponent from './config/router';
import React, {Component} from 'react';
import firebase from 'firebase';
import  {Provider} from 'react-redux';
import  {createStore,applyMiddleware} from 'redux';
import  ReduxThunk from 'redux-thunk';
import  reducers from './reducers';
let     store = createStore(reducers,{},applyMiddleware(ReduxThunk));


class App extends Component {

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
    }

    render() {
        return (
            <Provider store={store}  >
                <div >
                    <RouterComponent/>
                </div>
            </Provider>
        )
    };
};

ReactDOM.render(<App/>, document.querySelector('#wrapper'));