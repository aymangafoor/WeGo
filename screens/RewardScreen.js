import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image
} from "react-native";
import firebase, { auth } from "firebase";
import config from '../config/firebase';
class RewardScreen extends Component{
    render(){
        return(
              <View style={styles.container}>
                  <TouchableOpacity style={{alignSelf: "flex-end", marginleft: 15,}} onPress={this.props.navigation.navigate('Home')}>
                  <Image 
                  source={require('./images/drawer.png')}
                  style={{ width: 30, alignSelf: "flex-start", height: 25}} />
                  </TouchableOpacity>
                  <Image 
                source={require('./images/user.png')}
                style={{ width: 50, height: 50, alignSelf: "center",}} />
              
        <Text style={styles.Text}>{firebase.auth().currentUser.email}</Text>
        <View style={{flexDirection: "row"}}>
        <Image 
                source={require('./images/coin.png')}
                title="50wc"
                style={{ width: 30, height: 30, alignSelf: "center", marginVertical: 0}} />
                <Text style={{alignSelf: "center"}}>50wc</Text>
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
        justifyContent: 'center'
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
        marginBottom: 0,
        marginTop: 500,
        alignSelf: 'center',
        color: '#314256',
      
      },
    }
    );