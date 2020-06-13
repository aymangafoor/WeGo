import React, { Component, } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
    Button
} from "react-native"
import { Thumbnail } from "native-base";
import HTMLView from 'react-native-htmlview';
class placeDetails extends Component {
    constructor() {
        super()
        this.state = {
            name: null,
            result0: [],
            result1:[],
            result2:[],
            title:"",
            image:''
        }
    }
    UNSAFE_componentWillMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({
                    name: this.props.navigation.getParam('name', []),
                    image:this.props.navigation.getParam('photo',[])
                }, () => { this.getDetails() }
                )
            }
        )
    }
    getDetails = () => {
        var name = this.state.name;
        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${name}&prop=info&inprop=url&utf8=&format=json`,
            { method: 'GET', dataType: 'jsonp' })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    result0: data.query.search[0].snippet,
                    result1:data.query.search[1].snippet,
                    result2:data.query.search[2].snippet,
                    title:data.query.search[0].title
                 })
                
            });
    }
    render() {
        const text= [this.state.result0,this.state.result1,this.state.result2]
        var full=text.toString()
        var details=full.replace(/<span class="searchmatch">/g,' ');
        //var final=details.replace(/</span>/g,'')
        var title=this.state.name
        var images=this.state.image
        console.log(details)
        return (
            <View style={styles.container}>
                <Text style={styles.mainitems}>{title}</Text>
                <View style={{width:'100%', height: 200}}>
                <Image
                style={{ width: null, height: null, resizeMode: "cover", borderRadius: 10, flex: 2 }}
                source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${images}&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90` }}></Image>
                </View>
                <HTMLView
                    value={'<p>'+details+'</p>'}
                    stylesheet={html}
                />
                {text==null &&<Text style={{}}>No Details Available</Text>}
            </View>
        )
    }
} export default placeDetails;
const styles = StyleSheet.create({
    html: {

    },
    span:{
        fontSize:15
    },
    container: {
        flex: 1,
        fontFamily:'Montserrat-Regular',
        marginLeft:10,
        marginRight:10
    },
    mainitems: {
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        alignSelf: 'center',
        marginBottom: 5,
        marginLeft: 5,
        fontSize:25
    
      },
})
const html=StyleSheet.create({
    p: {
        color:"#314256",
        fontFamily: 'Montserrat-Regular',
        fontSize:15,
        marginTop:10

    }
})