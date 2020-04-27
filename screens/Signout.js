/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import AuthNavigator from '../Navigator/Auth'
import firebase, { auth } from "firebase";
import config from '../config/firebase';
class Signout extends Component {
    constructor(){
        super()
        firebase.auth().signOut() 
    }
    render() {
        return (
         <AuthNavigator />
        );
    }
}
export default Signout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});