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
    Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { createNoSubstitutionTemplateLiteral } from "typescript";
//import { FlatList } from "react-native-gesture-handler";
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
            data:[]
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
        let locate =this.props.navigation.getParam('name',[])
this.setState({
        lat,
        lng,
        locate
    })
    }
  render(){
    var dist=null;
    var time=null;
   if(this.state.lat) return(
        <View style={styles.container}>
            <TouchableOpacity style={{alignSelf: "flex-start", marginleft: 15,}} onPress={()=>this.props.navigation.navigate('Home')}>
                  <Image 
                  source={require('./images/back.png')}
                  style={{ width: 21.96, height: 21}} />
                  </TouchableOpacity>
   <Text style={{color:'black'}}>hi</Text>
<TextInput style={styles.emailField} onChangeText={(search) => this.setState({search})}
placeholder={'Enter Destination'}/>
<View style={{flexDirection:'row',marginLeft:1}}>
    <TouchableOpacity style={styles.signButton} onPress={()=>this.props.navigation.navigate("gas",{lat:this.state.lat,lng:this.state.lng})} activeOpacity={0.5}>
<Image
            style={{width:15,height:15}}
            source={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png"}}/>
                 <Text style={styles.btnTxt} >Petrol</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.signButton} onPress={()=>this.props.navigation.navigate("restaurant",{lat:this.state.lat,lng:this.state.lng})} activeOpacity={0.5}>
<Image
            style={{width:15,height:15}}
            source={{uri:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"}}/>
                 <Text style={styles.btnTxt} >Restaurant</Text>
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
          <MapViewDirections
         origin={{latitude:this.state.lat , longitude: this.state.lng}}
         destination={this.state.latserv}
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
     </MapView>
     <Text style={{fontFamily: 'Montserrat-Bold'}}>Distance:{this.state.dist}km</Text>
        <Text style={{fontFamily: 'Montserrat-Bold'}}>Time:{this.state.time}min</Text>
     </View>
    );

else return(
<View style={styles.container}>
<MapView
    style={styles.maps}
    showsUserLocation
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
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
    height:'74%',
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
         width:Dimensions.get('screen').width*0.11,
         backgroundColor:'grey',
         borderRadius:5
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