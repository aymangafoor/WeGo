import React, { Component } from "react";
import {
    View,
    TextInput,
    Text,
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    YellowBox
} from "react-native"
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import { Picker } from 'react-native-picker-dropdown';
import { storage } from "firebase";
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto: true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes: [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()
export default class addFood extends Component {
    addFoodItem = () => {
        if (this.state.hotel == null && this.state.vicinity == null && this.state.name == null) {
            Alert.alert("Error", "All fields are mandatory")
            return;
        }
        const url = this.state.url;
        firebase.database().ref(url).push().set({
            name: this.state.name,
            hotel: this.state.hotel,
            uri: this.state.uri,
            vicinity: this.state.vicinity
        })
        Alert.alert("Food Added\nCoins will be Added\n after verifying");
        this.setState({
            name: '',
            hotel: '',
            uri: '',
            vicinity: ''
        })
    }
    constructor() {
        YellowBox.ignoreWarnings(['undefined is not']);
        super()
        this.state = {
            district: '',
            name: null,
            hotel: null,
            vicinity: null,
            uri: null,
            url: '',
            select: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasargod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
            image: '',
            blob: [],
            progress: null
        }
    }
    getlink = async (value) => {
        console.log(value);
        this.setState({
            district: value
        }, () => this.getUrl());
    }
    getUrl = () => {
        const district = this.state.district;
        this.state.url = `Foods/${district}/`;
    }
    goToPickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            console.log(image);
            this.setState({
                image: image.path,
                img: image
            },
                () => {
                    this.getblob()
                });

        });
    }
    getblob = () => {
        var image = this.state.image;
        fs.readFile(image, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `image/jpeg;BASE64` })
            })
            .then((Blob) => {
                this.setState({
                    blob: Blob,
                }, () => this.storeData())
            })
    }
    storeData = () => {
        var blob = this.state.blob;
        var district = this.state.district
        var name = this.state.name;
        if (name == null) {
            Alert.alert("Error", "Enter Name")
            return;
        }
        var location = firebase.storage().ref(`Foods/${district}/${name}`).put(blob);
        location.on(
            "state_changed",
            snapshot => {
                var progress = ((snapshot.bytesTransferred / snapshot.totalBytes)*100)
                this.setState({ progress: progress })
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    case firebase.storage.TaskState.SUCCESS:
                        console.log('Success');
                        break;
                }
                if (progress == 100) {
                    console.log("Upload Successfull");
                }
            },
            error => { console.log(error) },
            () => {
                firebase.storage().ref("Foods")
                    .child(`${district}/${name}`)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        this.setState({
                            uri: url
                        })
                    });
            }
        );
    };
    render() {
        var progress = this.state.progress;

        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.district}
                    onValueChange={this.getlink}
                    mode="dropdown"
                    textStyle={styles.itemStyle}
                >
                    {this.state.select.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index} />)
                    })}
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#86898E'}
                    placeholder={'Name'}
                    onChangeText={(name) => { this.setState({ name }) }} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#86898E'}
                    placeholder={'Hotel'}
                    onChangeText={(hotel) => { this.setState({ hotel }) }} />
                {/* <TextInput
                    style={styles.input}
                    placeholderTextColor={'#86898E'}
                    placeholder={'uri'}
                    onChangeText={(uri) => { this.setState({ uri }) }} /> */}
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#86898E'}
                    placeholder={'Location'}
                    onChangeText={(vicinity) => { this.setState({ vicinity }) }} />
                <TouchableOpacity
                    style={styles.signButton}
                    onPress={this.goToPickImage}>
                    <Text style={styles.btnTxt}>add image</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    {progress > 0 &&  <ProgressBarAnimated
                    backgroundColorOnComplete={'#0176FB'}
                        width={138}
                        maxValue={100}
                        value={progress}
                    />}
                </View>
                {progress==100&&<Text>uploded</Text>}
                <TouchableOpacity
                    onPress={this.addFoodItem}>
                    <Text style={styles.btnTxt}>add Food</Text>
                </TouchableOpacity>
                <View style={styles.bottom}>
                    <Text style={styles.footerTxt}>WeGo</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 15,
        alignItems: "center",
    },
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
        marginTop: 5,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 5,
    },
    itemStyle: {

        fontSize: 15,
        height: 75,
        color: '#314256',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    footerTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        alignSelf: 'center',
        color: '#314256',
        marginRight: 0,
        marginLeft: 0,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
});