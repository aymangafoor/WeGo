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
    SafeAreaView,
    Alert,
    TouchableWithoutFeedback,
    TouchableHighlight
} from "react-native";
// import cio from 'cheerio-without-node-native';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import { Drawer } from "react-native-router-flux";
import { readBuilderProgram } from "typescript";
import Login from "./LoginScreen";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { ScrollView } from "react-native-gesture-handler";
class NearPlace extends Component {
 state ={
     data:[]
 }
  UNSAFE_componentWillMount(){
    let arr =this.props.navigation.getParam('data',[])
    this.setState({
        data:arr
    })
    //console.log("sdsdsds",arr[0].image_url)
    
  }

  renderdata = ()=>{
    return this.props.navigation.getParam('data',[]).map((data)=>{
        return(
            <View style={{height:160,width:160,marginTop:20,marginLeft:20,borderWidth:0.5,borderColor:"#dddddd"}}>
              <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={{flex:2}}  onPress={()=>this.props.navigation.navigate("SignlePlace",{link:data.view_more})}>
                <View style={{flex:2}}>
                <View style={{flex:2}}>
                <Image style={{flex:1,
                    width:null,
                    height:null,
                    resizeMode:"cover"}} source={{uri: data.image_url}}/>
                </View>
                <View style={{flex:1,alignItems:"center",paddingTop:20}}>
                <Text>{data.place_name}</Text>
                </View>
                </View>
              </TouchableHighlight>
            </View>
          )
    })

    
  }
  
     render() {
        return (
            
          <SafeAreaView style={styles.container}>
              <View style={{alignItems:"center"}}>
                <TextInput
                placeholderTextColor={'#797C80'}
                placeholder={'Search destinations'}
                style={styles.emailField}
          />
          </View>
            {/* <TouchableOpacity onPress={()=>{this.getData()}}>
              <Text>Address</Text>
            </TouchableOpacity> */}
                 
             
                <Text style={styles.Text}>Nearby Places</Text>
                <ScrollView 
                horizontal={true}
                >
                {this.renderdata()}

                
               
                </ScrollView>
                
                 <View>
                <Text style={styles.Text}>Other Sevices</Text>
                </View>
                <View style={{flex:10,flexDirection: "row"}}>
                <TouchableOpacity style={styles.signButton} activeOpacity={0.5}>
                 <Text style={styles.btnTxt}> Road Assistance </Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.signButton} activeOpacity={0.5}>
                 <Text style={styles.btnTxt}>Rental</Text>
                 </TouchableOpacity>
                </View>
                
        
        <Text style={styles.footerTxt}>WeGo</Text>
       </SafeAreaView>
        );
        
    }
    signout=() =>{
      firebase.auth().signOut() 
      this.props.navigation.navigate('Login') 
      }
}
export default NearPlace;


const styles = StyleSheet.create({
    container: {
        flex: 1,
       // alignItems: 'center',
        //justifyContent: 'center'
    },
    SquareShapeView: {
       marginHorizontal: 0,
      height: 100,
      paddingHorizontal:10,
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
        color: '#86898E',
        width: 330,
        height: 50,
        backgroundColor: '#E1E6EC',
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
       // alignSelf: 'center',
        marginTop: 10,
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
        marginLeft: 10,
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