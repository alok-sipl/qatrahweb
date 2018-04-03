import {db} from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const onceGetAlerts = () =>
    db.ref('alerts').once('value');

export const getAlerts = () => {
    var ref = db.ref("alerts/7SSfXCF8amWNdE8irlZdLt668yu2");
    ref.on("value", function (snapshot) {
        console.log('sipl',snapshot.val(), 'sipl');
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}