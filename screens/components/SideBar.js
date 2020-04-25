import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
    ImageBackground
} from "react-native";
import {DrawerNavigatorItems} from "react-navigation-drawer";
import { ScrollView } from "react-native-gesture-handler";
export default  class SideBar extends Component{
    constructor(props) {
        super(props)
        }
        navigateToScreen = (route) => () => {
        const navigate = NavigationActions.navigate({
        routeName: route
        });
        this.props.navigation.dispatch(navigate);
        }

render() {
    return (
    <ScrollView>
        <View style={styles.container}>
           <Text>Hi</Text>
            <DrawerNavigatorItems {...props} />
            <Text>Hello</Text>
        </View>
    </ScrollView>

);
}}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        backgroundColor:"#314256",
        alignItems: 'center',
        justifyContent: 'center'
    },
   textProp: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 38,
        color: '#ffffff',
        marginTop: 32,
        marginBottom: 0,
        marginRight: 0,
        marginLeft: 37,
        alignSelf: 'flex-start',
      }
    });