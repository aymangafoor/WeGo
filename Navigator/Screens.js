import React, { Component } from "react";
import {createAppContainer, ScrollView} from 'react-navigation';
import { createDrawerNavigator,navigationOptions } from 'react-navigation-drawer';
import Home from '../screens/Home';
import Profile from '../screens/RewardScreen';
import About from '../screens/About';
import Near_Place from '../screens/NearPlaces';
import Assist from '../screens/RoadAssist';
import SignlePlace from '../screens/SignlePlace';
import Signout from '../screens/Signout';
import {Text, Dimensions} from "react-native";
import SideBar from '../screens/SideBar';

const ScreenContainer =  createDrawerNavigator ({
   Home:{
      screen:Home,
      title:"Home"
   },
   Profile:{
      screen:Profile,
      navigationOptions:{title:"My Account",}
   },
   About:{
      screen:About,
      navigationOptions:{title:"About Us"}
   },
   Near_Place,
   SignlePlace,
   Assist,
   Signout
   


},{
   contentComponent: props => <SideBar{...props}/>,
   drawerWidth:Dimensions.get("window").width * 0.7,
   hideStatusBar: true,
   contentOptions:{
      activeTintColor:"#ffffff",
      inactiveTintColor:"#ffffff",
   }
}
);
export default createAppContainer(ScreenContainer);
