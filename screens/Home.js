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
  componentDidMount = () => {
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
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={styles.Icon}>
            <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("places", { data: this.state.places })} activeOpacity={0.5}>
              <Image
                source={require('./images/Home/Places.png')}
                style={{ width: 60, height: 60, resizeMode: 'cover', alignSelf: "center", justifyContent: 'center', marginTop: 10, position: 'relative' }} />
              <Text style={styles.btnTxt}> Places </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Icon}>
            <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("food")} activeOpacity={0.5}>
              <Image
                source={require('./images/Home/Food.png')}
                style={{ width: 60, height: 60, resizeMode: 'cover', alignSelf: "center", justifyContent: 'center', marginTop: 10, position: 'relative' }} />
              <Text style={styles.btnTxt}>Cuisines</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={styles.Icon}>
            <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("hotel")} activeOpacity={0.5}>
              <Image
                source={require('./images/Home/lodging.png')}
                style={{ width: 60, height: 60, resizeMode: 'cover', alignSelf: "center", justifyContent: 'center', marginTop: 10, position: 'relative' }} />
              <Text style={styles.btnTxt}>Hotel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Icon}>
            <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("add")} activeOpacity={0.5}>
              <Image
                source={require('./images/Home/SuggestFood.png')}
                style={{ width: 60, height: 60, resizeMode: 'cover', alignSelf: "center", justifyContent: 'center', marginTop: 10, position: 'relative' }} />
              <Text style={styles.btnTxt}>Add Food</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.TextOther}>Other Services</Text>
        </View>
        <View style={{ flexDirection: "row",flex:1 }}>
          <View style={styles.Icon}>
            <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("Assist", { lat: this.state.lat, lng: this.state.lng })} activeOpacity={0.5}>
              <Image
                source={require('./images/Home/RoadAssist.png')}
                style={{ width: 60, height: 60, resizeMode: 'cover', alignSelf: "center", justifyContent: 'center', marginTop: 10, position: 'relative' }} />
              <Text style={styles.btnTxt} > Road Assist </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Icon}>
            <TouchableOpacity style={styles.signButton} activeOpacity={0.5} onPress={() => this.props.navigation.navigate("rent")}>
              <View style={{ flex: 2 }}>
                <Image
                  source={require('./images/Home/Rental.png')}
                  style={{ width: 60, height: 60, resizeMode: 'cover', alignSelf: "center", justifyContent: 'center', marginTop: 10, position: 'relative' }} />
                <Text style={styles.btnTxt}>Rental</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#f5f5f5"
  },
  SquareShapeView: {
    marginHorizontal: 0,
    height: 100,
    paddingHorizontal: 10,
    backgroundColor: '#0176FB',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  btnTxt: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#BDC7D4',
    width: '100%',
    height: 40,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingTop: 7
  },
  signButton: {
    marginLeft: 10,
    borderRadius: 15,
    width: 120,
    height: 120,
    shadowOpacity: 0.8,
    backgroundColor: '#FFFFFF',
    elevation: 6
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
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom:10
  },
  Text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    paddingLeft: 10,
    marginRight: 0,
    color: '#314256',
    marginHorizontal: 0,
    marginTop: 10,
  },
  TextOther: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    paddingLeft: 10,
    marginRight: 0,
    color: '#314256',
    marginTop:-10
  },
  Icon: {
    flex: 1,
    height: 100,
    width: 110,
    margin: 20,
    borderRadius: 15
  },
});