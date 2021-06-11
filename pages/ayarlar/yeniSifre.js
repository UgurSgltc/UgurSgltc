import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
class yeniSifre extends Component {
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
  if(this.state.sifre1 == '' ||  this.state.sifre2 == ''  ||  this.state.mevcutSifre == ''  ){
      Alert.alert(
          '',
           'Tüm Alanları Eksiksiz Doldurunuz.',
          [
              { text: 'Anladım' },
          ],
          { cancelable: false },
      );
    }
      else{
        try{
          const myToken = await AsyncStorage.getItem('@myStores:access_token');
          let response = await fetch(`https://pro.faktodeks.com//api/yeniSifre`, {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  mevcutSifre: this.state.mevcutSifre,
                  yeniSifre: this.state.sifre1,
                  token:myToken,
              }),
          });
          console.log(response);
          if (response.status == '200' || response.status == '201') {
              let responseJson = await response.json();
              this.setModalSuccess(true);
          } else if(response.status == '404'){
            this.setModalSifre(true);
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
          <Menu yer='Şifre Değiştir'/>
          <Content style={{backgroundColor:'white'}}>
                  <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,height:70,flexDirection:'column',marginTop:30}}>
                            <Text style={{fontSize:25,fontWeight:'bold',color:'#042264'}}>Yeni Şifreni Oluştur</Text>
                            <Text style={{fontSize:15,color:'#042264'}}>Şifreniz 6 karakterden oluşmalı,</Text>
                            <Text style={{fontSize:15,color:'#042264'}}>büyük harf ve rakam içermelidir.</Text>
                  </Row>
                  
                    <View  style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,marginTop:30}}>   
                    <Item regular style={{marginTop:15}}>
                            <Input 
                            placeholder="MEVCUT ŞİFRENİZ"
                            placeholderTextColor="#042264"
                               style={{color:'#042264'}}
                               secureTextEntry={  true}
                             value = {
                                this.state.mevcutSifre
                            }
                            onChangeText = {(value) => this.setState({mevcutSifre: value})}
                            placeholderTextColor='#042264'
                            />
                        </Item>
                       
                    <Item style={{marginTop:30}}>
                            <EvilIcons  name='lock' style={{color:'#042264',fontSize:20}}/>
                            <Input placeholder='YENİ ŞİFRE'
                            placeholderTextColor='#042264'
                            style={{color:'#042264'}}
                            value = {
                                this.state.sifre1
                            }
                            onChangeText = {(value) => this.setState({sifre1: value})}
                            secureTextEntry={  this.state.sifre == 1 ? true : false}
                            />
                            {this.state.sifre == 1 ?
                            
                  
                            <TouchableOpacity onPress={()=>  { this.setState({sifre:0})  } }>
                                <Entypo  name='eye' style={{color:'#042264',fontSize:20}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>  { this.setState({sifre:1})  } }>
                                <Entypo  name='eye-with-line' style={{color:'#042264',fontSize:20}}/>
                            </TouchableOpacity>
                                }
                        </Item>
                        <Item>
                            <EvilIcons  name='lock' style={{color:'#042264',fontSize:20}}/>
                            <Input placeholder='YENİ ŞİFRE TEKRAR'
                            placeholderTextColor='#042264'
                            style={{color:'#042264'}}
                            value = {
                                this.state.sifre2
                            }
                            onChangeText = {(value) => this.setState({sifre2: value})}
                              secureTextEntry={  this.state.sifreTekrar == 1 ? true : false}
                            />
                              {this.state.sifreTekrar == 1 ?
                            <TouchableOpacity onPress={()=>  { this.setState({sifreTekrar:0})  } }>
                                <Entypo  name='eye' style={{color:'#042264',fontSize:20}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>  { this.setState({sifreTekrar:1})  } }>
                                <Entypo  name='eye-with-line' style={{color:'#042264',fontSize:20}}/>
                            </TouchableOpacity>
                                }
                        </Item>
       
                
                        </View>
                      <Row style={{ justifyContent:'center' ,marginTop:15,paddingHorizontal:20 }}>
                                  <Button block transparent onPress={this.yeniSifre.bind(this)} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                                    <Text style={{color:'#011153'}}>GÖNDER</Text>
                                  </Button>
                                   
                            </Row>
                </Content>
            
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
export default withNavigation(yeniSifre);
const styles = StyleSheet.create({
 
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