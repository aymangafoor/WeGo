import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
class restaurant extends Component{
    constructor(){
        super()
        this.state = {
            lat:null,
            lng:null,
            car_repair: []
            
        }
    }
    UNSAFE_componentWillMount(){
        let lat =this.props.navigation.getParam('lat',[])
        let lng =this.props.navigation.getParam('lng',[])
this.setState({
        lat,
        lng,
    })
    }
    renderItem = ({item})=> {
        return(
            <View style={styles.container}>
               <TouchableOpacity style={styles.button}  onPress={()=>this.props.navigation.navigate('Assist',{latserv:item.geometry.location.lat, lngserv:item.geometry.location.lng})}>
            <Image
            style={{width:15,height:15,marginTop:10,marginLeft:5}}
            source={{uri:item.icon}}/>
            <View>
            <Text style={styles.items}>{item.name}</Text>
        <Text style={styles.items}>{item.vicinity}</Text>
       {item.opening_hours? <Text style={styles.items}>open</Text>:<Text style={styles.items}>closed</Text>}
        <Text style={styles.items}>Rating:{item.rating}</Text>
            </View>
            </TouchableOpacity>
        </View>   
        )
        
    }
    componentDidMount = () => {
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+this.state.lat+','+this.state.lng+'&radius=5000&type=car_repair&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90', {
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson.results[1]);
           this.setState({
              car_repair: responseJson.results
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }
    render(){
        return(
<View>
    <Text style={styles.Text}>Nearby Car Repair</Text>
    <FlatList style={styles.flat}
data={this.state.car_repair}
renderItem={this.renderItem}/>
</View>
        );
    }
}export default restaurant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    items:{
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        marginBottom:5,
        marginLeft:5
    },
    button:{
        backgroundColor:"#fff",
        flexDirection:'row',
        borderRadius:10,
        padding:8,
        marginVertical:8,
        shadowOpacity: 0.8,
        elevation: 10,
        marginHorizontal: 15
    }
});