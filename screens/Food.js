import React, { Component } from "react";
import {
    View,
    Picker,
    Text
} from "react-native"
class Food extends Component {
    constructor() {
        super()
        this.state = {
            district: '',
            select: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasargod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
            url: ""
        }
    }
    getlink = (value) => {
        console.log(value);
        this.setState({
            district: value,
            url: "https://wego-275411-cbf41.firebaseio.com/Foods/" + this.state.district + ""

        });


    }

    render() {

        return (
            <View>
                <Picker onValueChange={this.getlink}
                    selectedValue={this.state.district}
                    style={{ height: "20%", width: "50%", backgroundColor: '#BDC7D4', marginLeft: 10, marginTop: 10 }}
                    itemStyle={{ borderBottomWidth: 2 }}
                    mode="dropdown">
                    {/* <Picker.Item label={this.state.select}></Picker.Item> */}
                    {this.state.select.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index} />)
                    })}
                </Picker>
            </View>
        )
    }

} export default Food;