import React, { Component ,} from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    Image,
} from "react-native"
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import Geolocation from '@react-native-community/geolocation';
class carRental extends Component{
    state={
        carRental:[]
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
            lng:null
            
        }
    }
    renderItem = ({item})=> {
        return(
            <View style={styles.container}>
               <TouchableOpacity style={styles.button}  onPress={()=>this.props.navigation.navigate('Assist',{latserv:item.geometry.location.lat, lngserv:item.geometry.location.lng})}>
            <Image
            style={{width:15,height:15,marginTop:10,marginLeft:5}}
            source={{uri:item.icon}}/>
            <View>
            <Text style={styles.items}>{item.name}</Text>
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
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=25000&type=car_rental&keyword=car rental&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90`, {
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson.results[1]);
           this.setState({
              carRental: responseJson.results
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }
    render(){
        return(
<View style={{backgroundColor:"#f5f5f5"}}>
<TouchableOpacity style={{ alignSelf: "flex-start", marginleft: 15, }} onPress={() => this.props.navigation.navigate('rent')}>
          <Image
            source={require('./images/back.png')}
            style={{ width: 21.96, height: 21 ,marginLeft:5}} />
        </TouchableOpacity>
    <Text style={styles.Text}>Nearby Vehicle Rentals</Text>
    <FlatList style={styles.flat}
data={this.state.carRental}
renderItem={this.renderItem}/>
</View>
        );
    }
}export default carRental;
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    flat:{
        marginHorizontal:15,
    },
    items:{
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        marginBottom:5,
        marginLeft:5


    },
    button:{
        backgroundColor:"#fff",
        flexDirection:'row',
        borderRadius:10,
        padding:8,
        marginVertical:8,
    }
});