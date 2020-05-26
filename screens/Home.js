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
  UNSAFE_componentWillMount() {
    //let image =this.props.navigation.getParam('image',[])
    this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({
          image: this.props.navigation.getParam('image', [])
        })
      })
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
        this.loadGraphicCards()

      }).catch(error => console.warn(error)
      );
    error => {
      alert(error);
    }

  }
  place_check = () => {
    if (this.state.responseCode == 404) {

      if (this.state.count == 0) {
        this.loadGraphicCards(this.state.dist.address_components[3].long_name)
        this.setState({ count: 1 })
        return
      }
      else if (this.state.count == 1) {
        this.loadGraphicCards(this.state.dist.address_components[0].long_name)
        this.setState({ count: 2 })
        return
      }
      else if (this.state.count == 2) {
        this.loadGraphicCards(this.state.dist.address_components[1].long_name)
        this.setState({ count: 3 })
        return
      }
      else if (this.state.count == 3) {
        this.loadGraphicCards(this.state.dist.address_components[4].long_name)
        this.setState({ count: 4 })
        return
      }
      else if (this.state.dist.address_components[3].short_name) {
        this.setState({ count: 5 })
        return
      }
    }
  }

  loadGraphicCards = (dis = this.state.dist.address_components[3].long_name) => {
    var quizUrl = `https://www.holidify.com/places/${dis}/sightseeing-and-things-to-do.html`;

    console.log(quizUrl)
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/html');
    var data = fetch(quizUrl, {
      mode: 'no-cors',
      method: 'get',
      headers: myHeaders
    }).then((response) => {
      if (response.status == 404) {
        this.setState({ responseCode: 404 })
        this.place_check()
        return
      } else {
        this.setState({ responseCode: response.status })
        console.log("new res", response.status)
        this.setState({ dist: dis })
      }
      response.text()
        .then(html => {
          this.setState({
            htmlcode: html
          })
          // console.log(code)

          this.extract()


          //  console.log(html)
        })

    })
    // console.log("code",this.state.responseCode)
    // if(this.state.responseCode==404){
    //   console.log("code",this.state.responseCode)
    //  }


  }


  extract = () => {
    // Alert.alert("ok")
    //  console.log(this.state.htmlcode)

    const cheerio = require('react-native-cheerio')
    const $ = cheerio.load(this.state.htmlcode)
    // console.log($('#attractionList').html())
    $('#attractionList').html()
    //  console.log($('div',$('#attractionList').html()).html())
    //console.log($('div',$('#attractionList').html()).html())
    //console.log($('.content-card',$('#attractionList'))[0])
    data = $('div', $('.content-card', $('#attractionList'))).html()
    // console.log($('div',$('.content-card',$('#attractionList'))))

    // console.log($(data).html())
    // console.log($('h3',dataurl).text()) //place name
    // console.log($('img',dataurl).data().original) // image url
    // console.log($('.card-text',dataurl).text()) // description
    data = []

    let limit = $('.content-card', $('#attractionList')).length
    // console.log(limit)
    for (let i = 0; i < limit; i++) {
      // console.log(i)
      let dataurl = $('.content-card', $('#attractionList'))[i]
      temp = {}
      temp["place_name"] = $('h3', dataurl).text()
      temp["image_url"] = $('img', dataurl).data().original
      temp["desc"] = $('.card-text', dataurl).text()
      temp["view_more"] = $('a', $(dataurl).html())[0].attribs.href

      data.push(temp)

      //console.log("near:",this.state.dist)


    }
    //console.log(data)


    this.setState({
      places: data
    })
  }
  constructor() {
    YellowBox.ignoreWarnings(['Require cycle', 'Setting a timer']);
    super()

    Geolocation.watchPosition(
      info => {
        this.setState({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        })
        this.getData()
      });
  }
  setname = async () => {
    try {
      await AsyncStorage.setItem('name', this.state.userData.name)
    } catch (error) {
      console.log(error);

    }
  }

  getUser = () => {
    fetch('https://wego-275411.firebaseio.com/users.json')
      .then((res) => res.json())
      .then((usernm) => {
        console.log('hi', usernm);
        for (const key in usernm) {
          const st1 = usernm[key].email
          const st2 = st1.toLowerCase();
          console.log(typeof usernm[key].email, '$', typeof this.state.emailid);
          console.log(st2, '-', this.state.emailid)
          if (st2 == this.state.emailid) {
            this.setState({
              userData: usernm[key]
            })

            //this.setState({name:user.name})
            console.log(this.state.userData);
          }
          if (this.state.userData.name != null)
            break;
        }

      })
  }
  getimage = async () => {
    try {
      this.state.image = await AsyncStorage.getItem('image')
    } catch (error) {
      console.log(error);

    }
  }
  render() {
    this.getUser();
    this.getimage();
    this.setname();
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
        <Text></Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("Near_Place", { data: this.state.places })} activeOpacity={0.5}>
            <Text style={styles.btnTxt}> Places </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("food")} activeOpacity={0.5}>
            <Text style={styles.btnTxt}>Food to Explore</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signButton} activeOpacity={0.5}>
          <Text style={styles.btnTxt}>Hotels</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.Text}>Other Sevices</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.signButton} onPress={() => this.props.navigation.navigate("Assist", { lat: this.state.lat, lng: this.state.lng })} activeOpacity={0.5}>
            <Text style={styles.btnTxt} > Road Assistance </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signButton} activeOpacity={0.5} >
            <Text style={styles.btnTxt}>Rental</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.texttap}>Tap on any services or search destinations</Text>
          <TextInput
            placeholderTextColor={'#797C80'}
            placeholder={'Search destinations'}
            style={styles.emailField}
          />
        </View>

        <Text style={styles.footerTxt}>WeGo</Text>
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