// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
  var config = {
    apiKey: "AIzaSyCf8FWItY_h43oS9KfJdvcDrvULZ3xLx0E",
    authDomain: "waterleveldetector-db2b3.firebaseapp.com",
    databaseURL: "https://waterleveldetector-db2b3.firebaseio.com",
    projectId: "waterleveldetector-db2b3",
    storageBucket: "waterleveldetector-db2b3.appspot.com",
    messagingSenderId: "978606290204"
  };
  firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
 messaging.onMessage(function(payload){
   console.log(payload);
 })