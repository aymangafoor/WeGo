import React, { Component } from "react";
import {
    View,
    Picker,
    TextInput,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native"
export default class addFood extends Component {
    addFoodItem = () => {
        fetch('https://wego-275411.firebaseio.com/Foods/Alappuzha.json', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                hotel: this.state.hotel,
                uri: this.state.uri,
                vicinity: this.state.vicinity
            })
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    state = {
        name: null,
        hotel: null,
        vicinity: null,
        uri: null

    }
    render() {

        return (
            <View style={{marginTop:50,alignItems:"center"}}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#86898E'}
                    placeholder={'Name'}
                    onChangeText={(name) => { this.setState({ name }) }} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#86898E'}
                    placeholder={'hotel'}
                    onChangeText={(hotel) => { this.setState({ hotel }) }} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#86898E'}
                    placeholder={'uri'}
                    onChangeText={(uri) => { this.setState({ uri }) }} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#86898E'}
                    placeholder={'vicinity'}
                    onChangeText={(vicinity) => { this.setState({ vicinity }) }} />
                <TouchableOpacity
                    style={styles.signButton}
                    onPress={this.addFoodItem}>
                    <Text style={styles.btnTxt}>add Food</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14,
        width: "98%",
        height: 60,
        borderRadius: 30,
        paddingLeft: 22,
        marginBottom: 0,
        marginTop: 10,
        backgroundColor: '#E1E6EC',
        marginLeft: 20,
        marginRight: 20,
    },
    btnTxt: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: '#0176FB',
        padding: 0,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        width: 138,
        height: 52,
      },
      signButton: {
        alignSelf: 'center',
        marginTop: 47,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      },
});