import firebase from "firebase";
const config = {
    apiKey: "AIzaSyCxkdtZXgZABTCisUrSZGlkxtcHeYFi2kU",
    authDomain: "wego-cc67c.firebaseapp.com",
    databaseURL: "https://wego-cc67c.firebaseio.com",
    projectId: "wego-cc67c",
    storageBucket: "wego-cc67c.appspot.com",
    messagingSenderId: "153058417514",
    appId: "1:153058417514:web:5db19b0a3db13248ea6313",
    measurementId: "G-KBMCEJ2VC6"
};
const fire = firebase.initializeApp(config);
export default fire;
