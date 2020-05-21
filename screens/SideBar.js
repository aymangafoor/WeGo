import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, AsyncStorage } from 'react-native'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import firebase, { auth } from "firebase";
import config from '../config/firebase';

class SideBar extends Component {
    constructor(){
        super()
        this.state={
            name:null,
            image:''
        }
    }
    getname = async () =>{
        try{
  this.state.name = await AsyncStorage.getItem('name');
  this.state.image = await AsyncStorage.getItem('image')
  if(this.state.name !== null){
    console.log(this.state.name)
  }
        }catch(error){
  console.log(error);
  
        }
      }
    render() {
        props = this.props
        this.getname();
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Image
                        source={{uri: this.state.image}}
                        style={{ width: 62, height: 62,borderRadius:62, alignSelf: "center", marginTop: 10 }} />
                    <Text style={styles.Text}>{this.state.name}</Text>
                    <View style={{ flexDirection: "row", alignSelf: 'center' }}>
                        <Image
                            source={require('./images/coin.png')}
                            title="50wc"
                            style={{ width: 24, height: 24, alignSelf: "center", marginVertical: 0 }} />
                        <Text style={{ alignSelf: "center" }}>50wc</Text>
                    </View>
                    <DrawerNavigatorItems {...props} />
                </View>
            </ScrollView>
        );
    }
} export default SideBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        //justifyContent: 'center'
        backgroundColor: '#0176FB'
    },
    Profile: {

    },
    Text: {
        color: '#ffffff',
        alignSelf: 'center'
    }
});