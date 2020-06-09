import React, { Component ,} from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
} from "react-native"
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import Geolocation from '@react-native-community/geolocation';
import { Value } from "react-native-reanimated";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
class places extends Component{
    state={
        carRental:[],
        photos:[],
    }
    constructor(){
        super()
        Geolocation.getCurrentPosition(
            info => {
                console.log(info);
              this.setState({
                lat: info.coords.latitude,
                lng: info.coords.longitude,
              },() => this.getrent())
        })
        this.state = {
            lat:null,
            lng:null,
            
        }
    }
    renderItem = ({item})=> {
        if(item.photos){var images=item.photos[0].photo_reference;}
        // console.log(item.photos[0].photo_reference);
        return(
            <View style={styles.container}>
               <TouchableOpacity style={styles.button}  onPress={()=>this.props.navigation.navigate('Assist',{latserv:item.geometry.location.lat, lngserv:item.geometry.location.lng})}>
                   <View
                   >
            {images!=null&&<Image
            style={{ width: null, height: 200,resizeMode:"cover",borderTopLeftRadius: 10,borderTopRightRadius: 10,flex:2}}
            source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${images}&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90`}}/>
    }</View>
            <View>
            <Text style={styles.mainitems}>{item.name}</Text>
        <Text style={styles.items}>{item.vicinity}</Text>
       {item.opening_hours? <Text style={styles.items}>open</Text>:<Text style={styles.items}>closed</Text>}
        <Text style={styles.items}>Rating:{item.rating}</Text>
            </View>
            </TouchableOpacity>
        </View>   
        )
    }
    getrent = () => {
        var lat=this.state.lat;
        var lng=this.state.lng
        console.log(lat,lng);
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=25000&type=tourist_attraction&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90`, {
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log('hi',responseJson.results[0].name);
           this.setState({
              places: responseJson.results,
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }
    render(){
        return(
<View style={{backgroundColor:"#f5f5f5"}}>
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
              marginTop:0

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
            console.log(data, details);
            this.setState({
              search:data.description
            })
   
          }}
          query={{
            key: 'AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90',
            language: 'en',
            components: 'country:in'
          }}
      
        />
    <Text style={styles.Text}>Nearby Places</Text>
    <FlatList style={styles.flat}
data={this.state.places}
renderItem={this.renderItem}/>
</View>
        );
    }
}export default places;
const styles = StyleSheet.create({
    container: {
        flex: 2,
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
    flat:{
        marginHorizontal:15,
    },
    items:{
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        marginBottom:5,
        marginLeft:5


    },
    mainitems:{
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        alignSelf:'center',
        marginBottom:5,
        marginLeft:5


    },
    button:{
        backgroundColor:"#fff",
        borderRadius:10,
        marginVertical:8,
    }
});