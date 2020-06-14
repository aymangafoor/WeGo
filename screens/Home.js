/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
  YellowBox
} from "react-native";

// import cio from 'cheerio-without-node-native';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import { Drawer } from "react-native-router-flux";
import Login from "./LoginScreen";
import Assist from "./RoadAssist";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
console.disableYellowBox = true;
class Home extends Component {
  state = {
    lat: null,
    lng: null,
    place: null,
    dist: null,
    image: '',
    count: 0,
    htmlcode: null,
    places: [],
    responseCode: null,
    name: null,
    userData: [],
    emailid: firebase.auth().currentUser.email,
  }
  getData() {
    // const $ = require('react-native-cheerio');
    Geocoder.init("AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90", { language: "en" });
    Geocoder.from(this.state.lat, this.state.lng).then(
      json => {

        var addressComponent = json.results[0].address_components[1];

        //console.log(addressComponent);
        console.log("check", json.results[0].address_components)
        this.setState({
          place: addressComponent.long_name,
          dist: json.results[0]
        })

      }).catch(error => console.warn(error)
      );
    error => {
      alert(error);
    }

  }
  constructor() {
    YellowBox.ignoreWarnings(['Require cycle', 'Setting a timer', 'source.uri', '[TypeError:', 'MapViewDirections Error', 'Failed']);
    super()

    Geolocation.getCurrentPosition(
      info => {
        this.setState({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        })
        this.getData()
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: false, distanceFilter: 2000 }
    );
  }
  setpoint = async () => {
    var no = this.state.userData.point
    var point = no.toString()
    try {
      await AsyncStorage.setItem('point', point)
    } catch (error) {
      console.log(error);

    }
  }

  getUser = () => {
    fetch('https://wego-275411.firebaseio.com/users.json')
      .then((res) => res.json())
      .then((usernm) => {
        for (const key in usernm) {
          const st1 = usernm[key].email
          const st2 = st1.toLowerCase();
          //console.log(st2, '-', this.state.emailid)
          if (st2 == this.state.emailid) {
            this.setState({
              userData: usernm[key]
            }, () => { this.setpoint(); })
            if (this.state.userData != [])
              break;
          }

        }

      })
  }
  componentDidMount=()=>{
    this.setState({
      name: firebase.auth().currentUser.displayName,
      image: firebase.auth().currentUser.photoURL
    })
  }
  render() {
    this.getUser();
    return (

      <SafeAreaView style={styles.container}>
        <View style={styles.SquareShapeView} >

          <TouchableOpacity style={{ alignSelf: "flex-start", marginleft: 15, marginTop: 10 }} onPress={this.props.navigation.openDrawer}>
            <Image
              source={require('./images/drawer.png')}
              style={{ width: 36.5, height: 19.13 }} />
          </TouchableOpacity >
          {this.state.image != '' && (<Image
            source={{ uri: this.state.image }}
            //source={require('./images/user.png')}
            style={{ width: 42, height: 42, borderRadius: 42, alignSelf: "flex-end", marginTop: -20 }} />)}
          <View>
            <Text style={{ color: 'white' }}>{this.state.place}</Text>
          </View>
        </View>

        <Text style={styles.Text}>Nearby Services</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("places", { data: this.state.places })} activeOpacity={0.5}>
            <Text style={styles.btnTxt}> Places </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("food")} activeOpacity={0.5}>
            <Text style={styles.btnTxt}>Food to Explore</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("add")} activeOpacity={0.5}>
          <Text style={styles.btnTxt}>Add Food</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.Text}>Other Sevices</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("Assist", { lat: this.state.lat, lng: this.state.lng })} activeOpacity={0.5}>
            <Text style={styles.btnTxt} > Road Assistance </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signButton} activeOpacity={0.5} onPress={() => this.props.navigation.navigate("rent")}>
            <Text style={styles.btnTxt}>Rental</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.footerTxt}>WeGo</Text>
        </View>
      </SafeAreaView>
    );

  }
  signout = () => {
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
    paddingHorizontal: 10,
    backgroundColor: '#0176FB',
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
    marginRight: 0,
    marginLeft: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
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
  },

});