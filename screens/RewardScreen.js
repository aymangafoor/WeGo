import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from "react-native";
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import { Item } from "native-base";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
// enable this option so that the response data conversion handled automatically
auto : true,
// when receiving response data, the module will match its Content-Type header
// with strings in this array. If it contains any one of string in this array, 
// the response body will be considered as binary data and the data will be stored
// in file system instead of in memory.
// By default, it only store response data to file system when Content-Type 
// contains string `application/octet`.
binaryContentTypes : [
    'image/',
    'video/',
    'audio/',
    'foo/',
]
}).build()
class RewardScreen extends Component {

  constructor(props) {
    const user = [];
    super(props)
    this.state = {
      image: '',
      keyid: 'abcde',
      name: null,
      img: [],
      blob: []
    }
  }
  goToPickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      console.log(image);
      this.setState({
        image: image.path,
        img: image
      },
        () => {
          this.getblob(),
          this.setimage()
        });

    });
  }
  getname = async () => {
    try {
      this.state.name = await AsyncStorage.getItem('name');
    } catch (error) {
      console.log(error);

    }
  }
  setimage = async () => {
    try {
      await AsyncStorage.setItem('image', this.state.image)
    } catch (error) {
      console.log(error);

    }
  }
  getblob = () => {
    var image = this.state.image;
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `image/jpeg;BASE64` })
      })
      .then((Blob) => {
        this.setState({
          blob: Blob,
        }, () => this.storeData())
      })
  }
  storeData = () => {
    var blob = this.state.blob;
    var location = firebase.storage().ref(`Foods/Suggest/`).put(blob);
    location.on(
      "state_changed",
      snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          case firebase.storage.TaskState.SUCCESS:
            console.log('Success');
            break;
        }
        if(progress==100){
          Alert.alert("Upload Successfull")
        }
      },
      error => { console.log(error) },
      () => {
        firebase.storage().ref("Foods")
          .child('Suggest')
          .getDownloadURL()
          .then(url => {
            console.log(url)
          });
      }
    );
  };
  render() {
    this.getname();


    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ alignSelf: "flex-start", marginleft: 15, }} onPress={() => this.props.navigation.navigate('Home')}>
          <Image
            source={require('./images/back.png')}
            style={{ width: 21.96, height: 21 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.goToPickImage()}
          placeholder={'ADD PHOTO'}
          placeholderTextColor={'black'}
          style={{ width: 160, height: 160, alignSelf: "center", borderRadius: 160, backgroundColor: 'blue' }}>
          {this.state.image != '' && (
            <Image source={{ uri: this.state.image }}
              style={{ width: 160, height: 160, alignSelf: "center", borderRadius: 160 }} />
          )}
        </TouchableOpacity>
        <Text style={styles.Text}>{this.state.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require('./images/coin.png')}
            title="50wc"
            style={{ width: 24, height: 24, alignSelf: "center", marginVertical: 0 }} />
          <Text style={{ alignSelf: "center" }}>50wc</Text>
        </View>
        <Text style={styles.footerTxt}>WeGo</Text>
      </View>

    );
  }


}
export default RewardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    alignItems: 'center',
    //  justifyContent: 'center'
  },
  Text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginLeft: 0,
    marginRight: 0,
    color: '#314256',
    marginHorizontal: 0,
    marginTop: 0,
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
}
);