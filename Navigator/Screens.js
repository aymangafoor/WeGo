
import {createAppContainer, ScrollView} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screens/Home';

const ScreenContainer =  createDrawerNavigator ({
   Home,
 


});
export default createAppContainer(ScreenContainer);

