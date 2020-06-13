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
      navigationOptions:{
         title:"About Us",}
   },
   Signout:{
      screen:Signout,
      navigationOptions:{
         title:"Log Out",}
   },
   Near_Place:{
      screen:Near_Place,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   SignlePlace:{
      screen:SignlePlace,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   Assist:{
      screen:Assist,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   gas:{
      screen:gas,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   restaurant:{
      screen:restaurant,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   hospital:{
      screen:hospital,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   carRepair:{
      screen:carRepair,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   atm:{
      screen:atm,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   food:{
      screen:food,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   add:{
      screen:add,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   rent:{
      screen:rent,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   rental:{
      screen:rental,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   places:{
      screen:places,
      navigationOptions:{
         drawerLabel: () => null,
         }
   },
   details:{
      screen:details,
      navigationOptions:{
         drawerLabel: () => null,
         }
   }
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
