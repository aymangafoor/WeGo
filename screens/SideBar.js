import React, { Component } from "react";
import {View,Text,StyleSheet,ScrollView,ImageBackground,Image} from 'react-native'
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import firebase, { auth } from "firebase";
import config from '../config/firebase';


export default SideBar = props => (
    <ScrollView style={styles.container}>
         <View>
             <Image
              source={require('./images/user.png')}
              style={{ width: 62, height: 62, alignSelf: "center",marginTop:10}} />
              <Text style={styles.Text}>{firebase.auth().currentUser.email}</Text>
              <View style={{flexDirection: "row",alignSelf:'center'}}>
        <Image 
                source={require('./images/coin.png')}
                title="50wc"
                style={{ width: 24, height: 24, alignSelf: "center", marginVertical: 0}} />
                <Text style={{alignSelf: "center"}}>50wc</Text>
                </View>
            <DrawerNavigatorItems {...props}/>
        </View>
    </ScrollView>
);
const styles=StyleSheet.create({
    container: {
        flex: 1,
       // alignItems: 'center',
        //justifyContent: 'center'
        backgroundColor:'#0176FB'
    },
    Profile:{
        
    },
    Text:{
        color:'#ffffff',
        alignSelf:'center'
    }
});