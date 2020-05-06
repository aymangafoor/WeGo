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
import MapView, { PROVIDER_GOOGLE,Marker,Callout,Polygon} from 'react-native-maps';
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
render(){
    var dist=null;
    var time=null;
    return(
        <View style={styles.container}>
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
     <Text>Distance:{this.state.dist}</Text>
        <Text>Time:{this.state.time}</Text>
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
    }
          
});