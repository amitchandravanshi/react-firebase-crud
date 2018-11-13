import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyAlF5YRDsyjtlb2gpM6q9oN1hDZyXSZZpE",
    authDomain: "react-firebase-crud-b479b.firebaseapp.com",
    databaseURL: "https://react-firebase-crud-b479b.firebaseio.com",
    projectId: "react-firebase-crud-b479b",
    storageBucket: "react-firebase-crud-b479b.appspot.com",
    messagingSenderId: "381004945713"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 