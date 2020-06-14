import React, { Component } from "react";
import { createAppContainer } from 'react-navigation';
import {
   View,
   Image,
 } from "react-native";
 import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator, navigationOptions } from 'react-navigation-drawer';
import Home from '../screens/Home';
import Profile from '../screens/RewardScreen';
import About from '../screens/About';
import Near_Place from '../screens/NearPlaces';
import Assist from '../screens/RoadAssist';
import SignlePlace from '../screens/SignlePlace';
import Signout from '../screens/Signout';
import { Text, Dimensions } from "react-native";
import SideBar from '../screens/SideBar';
import gas from '../screens/gasStation';
import restaurant from '../screens/restaurant';
import hospital from '../screens/hospital';
import carRepair from '../screens/carRepair';
import atm from '../screens/atm';
import food from '../screens/Food';
import add from '../screens/addFood';
import rent from '../screens/Rental';
import places from '../screens/places';
import rental from '../screens/carRental';
import details from '../screens/placeDetails';
import hotel from '../screens/hotel';


const ScreenContainer = createDrawerNavigator({
   Home: {
      screen: Home,
      navigationOptions:{
         title: "Home",
         drawerIcon:()=><Icon name='home' size={26} color={'white'}/>
      }
      
   },
   Profile: {
      screen: Profile,
      navigationOptions: {
         title: "My Account",
         drawerIcon:({activeTintColor})=><Icon name='user' size={24} color={'white'}/>
      }
   },
   About: {
      screen: About,
      navigationOptions: {
         title: "About Us",
         drawerIcon:()=><Icon name='users' size={24} color={'white'}/>
      }
   },
   Signout: {
      screen: Signout,
      navigationOptions: {
         title: "Log Out",
         drawerIcon:({activeTintColor})=><Icon name='sign-out' size={24} color={'white'}/>
      }
   },
   Near_Place: {
      screen: Near_Place,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   SignlePlace: {
      screen: SignlePlace,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   Assist: {
      screen: Assist,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   gas: {
      screen: gas,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   restaurant: {
      screen: restaurant,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   hospital: {
      screen: hospital,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   carRepair: {
      screen: carRepair,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   atm: {
      screen: atm,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   food: {
      screen: food,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   add: {
      screen: add,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   rent: {
      screen: rent,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   rental: {
      screen: rental,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   places: {
      screen: places,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   details: {
      screen: details,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
   hotel: {
      screen: hotel,
      navigationOptions: {
         drawerLabel: () => null,
      }
   },
},
 {
   contentComponent: props => <SideBar{...props} />,
   drawerWidth: Dimensions.get("window").width * 0.7,
   hideStatusBar: true,
   contentOptions: {
      activeTintColor: "#ffffff",
      inactiveTintColor: "#ffffff",
   }
}
);
export default createAppContainer(ScreenContainer);
