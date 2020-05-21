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
import { ListItem } from "native-base";
class gasStation extends Component{
    constructor(){
        super()
        this.state = {
            lat:null,
            lng:null,
            gasedata: [],
            latserv:null,
            lngserv:null,
            refreshing: false,
            
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
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Assist',{latserv:item.geometry.location.lat, lngserv:item.geometry.location.lng})}>
            <Image
            style={{width:15,height:15,marginTop:10,marginLeft:5}}
            source={{uri:item.icon}}/>
            <View>
            <Text style={styles.items}>{item.name}</Text>
        <Text style={styles.items}>{item.vicinity}</Text>
       {item.opening_hours? <Text style={styles.items}>open</Text>:<Text style={styles.items}>closed</Text>}
            </View>
            </TouchableOpacity>
        </View>   
        )
        
    }
    componentDidMount = () => {
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+this.state.lat+','+this.state.lng+'&radius=5000&type=gas_station&key=AIzaSyChiwupcs4om20XFLC7iylVTO5Ef6OTH90', {
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           //console.log(responseJson.results[1]);
           this.setState({
              gasedata: responseJson.results
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }
    render(){
        return(
<View>
    <Text style={styles.Text}>Nearby Gase Stations</Text>
    <FlatList style={styles.flat}
data={this.state.gasedata}
renderItem ={this.renderItem}/>
</View>
        );
    }
}export default gasStation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        marginBottom:3,
       // alignItems: 'center',
        //justifyContent: 'center'
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
    flat:{
        marginBottom:3,
        borderRadius:20,
        
    },
    items:{
        color: '#314256',
        fontFamily: 'Montserrat-Bold',
        marginBottom:5,
        marginLeft:5

    },
    button:{
        marginLeft:5,
        marginRight:20,
        marginEnd:5,
        marginTop:5,
        marginBottom:5,
        borderRadius:20,
        //borderWidth: 2,
        shadowColor: '#000000',
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.58,
        shadowRadius:16,
        elevation:24,
        //borderStyle:2
        width:'100%'
    }
});