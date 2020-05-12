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
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Assist', item )}>
            <Image
            style={{width:15,height:15}}
            source={{uri:item.icon}}/>
            <View>
            <Text>{item.name}</Text>
        <Text>{item.vicinity}</Text>
       {item.opening_hours? <Text>open</Text>:<Text>closed</Text>}
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
           console.log(responseJson.results[1]);
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
        borderBottomWidth: 1,
        borderTopWidth:1
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
        borderBottomWidth: 1,
    }
});