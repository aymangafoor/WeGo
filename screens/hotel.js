import React, { Component ,} from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from "react-native"
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import StarRating from 'react-native-star-rating';
import Geolocation from '@react-native-community/geolocation';
class hotel extends Component{
    state={
        hotel:[]
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
        if (item.photos) { var images = item.photos[0].photo_reference; }
        if(item.rating)
        return(
            <View style={styles.container}>
               <TouchableOpacity style={styles.button}  onPress={()=>this.props.navigation.navigate('Assist',{latserv:item.geometry.location.lat, lngserv:item.geometry.location.lng})}>
            
            {images != null && <Image
              style={{ width: null, height: 100,resizeMode:'cover', marginVertical: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${images}&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90` }} />
            }
            <View>
            <Text style={styles.mainitems}>{item.name}</Text>
        <Text style={styles.items}>{item.vicinity}</Text>
       {item.opening_hours? <Text style={styles.items}>open</Text>:<Text style={styles.items}>closed</Text>}
       <View style={{ width: '98%', flexDirection: 'row' }}>
              <Text style={styles.items}>Rating </Text>
              <StarRating
                starStyle={{ marginTop: 4 }}
                halfStarColor={'#ffd700'}
                fullStarColor={'#ffd700'}
                disabled={false}
                maxStars={5}
                starSize={15}
                rating={item.rating}
              />
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Assist', { latserv: item.geometry.location.lat, lngserv: item.geometry.location.lng })}>
                <Text style={styles.btnTxt}>Navigate</Text>
              </TouchableWithoutFeedback>
            </View>
            </View>
            </TouchableOpacity>
        </View>   
        )
    }
    getrent = () => {
        var lat=this.state.lat;
        var lng=this.state.lng
        console.log(lat,lng);
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=lodging&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90`, {
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson.results[1]);
           this.setState({
              hotel: responseJson.results
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }
    render(){
        return(
<View style={{backgroundColor:"#f5f5f5"}}>
    <Text style={styles.Text}>Nearby Lodging {'&'} Inn</Text>
    <FlatList style={styles.flat}
data={this.state.hotel}
renderItem={this.renderItem}/>
</View>
        );
    }
}export default hotel;
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
        marginTop: 40,
    },
    flat:{
        marginHorizontal:15,
    },
    items:{
        color: '#314256',
        fontFamily: 'Montserrat-Regular',
        marginBottom:5,
        marginLeft:5
    },
    mainitems:{
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        marginBottom:5,
        marginLeft:5
    },
    button:{
        backgroundColor:"#fff",
        borderRadius:10,
        marginVertical:8,
    },
    btnTxt: {
        backgroundColor: '#BDC7D4',
        fontFamily: 'Montserrat-Bold',
        color: '#314256',
        fontSize: 14,
        borderRadius: 30,
        width: 80,
        height: 30,
        marginTop: 0,
        marginBottom: 4,
        marginRight: 2,
        textAlign: 'center',
        alignSelf: 'flex-end',
        marginLeft: 100
      },
});