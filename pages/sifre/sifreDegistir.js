import React, { Component } from 'react';
import {
  
    Stack,
    View,
    Dimensions,
    StyleSheet,Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Modal,
    ScrollView,Keyboard,
ActivityIndicator,
    KeyboardAvoidingView,
    Text,
    FlatList,
    RefreshControl,
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import { Container, Grid, Button,Form, Header,Col,Row, Left, Body,Icon,Textarea, Right, Content,Item,Input,Picker, Label,List,ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import {
  TextInputMask
} from 'react-native-masked-text';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';
import IconAnt from 'react-native-vector-icons/AntDesign';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class sifreDegistir extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mevcutSifre:'',
        sifre:1,
        sifreTekrar:1,
        sifre1:'',
        sifre2:'',
        modalSifre:false,
        modalSuccess:false,
        }
         
      }
      
  setModalSifre(visible) {
    this.setState({ modalSifre: visible });
  }   
  setModalSuccess(visible) {
    this.setState({ modalSuccess: visible });
  } 
async yeniSifre(){
  if(this.state.sifre1 != this.state.sifre2 ){
    Alert.alert(
      '',
       'Parolalarınız eşleşmiyor.',
      [
          { text: 'Anladım' },
      ],
      { cancelable: false },
  );}
else if(this.state.sifre1.length < 8 ){
    Alert.alert(
      '',
       'Şifreniz 8 karakterden az olamaz',
      [
          { text: 'Anladım' },
      ],
      { cancelable: false },
  );
    }else{
        try{
          const { params } = this.props.navigation.state;
          let response = await fetch(`https://pro.faktodeks.com//api/sifreDegistir`, {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  yeniSifre: this.state.sifre1,
                  tckn:params.tckn,
              }),
          });
          console.log(response);
          if (response.status == '200' || response.status == '201') {
              let responseJson = await response.json();
              Alert.alert(
                '',
                 'Şifreniz Başarıyla Değişti',
                [
                    { text: 'Anladım' },
                ],
                { cancelable: false },
            );
            this.props.navigation.navigate('Register',{onesignal_token:params.onesignal_token});
          } else if(response.status == '404'){
            Alert.alert(
              '',
               'Beklenmeyen hata',
              [
                  { text: 'Anladım' },
              ],
              { cancelable: false },
          );
          }else{
            alert("olmadı")
          }
        }
        catch(error){
        }
      }
} 
  render() {
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
          <Menu profilNo="a" yer="Şifre Oluştur"/>
          <Content >
                  <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,height:HEIGHT/6,flexDirection:'column',marginTop:30}}>
                            <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>Şifreniz en az 6 karakterden oluşmalı,</Text>
                            <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>büyük harf ve rakam içermelidir.</Text>
                  </Row>
                  
                    <View  style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,marginTop:30}}>   
                    <Item style={[styles.item,{marginTop:30}]}>
                            <Input placeholder='ŞİFRE'
                            placeholderTextColor='#042264'
                            style={{color:'#042264'}}
                            value = {
                                this.state.sifre1
                            }
                            autoCapitalize = 'none'
                            onChangeText = {(value) => this.setState({sifre1: value})}
                            secureTextEntry={  this.state.sifre == 1 ? true : false}
                            />
                            {this.state.sifre == 1 ?
                            
                  
                            <TouchableOpacity onPress={()=>  { this.setState({sifre:0})  } }>
                                <Entypo  name='eye' style={{color:'#042264',fontSize:20,paddingRight:15}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>  { this.setState({sifre:1})  } }>
                                <Entypo  name='eye-with-line' style={{color:'#042264',fontSize:20,paddingRight:15}}/>
                            </TouchableOpacity>
                                }
                        </Item>
                        <Item style={styles.item}>
                            <Input placeholder='ŞİFRE TEKRAR'
                            placeholderTextColor='#042264'
                            style={{color:'#042264'}}
                            value = {
                                this.state.sifre2
                            }
                            autoCapitalize = 'none'
                            onChangeText = {(value) => this.setState({sifre2: value})}
                              secureTextEntry={  this.state.sifreTekrar == 1 ? true : false}
                            />
                              {this.state.sifreTekrar == 1 ?
                            <TouchableOpacity onPress={()=>  { this.setState({sifreTekrar:0})  } }>
                                <Entypo  name='eye' style={{color:'#042264',fontSize:20,paddingRight:15}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>  { this.setState({sifreTekrar:1})  } }>
                                <Entypo  name='eye-with-line' style={{color:'#042264',fontSize:20,paddingRight:15}}/>
                            </TouchableOpacity>
                                }
                        </Item>
       
                
                        </View>
                      
                </Content>
                <Row style={{ justifyContent:'center' ,height:HEIGHT/8 }}>
                          <TouchableOpacity   onPress={this.yeniSifre.bind(this)}>
                              <Image
                                      style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                                      source={require('../assets/gonder.png')} 
                                  />
                      </TouchableOpacity>
                      </Row>
                <Modal
                        animationType="slide"
                        transparent={true}
                      visible={this.state.modalSifre}
                    onRequestClose={() => {
                      this.setModalSifre(!this.state.modalSifre);
                    }}>
                    <Grid onPress={() => this.setModalSifre(false)} style={styles.main}>
                        <Image
                              source={require('../images/sifreHata.png')}
                              style={{position:'absolute',resizeMode:'contain',   width: WIDTH/1.4,
                              height: HEIGHT/2,}}
                            />
                    </Grid>

                  </Modal>
                <Modal
                        animationType="slide"
                        transparent={true}
                      visible={this.state.modalSuccess}
                    onRequestClose={() => {
                      this.setModalSuccess(!this.state.modalSuccess);
                    }}>
                    <Grid onPress={() => this.setModalSuccess(false)} style={styles.main}>
                        <Image
                              source={require('../images/sifreBasari.png')}
                              style={{resizeMode:'contain',
                              width: WIDTH/1.4,
                              height: HEIGHT/2,
                            }}
                            />
                    </Grid>

                  </Modal>
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(sifreDegistir);
const styles = StyleSheet.create({
  item:{
    width:'100%', 
    backgroundColor:'#fff',borderRadius:10,
    borderColor:'#fff',
    borderWidth:1,
    marginTop:20
},
  main: {
     backgroundColor: 'rgba(0,0,0,0.9)',
     width: WIDTH/1,
     height: HEIGHT/1,
     alignItems: 'center',
     justifyContent:'center',
     flex: 0,
     marginLeft: 'auto',
     marginRight: 'auto',
     marginBottom: 'auto'
  
  },
});