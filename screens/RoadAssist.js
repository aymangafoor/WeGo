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
  FlatList,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
//const origin = {latitude:this.state.lat , longitude: this.state.lng};
//const destination = {latitude: 11.120298, longitude: 76.119965};
import Geolocation from '@react-native-community/geolocation';
const GOOGLE_MAPS_APIKEY = 'AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90';
export default class RoadAssist extends Component {
  constructor(props) {
    super(props)
    Geolocation.watchPosition(
      info => {
        console.log(info);
        this.setState({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        })
      });
    this.state = {
      search: '',
      dist: null,
      time: null,
      gasedata: [],
      locate: null,
      longate: null,
      latserv: null,
      lngserv: null,
      lat: null,
      lng: null,
    }
  }
 UNSAFE_componentWillMount() {
    this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({
          locate: this.props.navigation.getParam('latserv', []),
          longate: this.props.navigation.getParam('lngserv', [])
        })
      }
    )
  }
  
  render() {
    if (!this.state.lat) return (
      <View>
        <ActivityIndicator size="large">
          </ActivityIndicator>
      </View>
    );

    else return (
      <KeyboardAvoidingView
      style={{flex:1}}
      behaviour='height'
      contentContainerStyle={{flex:1}}>
      <View style={styles.container}>

        <TouchableOpacity style={{ alignSelf: "flex-start", marginleft: 15, }} onPress={() => this.props.navigation.navigate('Home')}>
          <Image
            source={require('./images/back.png')}
            style={{ width: 21.96, height: 21 }} />
        </TouchableOpacity>
        <GooglePlacesAutocomplete
          placeholder='Enter Destination'
          fetchDetails={true}
          autoFocus={false}
          minLength={2}
          enablePoweredByContainer={false}
          listViewDisplayed='false'
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRadius: 30,
              marginLeft: 5,
              marginRight: 15,
              marginBottom: 5,
              alignSelf:'center',
              width:Dimensions.get("window").width * 0.97,
            },
            container:{
              flex:1,
              position:'absolute',
              marginTop:20

            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#86898E',
              fontSize: 16,
              backgroundColor: '#E1E6EC'
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView:{
              zIndex:1,
              backgroundColor: '#0176FB',
              borderColor:'black'
            }
          }}
          GooglePlacesDetailsQuery={{
            fields:['geometry']
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(geometry);
            this.setState({
              search:data.description
            })
   console.log(this.state.search);
   
          }}
          query={{
            key: 'AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90',
            language: 'en',
            components: 'country:in'
          }}
      
        />
        
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
          }}>
            
          {this.state.search != '' && (<MapViewDirections
            origin={{ latitude: this.state.lat, longitude: this.state.lng }}
            destination={this.state.search}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            precision={"high"}
            optimizeWaypoints={true}
            mode="DRIVING"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`),
                console.log(`Duration: ${result.duration} min.`)
                this.setState({
                dist: result.distance,
                time: result.duration
              })
            }}
            onError={(errorMessage) => {
              console.log(errorMessage);
            }} />)}
          {this.state.locate != null&& this.state.locate != null && (
            <MapViewDirections
              origin={{ latitude: this.state.lat, longitude: this.state.lng }}
              destination={{ latitude: this.state.locate, longitude: this.state.longate }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              optimizeWaypoints={true}
              mode="DRIVING"
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`),
                  console.log(`Duration: ${result.duration} min.`)
                  this.props.navigation.addListener(
                    'willFocus',
                    () => {
                this.setState({
                  dist: result.distance,
                  time: result.duration
                })})
              }}
              onError={(errorMessage) => {
                console.log(errorMessage);
              }} />)}
        </MapView>
        <View style={{ flexDirection: 'row', marginLeft: 1, flex: 1, marginRight: 1, alignSelf: 'center', marginTop: 655,flex:1,position:'absolute'}}>
          <TouchableOpacity style={styles.serviceicon} onPress={() => this.props.navigation.navigate("gas", { lat: this.state.lat, lng: this.state.lng })} activeOpacity={0.5}>
            <Image
              style={{ width: 15, height: 15 }}
              source={{ uri: "https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png" }} />
            <Text style={styles.btnTxt} >Petrol</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceicon} onPress={() => this.props.navigation.navigate("restaurant", { lat: this.state.lat, lng: this.state.lng })} activeOpacity={0.5}>
            <Image
              style={{ width: 15, height: 15 }}
              source={{ uri: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png" }} />
            <Text style={styles.btnTxt} >Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceicon} onPress={() => this.props.navigation.navigate("hospital", { lat: this.state.lat, lng: this.state.lng })} activeOpacity={0.5}>
            <Image
              style={{ width: 15, height: 15 }}
              source={{ uri: "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png" }} />
            <Text style={styles.btnTxt} >Hospital</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceicon} onPress={() => this.props.navigation.navigate("atm", { lat: this.state.lat, lng: this.state.lng })} activeOpacity={0.5}>
            <Image
              style={{ width: 15, height: 15 }}
              source={{ uri: "https://maps.gstatic.com/mapfiles/place_api/icons/atm-71.png" }} />
            <Text style={styles.btnTxt} >ATM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceicon} onPress={() => this.props.navigation.navigate("carRepair", { lat: this.state.lat, lng: this.state.lng })} activeOpacity={0.5}>
            <Image
              style={{ width: 15, height: 15 }}
              source={{ uri: "https://maps.gstatic.com/mapfiles/place_api/icons/car_repair-71.png" }} />
            <Text style={styles.btnTxt} >Car Repair</Text>
          </TouchableOpacity>

        </View>
        <Text style={{ fontFamily: 'Montserrat-Bold', marginLeft: 15, }}>Distance:{this.state.dist}km</Text>
        <Text style={{ fontFamily: 'Montserrat-Bold', marginLeft: 15, marginBottom: 5 }}>Time:{this.state.time}min</Text>
             </View>
             </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0176FB',
  },
  map: {
    height: '83%',
    marginTop:55,
    marginBottom: 5,
    position:'relative'
  },
  serviceicon:{
    flexDirection: "row",
    backgroundColor: 'grey',
    borderRadius: 5,
    marginLeft: 5,
    height: 20
  },
  signButton: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 0,
    width: 10,
    backgroundColor: 'grey',
    borderRadius: 5,

  },
  bodyTxt: {
    fontFamily: 'Montserrat-Regular',
    flexDirection:"row",
    fontSize: 14,
    color: 'black',
    marginTop: 58,
    marginBottom: 0,
    marginRight: 15,
    marginLeft: 5,
    alignSelf: 'center',
  },

});