import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Platform,
  
    Stack,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Text,
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
    Linking
  } from 'react-native';
  import { Container,  Button, Header,Col,Row, Left, Body, Right, Content, List,ListItem,Icon } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default class Profilim extends Component {
    constructor(props) {
        super(props);
        this.state = {
        taleplerim:'a',
        name:''
    }
     
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.checkToken()
        });
  }
  checkToken = async () =>{
    const myToken = await AsyncStorage.getItem('@myStores:access_token');
    if (myToken) {
      try {
        let response = await fetch(`https://pro.faktodeks.com//api/getUser/${myToken}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          console.log('ham veri: ', responseJson);
          if(responseJson[0] != null){
            this.setState({name : responseJson[0].name})
          }else{
            this.setState({name : ''})
          }
        } else {
          this.props.navigation.navigate('Register')}
  
    } catch (error) {
        console.error(error);
    }
    } else {
      this.props.navigation.navigate('Register')
    }
  }  
  async removeKey() {
    Alert.alert(
        '',
        'Çıkış Yapmak İstediğinize Emin miniz?' ,
        [
            {
                text:'Hayır',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Evet', onPress: async () => {
                  await AsyncStorage.removeItem('@myStores:access_token');
                    this.props.navigation.navigate('Register');
                },

            },
        ],
        { cancelable: false },
    );
}
_pressCall=()=>{
  const url="tel://08504710720"
  Linking.openURL(url)
}
  render() {
    return (

        
        <Container >
          <Menu yer="Yardım" />
      <Content style={{backgroundColor:'#fff'}}>
          <List style={{backgroundColor:'#fff'}}>

           <ListItem onPress={() =>this.props.navigation.navigate('YeniSifre')}>
              <Left>
                  <Text style={{color:'#042264'}}>Sıkça Sorulan Sorular</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{color:'#00FFF5'}} />
                </Right>
            </ListItem>
           <ListItem  onPress={() =>this.props.navigation.navigate('Bildirimler')}>
              <Left>
                  <Text style={{color:'#042264'}}>Nasıl Kullanılır</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{color:'#00FFF5'}} />
                </Right>
            </ListItem>
           <ListItem onPress={this._pressCall}>
              <Left>
                  <Text style={{color:'#042264'}} >Bizi  Arayın</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{color:'#00FFF5'}} />
                </Right>
            </ListItem>
           <ListItem onPress={() =>this.props.navigation.navigate('BizeYazin')}>
              <Left >
                  <Text style={{color:'#042264'}}>Bize Yazın</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{color:'#00FFF5'}} />
                </Right>
            </ListItem>
          
            </List>
        
        </Content> 
       
       </Container>
       );

}
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'transparent',
        shadowOpacity: 0.1,
        shadowOffset: {x: 2, y: 2},
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,
      },
      actionBtn: {
        backgroundColor: '#1E90FF',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
      },
card:{
   width:WIDTH/3.5,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    marginLeft:10,
   },
   imageCard:{
       borderRadius:20,
      
       resizeMode:'contain'
   },
   
  modalView: {
    flex:1,
     width: WIDTH /1,
     backgroundColor: '#FFFFFF',
     borderTopLeftRadius: 10,
     borderTopRightRadius: 10,
     borderWidth: 1,
     bottom:0,
     borderColor: 'gray',
     ...Platform.select({
         ios: {
             shadowColor: '#000',
             shadowOffset: { width: 5, height: 5 },
             shadowOpacity: 0.5,
             shadowRadius: 2,
         },
         android: {
             elevation: 8,
         },
     }),
     justifyContent: 'space-around',
 },
   hr:{
    borderTopWidth:0.5,
    borderTopColor:'#e7e7e7',
    paddingTop:10
   },

   kategori:{
    flexDirection:'column',
    height:HEIGHT/4,
    justifyContent:'center',
    alignItems:'center',
},

});