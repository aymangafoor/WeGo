import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import firebase, { auth } from "firebase";
import firestore from "firebase/firestore"
import config from '../config/firebase';
export default class SignUpScreen extends React.Component {
  registerUser = () => {
    firebase.database().ref('users').push().set({
      email: this.state.email,
      point:10
  })
  }
  state = {
    email: null,
    password: null,
    name: null
  }

  Signup = () => {
    if (this.state.email == null && this.state.password == null && this.state.name == null) {
      Alert.alert("Error", "All fields are mandatory")
      return;
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword
        (this.state.email, this.state.password).
        catch((error) => Alert.alert(error.toString(error)))
        .then((user) => {
          user.user.updateProfile({ displayName: this.state.name })
          console.log(user);
          if (user) {
            Alert.alert("Account Created");
            this.registerUser()
            this.props.navigation.navigate('Home')

          }

        });
    } catch (error) {
      console.log(error.toString(error));
    }
  }
  render() {
    return (
      <KeyboardAwareScrollView style={{ flex:1,backgroundColor: '#ffffff' }}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={styles.textProp}>Sign up</Text>
        <View style={{ marginVertical: 20 }}>
          <TextInput
            placeholderTextColor={'#86898E'}
            placeholder={'Name'}
            style={styles.emailField}
            onChangeText={(name) => { this.setState({ name }) }}
          />
          <TextInput
            placeholderTextColor={'#86898E'}
            placeholder={'Email'}
            style={styles.emailField}
            onChangeText={(email) => { this.setState({ email }) }}
          />
          <TextInput
            secureTextEntry={true}
            placeholderTextColor={'#86898E'}
            placeholder={'Password'}
            style={styles.pwdField}
            onChangeText={(password) => { this.setState({ password }) }}
          />
          <TouchableOpacity
            style={styles.signButton}
            activeOpacity={0.5}
            onPress={this.Signup}>
            <Text style={styles.btnTxt}> Sign up </Text>
          </TouchableOpacity>
          <Text style={styles.bodyTxt}>Already a member? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.signInTxt}>Sign in </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.footerTxt}>WeGo</Text>
        </View>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textProp: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 38,
    color: '#314256',
    marginTop: 80,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 37,
    alignSelf: 'flex-start',
  },
  emailField: {
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
    color: '#86898E',
    width: 286,
    height: 60,
    backgroundColor: '#E1E6EC',
    borderRadius: 30,
    paddingLeft: 22,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  pwdField: {
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
    color: '#86808E',
    width: 286,
    height: 60,
    backgroundColor: '#E1E6EC',
    borderRadius: 30,
    paddingLeft: 22,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  btnTxt: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#0176FB',
    padding: 0,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    width: 138,
    height: 52,
  },
  signButton: {
    alignSelf: 'center',
    marginTop: 47,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  bodyTxt: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#314256',
    marginTop: 58,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    alignSelf: 'center',
  },
  signInTxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#0176FB',
    alignSelf: 'center',
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
});
