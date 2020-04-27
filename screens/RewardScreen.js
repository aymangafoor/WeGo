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
                  <TouchableOpacity style={{alignSelf: "flex-start", marginleft: 15,}} onPress={()=>this.props.navigation.navigate('Home')}>
                  <Image 
                  source={require('./images/back.png')}
                  style={{ width: 21.96, height: 21}} />
                  </TouchableOpacity>
                  <Image 
                source={require('./images/user.png')}
                style={{ width: 160, height: 160, alignSelf: "center",}} />
              
        <Text style={styles.Text}>{firebase.auth().currentUser.email}</Text>
        <View style={{flexDirection: "row"}}>
        <Image 
                source={require('./images/coin.png')}
                title="50wc"
                style={{ width: 24, height: 24, alignSelf: "center", marginVertical: 0}} />
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