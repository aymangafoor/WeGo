import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const AppNavigator = createStackNavigator(
  {
    Splash: {screen: SplashScreen},
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
  },
  {
    headerMode: false,
  },
);

const NavStack = createStackNavigator(AppNavigator);
export default createAppContainer(NavStack);
