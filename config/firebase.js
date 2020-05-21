import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/storage';
const config = {
    apiKey: "AIzaSyCWeDRjEg5auU_XC6kgNjaCJho0EHSx_uY",
    authDomain: "wego-275411.firebaseapp.com",
    databaseURL: "https://wego-275411.firebaseio.com",
    projectId: "wego-275411",
    storageBucket: "wego-275411.appspot.com",
    messagingSenderId: "874988712722",
    appId: "1:874988712722:web:e4ba2fc66f8ddf1cfd79cb",
    measurementId: "G-949YWM9S43"
  };
  const app = firebase.initializeApp(config);
  export const db = app.database();