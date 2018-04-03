import * as firebase from 'firebase';

const prodConfig = {
    apiKey: 'AIzaSyCf8FWItY_h43oS9KfJdvcDrvULZ3xLx0E',
    authDomain: "waterleveldetector-db2b3.firebaseapp.com",
    databaseURL: "https://waterleveldetector-db2b3.firebaseio.com",
    projectId: "waterleveldetector-db2b3",
    storageBucket: '',
    //messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

const devConfig = {
    apiKey: 'AIzaSyCf8FWItY_h43oS9KfJdvcDrvULZ3xLx0E',
    authDomain: "waterleveldetector-db2b3.firebaseapp.com",
    databaseURL: "https://waterleveldetector-db2b3.firebaseio.com",
    projectId: "waterleveldetector-db2b3",
    storageBucket: '',
    //messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export {
    db,
    auth,
};