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
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { createNoSubstitutionTemplateLiteral } from "typescript";
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
            //gas_stations:[]
        }
    }
    state={
        lat:null,
        lng:null,
        dist:null,
        time:null
    }
    componentWillMount(){
        let lat =this.props.navigation.getParam('lat',[])
        let lng =this.props.navigation.getParam('lng',[])
this.setState({
        lat,
        lng,
    })
    }
    componentDidMount = () => {
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+this.state.lat+','+this.state.lng+'&radius=5000&type=gas_station&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90', {
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson.results[1]);
           this.setState({
              data: responseJson
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }
render(){
    var dist=null;
    var time=null;
    return(
        <View style={styles.container}>
            <TouchableOpacity style={{alignSelf: "flex-start", marginleft: 15,}} onPress={()=>this.props.navigation.navigate('Home')}>
                  <Image 
                  source={require('./images/back.png')}
                  style={{ width: 21.96, height: 21}} />
                  </TouchableOpacity>
<TextInput onChangeText={(search) => this.setState({search})}
placeholder={'Enter Destination'}/>
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
     </MapView>
     <Text>Distance:{this.state.dist}km</Text>
        <Text>Time:{this.state.time}min</Text>
     </View>
    );
};

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       // alignItems: 'center',
        //justifyContent: 'center'
    },
    map:{
    height:'80%',
        marginBottom: 5
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
          
});