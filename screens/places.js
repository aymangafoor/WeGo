import React, { Component, } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native"
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import Geolocation from '@react-native-community/geolocation';
import StarRating from 'react-native-star-rating';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
class places extends Component {
  state = {
    places: [],
    photos: [],
    museum: [],
    art: []
  }
  constructor() {
    super()
    Geolocation.getCurrentPosition(
      info => {
        console.log(info);
        this.setState({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        }, () => this.getrent())
      })
    this.state = {
      lat: null,
      lng: null,

    }
  }
  renderItem = ({ item }) => {
    if (item.photos) { var images = item.photos[0].photo_reference; }
    // console.log(item.photos[0].photo_reference);
    if(item.rating)
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('details', { name: item.name, photo: images })} >
          <View
            style={{ flex: 2 }}>
            {images != null && <Image
              style={{ width: null, height: null, resizeMode: "cover", borderTopLeftRadius: 10, borderTopRightRadius: 10, flex: 2 }}
              source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${images}&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90` }} />
            }</View>
          <View>
            <Text style={styles.mainitems}>{item.name}</Text>
            <Text style={styles.items}>{item.vicinity}</Text>
            {item.opening_hours ? <Text style={styles.items}>open</Text> : <Text style={styles.items}>closed</Text>}
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
    var lat = this.state.lat;
    var lng = this.state.lng
    console.log(lat, lng);
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=20000&type=tourist_attraction&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('hi', responseJson.results[0].name);
        this.setState({
          places: responseJson.results,
        })
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=25000&keyword=museum&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('mu', responseJson.results[0]);
        this.setState({
          museum: responseJson.results,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    var museum = this.state.museum
    return (
      <View style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder='Search Nearest Placefrom:'
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
              alignSelf: 'center',
              width: Dimensions.get("window").width * 0.97,
            },
            container: {
              flex: 1,
              position: 'absolute',
              marginTop: 0

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
            listView: {
              zIndex: 1,
              backgroundColor: '#E1E6EC',
              marginHorizontal: 5,
              borderColor: 'black'
            }
          }}
          GooglePlacesDetailsQuery={{
            fields: ['geometry']
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            this.setState({
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng
            }, () => this.getrent())

          }}
          query={{
            key: 'AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90',
            language: 'en',
            components: 'country:in'
          }}

        />
        <Text style={styles.Text}>Nearby Musea {'&'} Art Galleries</Text>
        <FlatList style={styles.flat}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={museum}
          renderItem={this.renderItem}
          keyExtractor={item => item.id} />
        
        <Text style={styles.Texts}>Other Tourist Attraction</Text>
        <FlatList style={styles.flat}
          horizontal={true}
          data={this.state.places}
          renderItem={this.renderItem}
          keyExtractor={item => item.id} />
      </View>

    );
  }
} export default places;
const styles = StyleSheet.create({
  container: {
    flex: 2,
    shadowColor:'rgba(0, 0, 0, 0.1)',
    shadowOffset : { width: 1, height: 13}
  },
  Text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 0,
    color: '#314256',
    marginHorizontal: 0,
    marginTop: 50,
    marginBottom:10
  },
  flat: {
    marginHorizontal: 5,
  },
  items: {
    color: '#314256',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    marginLeft: 5,
    textAlign: 'left',
  },
  mainitems: {
    color: '#314256',
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    marginBottom: 5,
    marginLeft: 5


  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 8,
    zIndex: 0,
    height: 260,
    width: 240,
    shadowOpacity: 0.8,
    elevation: 6,
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
    marginLeft: 30
  },
  Texts:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 0,
    color: '#314256',
    marginHorizontal: 0,
    marginBottom:10
  }
});