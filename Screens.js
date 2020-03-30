import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const ScreenContainer = createDrawerNavigator({
  Splash: {screen: SplashScreen},
  Login: {screen: LoginScreen},
  SignUp: {screen: SignUpScreen},
});
export default createAppContainer(ScreenContainer);
