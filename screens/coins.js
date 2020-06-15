import React, { Component, } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native"
class coins extends Component {
    render() {
        return (
            <View>
                <Text style={styles.Text}>How to Acquire WeGo coins?</Text>
        <Text style={styles.texts}>Suggest cuisines you experienced in Add Food section in Home menu to get 50-100 WeGo coins (wc){'\n'}New features  will be added later to increase your WeGo coins</Text>
                <Text style={styles.Text}>How to Redeem WeGo coins?</Text>
                <Text style={styles.texts}>You can Redeem coins when you reaches a value of 2000 WeGo coins</Text>
            </View>
        )
    }
} export default coins;

const styles = StyleSheet.create({
    Text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        paddingLeft: 10,
        marginRight: 0,
        color: '#314256',
        marginHorizontal: 0,
        marginTop: 20,
    },
    texts: {
        fontFamily:'Montserrat-Regular',
        paddingLeft:5,
        paddingBottom:5,
        lineHeight:20
    }
})