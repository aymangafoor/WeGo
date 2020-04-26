import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
export default class LoginScreen extends Component {
  state = {
    email :null,
    password : null,
    }
    Signin = ()=>{
      if( this.state.email == null || this.state.password == null ){
        Alert.alert("All fields are required")
        return;
        }
    try{
        firebase
        .auth()
        .signInWithEmailAndPassword
        (this.state.email,this.state.password).
        catch((error) => Alert.alert(error.toString(error)))
        .then((user) => {
             if(user){
                 Alert.alert("Login ok");
             this.props.navigation.navigate('Home')
             }

        });
    }catch (error) {
        console.log(error.toString(error));
      }

    }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={styles.textProp}>Login</Text>
        <View>
        <TextInput
            placeholderTextColor={'#86898E'}
            placeholder={'Email'}
            style={styles.emailField}
            onChangeText={(email)=>{this.setState({email})}}
          />
          <View>
          <TextInput
              secureTextEntry={true}
              style={styles.default}
              placeholderTextColor={'#86898E'}
              placeholder={'Password'}
              style={styles.pwdField}
              onChangeText={(password)=>{this.setState({password})}}
            />
            <View>
              <TouchableOpacity style={styles.signButton}  onPress={this.Signin} activeOpacity={0.5}>
                <Text style={styles.btnTxt}> Sign in </Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.bodyTxt}>Create account?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Signup')}>
                  <Text style={styles.signUpTxt}>Sign up </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.footerTxt}>WeGo</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
    marginTop: 32,
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
    marginTop: 98,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  pwdField: {
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
    color: '#86898E',
    width: 286,
    height: 60,
    backgroundColor: '#E1E6EC',
    borderRadius: 30,
    paddingLeft: 22,
    marginTop: 36,
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
  signUpTxt: {
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
