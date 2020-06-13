import React, { Component, } from "react";
import {
    View,
    Picker,
    Text,
    FlatList,
    StyleSheet,
    Image,
} from "react-native"

import firebase, { auth } from "firebase";
import config from '../config/firebase';
class Food extends Component {
    constructor() {
        super()
        this.state = {
            district: '',
            select: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasargod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
            url: "",
            Foods: []
        }
    }
    getlink = async (value) => {
        console.log(value);
        this.setState({
            district: value
        }, () => this.getFood());

    }
    getFood = () => {
        const district = this.state.district;
        if (district != '') {
            console.log('hi', district);
            var data = firebase.database().ref(`/Foods/${district}`);
            data.on("value", datasnap => {
                // console.log(Object.values(datasnap.val()))
                this.setState({ Foods: Object.values(datasnap.val()) })
            })
        }
    }
    renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 100, height: 100, marginRight: 5, marginVertical: 0, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                    source={{ uri: item.uri }} />
                <View style={{ flexDirection: 'column', height: "100%", flex: 1 }}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{item.name}</Text>
                    <Text style={styles.items}>{item.hotel}</Text>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={styles.items}>{item.vicinity}</Text>
                </View>
            </View>
        )

    }
    render() {
        //console.log(this.state.Foods)
        return (
            <View style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.mainTitle}> Popular Cuisine in </Text>
                    <Picker onValueChange={this.getlink}
                        style={styles.picker}
                        itemStyle={styles.itemStyle}
                        selectedValue={this.state.district}
                    >
                        {this.state.select.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                    </Picker>

                </View>


                <FlatList style={styles.flat}
                    data={this.state.Foods}
                    renderItem={this.renderItem} />

            </View>
        )
    }

} export default Food;


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        borderRadius: 10,
        padding: 0,
        marginVertical: 8,
    },
    flat: {
        marginHorizontal: 15
    },
    picker: {
        flex: .5,
        marginTop: -10,
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        fontWeight: 'bold'

    },
    Text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 0,
        color: '#314256',
        marginHorizontal: 0,
        marginTop: 40,
    },
    items: {
        color: '#314256',
        fontFamily: 'Montserrat-Regular',
        marginBottom: 5,
        marginLeft: 5,
        textAlign: 'left',
        flex: 1
    },
    title: {
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        marginBottom: 5,
        marginLeft: 5,
        textAlign: 'left',
    },
    mainTitle: {
        color: '#314256',
        fontFamily: 'serif',
        marginBottom: 5,
        marginLeft: 0,
        textAlign: 'left',
        fontSize: 20,
        flex: .6
    },
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'red',
        textAlign: 'center',

        fontWeight: 'bold'
    }
})