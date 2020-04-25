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
    SafeAreaView,
    TextInput,
    Image,
    Dimensions
} from "react-native";
//import { Content,List, Header, Body, Title,ListItem, Container,  Left, Right, Icon, Text, Badge} from "native-base";
//import {FontAwesomeS} from "@expo/vector-icons";
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import {createDrawerNavigator} from "react-navigation-drawer";
import Reward from "./RewardScreen";
import { Drawer } from "react-native-router-flux";
import { readBuilderProgram } from "typescript";
import Login from "./LoginScreen";
import SideBar from "./components/SideBar";

class Home extends Component {
    signout=() =>{
        firebase.auth().signOut() 
        this.props.navigation.navigate('Login') 
        }
    render() {
        return (
            <View style={styles.container}>
              <SafeAreaView styles={{flex: 1}}>
                <TouchableOpacity style={{alignItems: "flex-start", margin: 1,}} onPress={this.props.navigation.openDrawer}>
                <Image 
                source={require('./images/drawer.png')}
                style={{ width: 20, height: 25, margin: 1}} />
             </TouchableOpacity>
             <View styles={styles.Text}>{this.props.name}</View>
              </SafeAreaView>
              
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
       
            </View>
        );
              const DrawerNavigator = createDrawerNavigator({
          Reward: {
              screen: Reward,
              navigationOptions: {
                title: "Reward"
              }
          },
          Login: {
            screen: Login,
          
          }
              },
            contentComponent: props => <SideBar {...props} />
        
        )
        
    }
}
export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
       // alignItems: 'center',
        //justifyContent: 'center'
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