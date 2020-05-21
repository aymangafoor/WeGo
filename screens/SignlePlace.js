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
    TouchableHighlight,
    Dimensions
} from "react-native";
// import cio from 'cheerio-without-node-native';
const width = Dimensions.get('window').width

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
     link:null,
     htmlcode:null,
     place_name:null,
     desc:null,
     img_url:null
 }
  componentWillMount(){
    let linkdata =this.props.navigation.getParam('link')
    this.setState({
        link:linkdata
    })
    this.fetchfromweb(linkdata)
    
  }

  fetchfromweb = (data)=>{
    let url = data;
    console.log(url)
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/html');
    var data = fetch(url,{
    mode: 'no-cors',
    method: 'get',
    headers: myHeaders
}).then((response)=> {
    response.text()
    .then(html=>{
    this.setState({
      htmlcode:html
    })
    this.extract()
    // console.log(html)
})  

})

  }
extract =()=>{
    const cheerio = require('react-native-cheerio')
    const $ = cheerio.load(this.state.htmlcode)
    let img_url_t = (($('.atf-cover-image')[0].attribs.style).slice(22,-3))
    // console.log(JSON.stringify($('.atf-cover-image')[0].attribs.style).slice(23,-4))
    this.setState({place_name:$('.heading1').text()})
    this.setState({desc:$('.readMoreText').text()})
    this.setState({img_url:img_url_t})
}
image_render = ()=>{
    // console.log("new",this.state.img_url)
    return(
        <ScrollView 
                horizontal={true}
                >
                <View style={{height:300,width:width,marginTop:20}}>
                <View style={{flex:10}}>
               {this.state.img_url !=null ?(
               
                <Image style={{flex:1,
                    width:null,
                    height:null,
                    resizeMode:"cover"}} source={{uri:this.state.img_url}}/>
                    
               ):console.log(this.state.img_url)}
                </View>
                <View style={{flex:1,alignItems:"center",paddingTop:20}}>
                </View>
                </View>
        </ScrollView>
    )
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
                
                <View style={{alignItems:"center"}}>
                <Text style={[styles.Text,{paddingBottom:10}]}>{this.state.place_name}</Text>
                </View>
                 <ScrollView >
                {this.image_render()}
                
                <View style={{paddingHorizontal:10}}>
                <Text style={{fontSize: 16}}>{this.state.desc}</Text>
                </View>

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
        </ScrollView>
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
        marginTop: 10,
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