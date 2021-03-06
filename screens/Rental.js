import React, { Component ,} from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    Image,
} from "react-native"
import firebase, { auth } from "firebase";
import config from '../config/firebase';
class Rental extends Component{
    constructor(){
        super()
        this.state={
            Rents: []
        }
    }
    componentDidMount = () => {
            var data = firebase.database().ref(`/Rental/`);
            data.on("value", datasnap => {
                console.log(Object.values(datasnap.val()))
                this.setState({ Rents: Object.values(datasnap.val()) })
            })
    }
    renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <View
            style={{ flex: 2 }}>
                <Image
                    style={{ width: null, height: 120, resizeMode:'cover', marginVertical: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10,flex:2 }}
                    source={{ uri: item.image }} />
                    </View>
                <View style={{ flexDirection: 'column', height: "100%", flex: 1 }}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{item.name}</Text>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={styles.items}>{item.details}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.items}>{item.price}</Text>
                </View>
            </View>
        )

    }
    render(){
        return(
            <View style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
                <Text style={styles.Text}>Nearby:</Text>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"center"}}>              
                <TouchableOpacity style={styles.signButton} activeOpacity={0.5} onPress={()=> this.props.navigation.navigate("rental")}>
            <Text style={styles.btnTxt}>Car Rentals</Text>
          </TouchableOpacity>
          </View>  
                <Text style={styles.Text}>For Rent</Text>
                <FlatList style={styles.flat}
                    data={this.state.Rents}
                    renderItem={this.renderItem}
                    numColumns={2}/>
              <Text style={styles.Textavailable}>Rent Store Services available soon with more travelling gears</Text>     
            </View>

        );
    }
}export default Rental;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal:5,
        flex:0.5,
        alignContent:'space-between',
        elevation: 6,
    },
    flat: {
        marginHorizontal: 15
    },
    btnTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        textAlign: 'center',
        color: '#000000',
        backgroundColor: '#BDC7D4',
        padding: 0,
        alignContent: 'space-between',
        marginHorizontal: 5,
        marginBottom: 0.5,
        marginTop: 0,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        left: 0,
        bottom: 0,
        width: 138,
        height: 52,
      },
      signButton: {
        alignSelf: 'center',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
      },
    Text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: '#314256',
        marginHorizontal: 0,
        marginTop: 10,
        flex:1,
        alignItems:'center'
    },
    items: {
        color: '#314256',
        fontFamily: 'Montserrat-Regular',
        marginLeft: 5,
        textAlign: 'left',
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
    Textavailable:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: '#314256',
        marginHorizontal: 0,
        marginTop: 40,
        flex:1,
        alignItems:'center',
        paddingLeft:10
    }
})