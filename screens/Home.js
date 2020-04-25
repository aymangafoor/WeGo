/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import { Drawer } from "react-native-router-flux";
import { readBuilderProgram } from "typescript";
import Login from "./LoginScreen";

class Home extends Component {
    
    render() {
        return (
            
          <View style={styles.container}>
                 <View style={styles.SquareShapeView} >
              
                <TouchableOpacity style={{alignSelf: "flex-start", marginleft: 15,}} onPress={this.props.navigation.openDrawer}>
                <Image 
                source={require('./images/drawer.png')}
                style={{ width: 30, alignSelf: "flex-start", height: 25}} />
             </TouchableOpacity>
             <Image 
                source={require('./images/user.png')}
                style={{ width: 30, height: 30, alignSelf: "flex-end", marginVertical: 0}} />
             </View>
             
                <Text style={styles.Text}>Nearby Services</Text>
                <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.signButton} activeOpacity={0.5}>
                 <Text style={styles.btnTxt}> Places </Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.signButton} activeOpacity={0.5}>
                 <Text style={styles.btnTxt}>Gase Stations</Text>
                 </TouchableOpacity>
                 </View>
                 <TouchableOpacity style={styles.signButton}  activeOpacity={0.5}>
                 <Text style={styles.btnTxt}>Hotels</Text>
                 </TouchableOpacity>
                 <View>
                <Text style={styles.Text}>Other Sevices</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.signButton} activeOpacity={0.5}>
                 <Text style={styles.btnTxt}> Road Assistance </Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.signButton} activeOpacity={0.5}>
                 <Text style={styles.btnTxt}>Rental</Text>
                 </TouchableOpacity>
                </View>
                <Text style={styles.texttap}>Tap on any services or search destinations</Text>
                <TextInput
            placeholderTextColor={'#BDC7D4'}
            placeholder={'Search destinations'}
            style={styles.emailField}
          />
                <Button style={styles.btnTxt}
        title="Sign out"
        onPress={this.signout} 
        />
        
        <Text style={styles.textProp}>WeGo</Text>
       </View>
        );
        
    }
    signout=() =>{
      firebase.auth().signOut() 
      this.props.navigation.navigate('Login') 
      }
}
export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
       // alignItems: 'center',
        //justifyContent: 'center'
    },
    SquareShapeView: {
       marginHorizontal: 0,
      height: 100,
      backgroundColor: '#0000ff',
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
    },
   textProp: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 38,
        color: '#ffffff',
        marginTop: 32,
        marginBottom: 0,
        marginRight: 0,
        marginLeft: 37,
        alignSelf: 'flex-start',
      },
      emailField: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14,
        color: '#314256',
        width: 330,
        height: 50,
        backgroundColor: '#314256',
        borderRadius: 30,
        paddingLeft: 22,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
      },
      pwdField: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14,
        color: '#BDC7D4',
        width: 286,
        height: 60,
        backgroundColor: '#314256',
        borderRadius: 30,
        paddingLeft: 22,
        marginTop: 36,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      },
      btnTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        textAlign: 'center',
        color: '#000000',
        backgroundColor: '#BDC7D4',
        padding: 0,
        alignContent: 'space-between',
        marginHorizontal: 5,
        marginBottom: 0.5,
        marginTop: 0,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        left: 0,
        bottom: 0,
        width: 138,
        height: 52,
      },
      signButton: {
        alignSelf: 'center',
        marginTop: 4,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      },
      bodyTxt: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: '#ffffff',
        marginTop: 58,
        marginBottom: 0,
        marginRight: 0,
        marginLeft: 0,
        alignSelf: 'center',
      },
      signUpTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: '#0176FB',
        alignSelf: 'center',
      },
      footerTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        alignSelf: 'center',
        color: '#314256',
        marginTop: 90,
        marginBottom: 16,
        marginRight: 0,
        marginLeft: 0,
      },
      Text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginLeft: 0,
        marginRight: 0,
        color: '#314256',
        marginHorizontal: 0,
        marginTop: 40,
    },
    texttap: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginLeft: 0,
        marginRight: 0,
        color: '#314256',
        marginHorizontal: 0,
        marginTop: 60,  
    }
          
          
    });