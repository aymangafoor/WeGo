import {createAppContainer, ScrollView} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/LoginScreen';
import Signup from '../screens/SignUpScreen';
import Home from '../screens/Home';
import gas from '../screens/gasStation';



const AppNavigator = createStackNavigator({
    Login,
    Signup,
    Home,
    gas,
},
{
    defaultNavigationOptions:{
        headerShown: false
    }
}
);
export default createAppContainer(AppNavigator);