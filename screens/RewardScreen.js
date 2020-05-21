import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import { Item } from "native-base";
import { isConstructorDeclaration } from "typescript";
//this.props.navigation.navigate('Home', {data:this.state.image})
class RewardScreen extends Component{
  
  constructor(props){
    const user=[];
    super(props)
    this.state={
      image: '',
      emailid:firebase.auth().currentUser.email,
      userData:[],
      keyid:'abcde'
    }
  }
  goToPickImage=()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      console.log(image);
      this.setState({image:image.path})
      this.props.navigation.navigate('Home', {image: this.state.image});
      
    });
  }
  getUser = () =>{
    fetch('https://wego-275411.firebaseio.com/users.json')
    .then((res)=> res.json())
    .then((usernm)=>{
      console.log('hi',usernm);
      const user=[];
      for(const key in usernm){
        const st1=usernm[key].email
        const st2=st1.toLowerCase();
        console.log( typeof usernm[key].email,'$',typeof this.state.emailid);
        console.log(st2,'-',this.state.emailid)
       if(st2 == this.state.emailid){
        this.setState({
         userData:usernm[key]
        })
        
        //this.setState({name:user.name})
        console.log(this.state.userData);
      }
      if(this.state.userData.name != null)
        break;
    }
    
    })
  }
  setname = async ()=>{
try{
await AsyncStorage.setItem('name',this.state.userData.name)
}catch (error){
  console.log(error);
  
}
  }
    render(){
this.getUser();
this.setname();

        return(
              <View style={styles.container}>
                  <TouchableOpacity style={{alignSelf: "flex-start", marginleft: 15,}} onPress={()=>this.props.navigation.navigate('Home')}>
                  <Image 
                  source={require('./images/back.png')}
                  style={{ width: 21.96, height: 21}} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=> this.goToPickImage()}
                  placeholder={'ADD PHOTO'}
                  placeholderTextColor={'black'}
                  style={{width: 160, height: 160, alignSelf: "center",borderRadius:160,backgroundColor:'blue'}}>
                    {this.state.image != '' &&(
                  <Image source={{uri: this.state.image}}
                style={{ width: 160, height: 160, alignSelf: "center",borderRadius:160}} />
                    )}
              </TouchableOpacity>
                    <Text style={styles.Text}>{this.state.userData.name}</Text>
        <View style={{flexDirection: "row"}}>
        <Image 
                source={require('./images/coin.png')}
                title="50wc"
                style={{ width: 24, height: 24, alignSelf: "center", marginVertical: 0}} />
                <Text style={{alignSelf: "center"}}>50wc</Text>
                </View>
                <Text style={styles.footerTxt}>WeGo</Text>
                </View>
         
        );
      }
    
    
}
export default RewardScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
       alignItems: 'center',
      //  justifyContent: 'center'
    },
    Text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginLeft: 0,
        marginRight: 0,
        color: '#314256',
        marginHorizontal: 0,
        marginTop: 0,
    },
    
      footerTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        alignSelf: 'center',
        color: '#314256',
        marginTop: 90,
        marginBottom: 16,
        marginRight: 0,
        marginLeft: 0,
      },
    }
    );