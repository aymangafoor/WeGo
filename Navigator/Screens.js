
import {createAppContainer, ScrollView} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screens/Home';
import Profile from '../screens/RewardScreen';
import About from '../screens/About';
import Near_Place from '../screens/NearPlaces';
import Signout from '../screens/Signout';
import {Text} from "react-native";

const ScreenContainer =  createDrawerNavigator ({
   Home,
   Profile,
   About,
   Near_Place,
   Signout
   


});
export default createAppContainer(ScreenContainer);
