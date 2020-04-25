import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
} from "react-native";
class About extends Component {
     render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>ABOUT US</Text>
               <Text style={styles.Textpara}>We Are A Team of 4 members
                   Aneesh Edavalath, Ayman Gafoor, Cijas PK and Hijas Ahamed Try to help users to plan their Trip</Text> 

            </View>

        );}}
        export default About;
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
            Textpara: {
                alignSelf:'center',
                fontSize: 15,
                fontFamily: "Montserrat-Italic",
                marginTop: 5,

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