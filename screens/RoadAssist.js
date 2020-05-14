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
    ActivityIndicator
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { createNoSubstitutionTemplateLiteral } from "typescript";
import {NavigationEvents} from 'react-navigation'
//const origin = {latitude:this.state.lat , longitude: this.state.lng};
//const destination = {latitude: 11.120298, longitude: 76.119965};
const GOOGLE_MAPS_APIKEY = 'AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90';
export default class RoadAssist extends Component {
    constructor(){
        super()
        this.state = {
            search:'',
            dist:null,
            time:null,
            gasedata: [],
            locate:null,
            longate:null,
            //gas_stations:[]
        }
    }
    state={
        lat:null,
        lng:null,
        dist:null,
        time:null,
        latserv:null,
        lngserv:null,
    }
    UNSAFE_componentWillMount(){
        let lat =this.props.navigation.getParam('lat',[])
        let lng =this.props.navigation.getParam('lng',[])
        let locate =this.props.navigation.getParam('latserv',[])
        let longate =this.props.navigation.getParam('lngserv',[])

this.setState({
        lat,
        lng,
        locate,
        longate
    })
    }
  render(){
    var dist=null;
    var time=null;
   if(!this.state.lat) return(
        <View>
          <ActivityIndicator/>
        </View>
    );

else return(
<View style={styles.container}>
  <NavigationEvents
        onDidFocus={()=>this.setState({})}/>
            <TouchableOpacity style={{alignSelf: "flex-start", marginleft: 15,}} onPress={()=>this.props.navigation.navigate('Home')}>
                  <Image 
                  source={require('./images/back.png')}
                  style={{ width: 21.96, height: 21}} />
                  </TouchableOpacity>
  {/* <Text style={{color:'black'}}>hi{this.state.locate}</Text> */}
<TextInput style={styles.emailField} onChangeText={(search) => this.setState({search})}
placeholder={'Enter Destination'}/>
<View style={{flexDirection:'row',marginLeft:1,flex:1,marginRight:1,alignSelf:'center',width:'100%'}}>
    <TouchableOpacity style={{flexDirection: "row", backgroundColor:'grey',borderRadius:5,marginLeft: 5,height:20}} onPress={()=>this.props.navigation.navigate("gas",{lat:this.state.lat,lng:this.state.lng})} activeOpacity={0.5}>
<Image
            style={{width:15,height:15}}
            source={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png"}}/>
                 <Text style={styles.btnTxt} >Petrol</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{flexDirection: "row", backgroundColor:'grey',borderRadius:5,marginLeft: 5,height:20}} onPress={()=>this.props.navigation.navigate("restaurant",{lat:this.state.lat,lng:this.state.lng})} activeOpacity={0.5}>
<Image
            style={{width:15,height:15}}
            source={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"}}/>
                 <Text style={styles.btnTxt} >Restaurant</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{flexDirection: "row", backgroundColor:'grey',borderRadius:5,marginLeft: 5,height:20}} onPress={()=>this.props.navigation.navigate("hospital",{lat:this.state.lat,lng:this.state.lng})} activeOpacity={0.5}>
                 <Image
            style={{width:15,height:15}}
            source={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png"}}/>
                 <Text style={styles.btnTxt} >Hospital</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{flexDirection: "row", backgroundColor:'grey',borderRadius:5,marginLeft: 5,height:20}} onPress={()=>this.props.navigation.navigate("atm",{lat:this.state.lat,lng:this.state.lng})} activeOpacity={0.5}>
                 <Image
            style={{width:15,height:15}}
            source={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/atm-71.png"}}/>
                 <Text style={styles.btnTxt} >ATM</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{flexDirection: "row", backgroundColor:'grey',borderRadius:5,marginLeft: 5,height:20}} onPress={()=>this.props.navigation.navigate("carRepair",{lat:this.state.lat,lng:this.state.lng})} activeOpacity={0.5}>
                 <Image
            style={{width:15,height:15}}
            source={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/car_repair-71.png"}}/>
                 <Text style={styles.btnTxt} >Car Repair</Text>
                 </TouchableOpacity>

                 </View>
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
         <MapViewDirections
         origin={{latitude:this.state.lat , longitude: this.state.lng}}
         destination={this.state.search}
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
            this.setState({dist:result.distance,
                time:result.duration})
        }}
          onError={(errorMessage) => {
            console.log('GOT AN ERROR');
          }}/>
          {this.state.locate != null &&(
          <MapViewDirections
         origin={{latitude:this.state.lat , longitude: this.state.lng}}
         destination={{latitude:this.state.locate,longitude: this.state.longate}}
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
            this.setState({dist:result.distance,
                time:result.duration})
        }}
          onError={(errorMessage) => {
            console.log('GOT AN ERROR');
          }}/>)}
     </MapView>
     <Text style={{fontFamily: 'Montserrat-Bold',marginLeft:5}}>Distance:{this.state.dist}km</Text>
        <Text style={{fontFamily: 'Montserrat-Bold',marginLeft:5,marginBottom:5}}>Time:{this.state.time}min</Text>
     </View>
);
}}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#0176FB'
       // alignItems: 'center',
        //justifyContent: 'center'
    },
    map:{
    height:'78%',
        marginBottom: 5
    },
    maps:{
        height:'100%',
            marginBottom: 5
        },
    signButton: {
        // alignSelf: 'center',
        flexDirection: "row",
         marginTop: 10,
         marginLeft: 5,
         marginRight: 0,
         marginBottom: 0,
         width:10,
         backgroundColor:'grey',
         borderRadius:5
       },
       bodyTxt: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: '#ffffff',
        marginTop: 58,
        marginBottom: 0,
        marginRight: 15,
        marginLeft: 5,
        alignSelf: 'center',
      },
      emailField: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14,
        color: '#86898E',
        //width: 330,
        height: 50,
        backgroundColor: '#E1E6EC',
        borderRadius: 30,
        paddingLeft: 22,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
      },
          
});