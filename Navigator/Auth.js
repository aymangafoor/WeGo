import {createAppContainer, ScrollView} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/LoginScreen';
import Signup from '../screens/SignUpScreen';
import Home from '../screens/Home';


const AppNavigator = createStackNavigator({
    Login,
    Signup,
    Home,
},
{
    defaultNavigationOptions:{
        headerShown: false
    }
}
);
export default createAppContainer(AppNavigator);