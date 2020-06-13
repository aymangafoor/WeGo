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
import ImagePicker from 'react-native-image-crop-picker';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
class RewardScreen extends Component {

  constructor() {
    super()
    this.state = {
      image: '',
      name: firebase.auth().currentUser.displayName,
      img: [],
      point:null
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
      },
        () => {
          this.setimage()
        });

    });
  }
  getpoint = async () => {
    AsyncStorage.getItem('point', (error, result) => {
      this.setState({
        point: result,
      });
    })
}
  setimage = async () => {
    try {
      await AsyncStorage.setItem('image', this.state.image)
    } catch (error) {
      console.log(error);

    }
  }
  render() {
    this.getpoint();
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
         <Text style={{ marginLeft:5 }}>{this.state.point}wc</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.footerTxt}>WeGo</Text>
        </View>
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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
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