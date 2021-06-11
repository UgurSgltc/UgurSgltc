import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet,ScrollView,KeyboardAvoidingView,TouchableOpacity,RefreshControl,Modal, FlatList,Alert,Platform,ActivityIndicator, Dimensions,ImageBackground,StatusBar} from 'react-native';
import { Container,Grid,Thumbnail,Col,Row, Content,Icon,Item,Input, Text,Body, ListItem,List,Left,Right, Label } from 'native-base';
import {Image,View, Card,Subtitle,Caption,Button,Title, Html} from '@shoutem/ui';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import KVKKSozlesme from './sozlesme/kvkk';
import FaktodeksSozlesme from './sozlesme/faktodeks';
import { Checkbox } from 'react-native-paper';

import Menu from './inc/header';
import OneSignal from 'react-native-onesignal';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name:'',
        tckn :'',
        email:'',
        tel:'',
        giris:1,
        sifre1:'',
        hataEmail:0,

        onesignal_token:null,
        hataTckn:0,
        sifre2:'',
        register:0,
        kvkk:false,
        fakto: false,
        sifre:1,
        sifreTekrar:0,
        modalVisible2:false,
        modalVisible:false,
        modalLoading:false
    }
     
  }
  
setModalVisible(visible) {
    this.setState({modalVisible: visible});
    }
setModalVisible2(visible) {
this.setState({modalVisible2: visible});
}
setModalLoading(visible) {
    this.setState({ modalLoading: visible });
}
async control(){
    const { params } = this.props.navigation.state;
    if(params){
        if(params.onesignal_token){
            this.setState({onesignal_token:params.onesignal})
        }
    }
}

validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    this.setState({email:text,hataEmail : 1})
    return false;
      }
    else {
        this.setState({email:text,hataEmail : 0})
        console.log("Email is Correct");
        }
    }
    
async tcKontrol(tcKontrol) {
    const tcno = String(tcKontrol);
    if (tcno.substring(0, 1) === '0') {
        console.log(tcKontrol)
        console.log("Tckn not correct");
        this.setState({tcknLogin:tcKontrol,hataTckn : 1})
    }else{
        
        console.log("Tckn doğru");
        this.setState({tcknLogin:tcKontrol,hataTckn : 0})
        }
    if (tcno.length !== 11) {
        console.log("Tckn not correct");
        this.setState({tcknLogin:tcKontrol,hataTckn : 1})
    }else{
        
        console.log("Tckn doğru");
        this.setState({tcknLogin:tcKontrol,hataTckn : 0})
        }
    var ilkon_array = tcno.substr(0, 10).split('');
    var ilkon_total = hane_tek = hane_cift = 0;

    for (var i = j = 0; i < 9; ++i) {
      j = parseInt(ilkon_array[i], 10);
      if (i & 1) { // tek ise, tcnin çift haneleri toplanmalı!
          hane_cift  += j;
      } else {
          hane_tek += j;
      }
      ilkon_total += j;
    }

    if ( (hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno.substr(-2, 1), 10)) {
        console.log("Tckn not correct");
        this.setState({tcknLogin:tcKontrol,hataTckn : 1})
    }else{
        
        console.log("Tckn doğru");
        this.setState({tcknLogin:tcKontrol,hataTckn : 0})
        }

    ilkon_total += parseInt(ilkon_array[9], 10); 
    if (ilkon_total % 10 !== parseInt(tcno.substr(-1), 10)) {
        console.log("Tckn not correct");
        this.setState({tcknLogin:tcKontrol,hataTckn : 1})
    }else{
        
    console.log("Tckn doğru");
    this.setState({tcknLogin:tcKontrol,hataTckn : 0})
    }

    }
    
async loginFetch() {
    const { params } = this.props.navigation.state;
    if(params){
      var  onesignal_token = params.onesignal_token
    }else{
      var  onesignal_token = null
    }
  if ( this.state.tcknLogin == null || this.state.sifreLogin == null) {
      Alert.alert(
          '',
             'Tüm Alanları Eksiksiz Doldurunuz.',
          [
              { text: 'OK' },
          ],
          { cancelable: false },
      );
  }else if(this.state.hataTckn == 1){
    Alert.alert(
        '',
           'Tckn yanlış',
        [
            { text: 'OK' },
        ],
        { cancelable: false },
    );
  }
  
  else {
        try {
            let response = await fetch('https://pro.faktodeks.com//api/login', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tckn: this.state.tcknLogin,
                    parola: this.state.sifreLogin,
                    onesignal_token:onesignal_token
                }),
            });
            console.log(response);
            if (response.status == '200' || response.status == '201') {
                let responseJson = await response.json();
              await AsyncStorage.setItem('@myStores:access_token', responseJson.access_token);
                this.props.navigation.navigate('Anasayfa');
            }
            else if(response.status == '404') {
                let responseJson = await response.json();
                this.setState({ hata: '1'})
                Alert.alert(
                    '',
                      responseJson.error,
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
                
            }else{
                alert("Büyük Hata")
            }
        } catch (error) {
            console.error(error);
        }
    }
}
async insertUser(){
    const { params } = this.props.navigation.state;
    if(params){
        var  onesignal_token = params.onesignal_token
      }else{
        var  onesignal_token = null
      }
    if(this.state.sifre1 != this.state.sifre2){
        Alert.alert(
            '',
             'Parolalar Uyuşmuyor',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
    }else if(this.state.kvkk == false){
        Alert.alert(
            '',
             'Lütfen Kvkk sözleşmesini onaylayınız.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
    }
    else if(this.state.fakto == false){
        Alert.alert(
            '',
             'Lütfen fakto sözleşmesini onaylayınız.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
    }
     else if(this.state.name == ''   ||  this.state.tel == ''  || this.state.email == ''  || this.state.tcknLogin == '' ){
        Alert.alert(
            '',
             'Tüm Alanları Eksiksiz Doldurunuz.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
      }
      else if(this.state.sifre1.length < 8 ){
        Alert.alert(
          '',
          'Şifreniz 8 karakterden az olamaz',
          [
              { text: 'Anladım' },
          ],
          { cancelable: false },
      );
    }
      else if(this.state.hataTckn == 1){
        this.setModalLoading(false);
        Alert.alert(
            '',
               'Tckn yanlış',
            [
                { text: 'OK' },
            ],
            { cancelable: false },
        );
      }
      
      else{
        this.setModalLoading(true);
          try{
            let response = await fetch(`https://pro.faktodeks.com//api/register`, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    parola:this.state.sifre1,
                    tel: this.state.tel,
                    email:this.state.email,
                    onesignal_token:onesignal_token,
                    tckn: this.state.tcknLogin
                }),
            });
            console.log(response);
            if (response.status == '200' || response.status == '201') {
                this.setModalLoading(false);
                let responseJson = await response.json();
              this.props.navigation.navigate('SmsOnay',{tckn:this.state.tcknLogin,sms:responseJson.sms,parola:this.state.sms,telefon:responseJson.gsm,token:responseJson.access_token});
            }else if(response.status == '203'){
                Alert.alert(
                    '',
                    ' Bu tckn ile bir üyelik mevcut,şifrenizi hatırlatmamızı ister misiniz?',
                    [
                        {   text: 'Hatırlat', onPress: () =>  {this.props.navigation.navigate('TcSifre',{tckn : this.state.tcknLogin}), this.setModalLoading(false)}  },
                        {   text: 'Vazgeç', onPress: () =>  this.setModalLoading(false) },
                    ],
                    { cancelable: false },
                );
           
            } else {
                this.setModalLoading(false);
                alert("hata")
              this.setState({ hata: '1'})
            }

          }
          catch(error){

          }
      }
  }
  render() {
 
    const { params } = this.props.navigation.state;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    const tarih =date+'/'+month+'/'+year ;
    return (
        this.state.giris == 1 ? 
      
        <Container >
       
        <ImageBackground source={require('./images/Background.png')}  style={{width: '100%', height: '100%'}}>
        <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalLoading}
                        onRequestClose={() => {
                            this.setState({ modalLoading: false })
                        }}>
                        <View style={{ flex: 1, borderRadius: 10, backgroundColor: 'rgba(135, 135, 135, 0.35)', justifyContent: 'center', alignItems: 'center' }} >
                            <View style={styles.modalViewLoading} >

                                <View style={styles.modalUst} >
                               <ActivityIndicator size="large" color="#FFBA00"/>
                                </View>

                            </View>
                        </View>
                    </Modal>

                    <Menu backNo="a" yer='' profilNo="a"/>
                   







            <ScrollView>
            {/* {this.state.giris == 1 ? 
                           <View styleName="horizontal flexible" style={{paddingHorizontal:30,marginTop:20}}>
                            <Button styleName="full-width muted" style={{ backgroundColor:'#00FFF5',borderTopLeftRadius:25,borderBottomLeftRadius:25,height:HEIGHT/20}} onPress={() => this.setState({giris:1})}>
                                <Text style={{color:'#011153'}}>Giriş Yap</Text>
                            </Button>
                            <Button styleName="full-width muted" style={{backgroundColor:'#116D96',borderBottomRightRadius:25,borderTopRightRadius:25,height:HEIGHT/20}} onPress={() => this.setState({giris:2})}>
                                <Text style={{color:'#fff'}}>Üye Ol</Text>
                            </Button>
                            </View>
                        :
                        <View styleName="horizontal flexible" style={{paddingHorizontal:30,marginTop:20}}>
                            <Button styleName="full-width muted" style={{backgroundColor:'#116D96',height:HEIGHT/20}}  onPress={() => this.setState({giris:1})}>
                                <Text style={{color:'#fff'}}>Giriş Yap</Text>
                            </Button>
                            <Button styleName="full-width muted" style={{backgroundColor:'#00FFF5',height:HEIGHT/20}}  onPress={() => this.setState({giris:2})}>
                                <Text style={{color:'#011153'}}>Üye Ol</Text>
                            </Button>
                            </View>
                             }
      */}



                <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',marginTop:HEIGHT/13  }}>
                        <Subtitle style={{color:'white',fontSize:19}}>Aktif bir Faktodeks üyeliğiniz </Subtitle>
                        <Text style={{color:'white',fontSize:19}}>varsa hemen giriş yapın</Text>
                    </Row>
                <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column' ,paddingHorizontal:20,marginTop:20}}>
                {this.state.hataTckn == 1 ? 
                        <Item error  style={styles.item}>
                            <Input placeholder='TCKN'
                             maxLength={11}
                            placeholderTextColor='black'
                            keyboardType='numeric'
                            returnKeyType='done'
                             value = {
                                this.state.tcknLogin
                            }
                            placeholderTextColor='#042264'
                            style={{color:'#042264'}}
                            onChangeText={(tcKontrol) => this.tcKontrol(tcKontrol)}
                            />
                        </Item>
                        :  <Item style={styles.item}>
                        <Input placeholder='TCKN'
                         maxLength={11}
                        placeholderTextColor='#042264'
                        keyboardType='numeric'
                        returnKeyType='done'
                         value = {
                            this.state.tcknLogin
                        }
                        placeholderTextColor='#042264'
                        style={{color:'#042264'}}
                        onChangeText={(tcKontrol) => this.tcKontrol(tcKontrol)}
                        />
                    </Item> }
                        <Item style={styles.item}>
                            <Input placeholder='ŞİFRE'
                               placeholderTextColor='#042264'
                               autoCapitalize = 'none'
                               style={{color:'#042264'}}
                                value = {
                                    this.state.sifreLogin
                                }
                                secureTextEntry={  this.state.sifre == 1 ? true : false}
                                onChangeText = {(value) => this.setState({sifreLogin: value})}
                                placeholderTextColor='#042264'
                                onSubmitEditing={this.loginFetch.bind(this)}
                            />
                              {this.state.sifre == 1 ?
                            
                  
                            <TouchableOpacity onPress={()=>  { this.setState({sifre:0})  } }>
                                <Entypo  name='eye' style={{color:'#042264',fontSize:20,paddingRight:10}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>  { this.setState({sifre:1})  } }>
                                <Entypo  name='eye-with-line' style={{color:'#042264',fontSize:20,paddingRight:10}}/>
                            </TouchableOpacity>
                                }
                        </Item>
                </Row>
                <Row style={{ justifyContent:'center',alignItems:'center', texAlign:'center',marginTop:HEIGHT/12}}>
                 <TouchableOpacity style={{flexDirection:'row'}}  onPress={()=>this.props.navigation.navigate('TcSifre',{onesignal_token:this.state.onesignal_token})}>
                    <Text style={{color:'white',fontSize:14,borderBottomColor:'white',borderBottomWidth:0.5}}>Şifremi Unuttum</Text>
                    <EvilIcons  name='chevron-right' style={{color:'white',fontSize:25,marginTop:2}}/>
                </TouchableOpacity>
              </Row>
             
                </ScrollView>

                <Row style={{ justifyContent:'center',top:40,padding:10}}>
                <Button  style={{backgroundColor:'#116D96',height:HEIGHT/23,width:WIDTH/2,justifyContent:'center',borderRadius:13}}  onPress={() => this.setState({giris:2})}>
                                <Text style={{color:'#011153',}}>Üye Ol</Text>
                            </Button>
                            </Row>


                <Row style={{ justifyContent:'center',marginBottom:100,bottom:40,padding:10}}>

              <TouchableOpacity   onPress={this.loginFetch.bind(this)} >
                    <Image
                            style={{width:WIDTH/2,resizeMode:'contain',marginTop:20,}}
                            source={require('./assets/giris.png')} 
                        />
            </TouchableOpacity>
              </Row>

    </ImageBackground>
  </Container>
    
        :
        <KeyboardAvoidingView
        style={{flex:1}}
        behavior="padding"
      >
    <Container >
    <ImageBackground source={require('./images/Background.png')}  style={{width: '100%', height: '100%'}}>
    <Menu backNo="a" yer='' profilNo="a"/>
<Content>

        {/* {this.state.giris == 1 ? 
            <View styleName="horizontal flexible" style={{paddingHorizontal:30,marginTop:20}}>
            <Button styleName="full-width muted" style={{ backgroundColor:'#00FFF5',borderTopLeftRadius:25,borderBottomLeftRadius:25}} onPress={() => this.setState({giris:1})}>
                <Text style={{color:'#011153'}}>Giriş Yap</Text>
            </Button>
            <Button styleName="full-width muted" style={{backgroundColor:'#116D96',borderBottomRightRadius:25,borderTopRightRadius:25}} onPress={() => this.setState({giris:2})}>
                <Text style={{color:'#042264'}}>Üye Ol</Text>
            </Button>
            </View>
        :
            <View styleName="horizontal flexible" style={{paddingHorizontal:30,marginTop:20}}>
            <Button styleName="full-width muted" style={{backgroundColor:'#116D96',borderTopLeftRadius:25,borderBottomLeftRadius:25,height:HEIGHT/20}}  onPress={() => this.setState({giris:1})}>
                <Text style={{color:'#fff'}}>Giriş Yap</Text>
            </Button>
            <Button styleName="full-width muted" style={{backgroundColor:'#00FFF5',borderBottomRightRadius:25,borderTopRightRadius:25,height:HEIGHT/20}}  onPress={() => this.setState({giris:2})}>
                <Text style={{color:'#011153'}}>Üye Ol</Text>
            </Button>
            </View>
        } */}
        <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column' ,paddingHorizontal:20 }}>
        {this.state.hataTckn == 1 ? 
                        <Item error style={styles.item}>
                            <Input placeholder='TCKN'
                             maxLength={11}
                            placeholderTextColor='#042264'
                            keyboardType='numeric'
                             value = {
                                this.state.tcknLogin
                            }
                            placeholderTextColor='#042264'
                            style={{color:'#042264'}}
                            onChangeText={(tcKontrol) => this.tcKontrol(tcKontrol)}
                            />
                        </Item>
                        :  <Item style={styles.item}>
                        <Input placeholder='TCKN'
                         maxLength={11}
                        placeholderTextColor='#042264'
                        keyboardType='numeric'
                         value = {
                            this.state.tcknLogin
                        }
                        placeholderTextColor='#042264'
                        style={{color:'#042264'}}
                        onChangeText={(tcKontrol) => this.tcKontrol(tcKontrol)}
                        />
                    </Item> }
                    <Item style={styles.item}>
                <Input placeholder='AD SOYAD'
                placeholderTextColor='#042264'
                style={{color:'#042264'}}
                value = {
                    this.state.name
                }
                onChangeText = {(value) => this.setState({name: value})}
                />
            </Item>
            <View style={{flexDirection:'row'}}>
           
            <Item style={[styles.item]} inlineLabel>
                <Label  style={{color:'#042264'}}>+90</Label>
                <Input placeholder='TEL'
                placeholderTextColor='#042264'
                keyboardType='numeric'
                style={{color:'#042264'}}
                maxLength={10}
                value = {
                    this.state.tel
                }
                onChangeText = {(value) => this.setState({tel: value})}
                />
            </Item>
            </View>
            {this.state.hataEmail == 1 ? 
           <Item error style={styles.item}>
                <Input placeholder='E POSTA'
                placeholderTextColor='#042264'
                autoCapitalize = 'none'
                keyboardType="email-address"
                style={{color:'#042264'}}
                
                value = {
                    this.state.email
                }
                onChangeText={(text) => this.validate(text)}
                />
                </Item>
                :
                <Item style={styles.item}>
                <Input placeholder='E POSTA'
                placeholderTextColor='#042264'
                autoCapitalize = 'none'
                keyboardType="email-address"
                style={{color:'#042264'}}
                
                value = {
                    this.state.email
                }
                onChangeText={(text) => this.validate(text)}
                />
            </Item>}
            <Item style={styles.item}>
                <Input placeholder='ŞİFRE'
                placeholderTextColor='#042264'
                autoCapitalize = 'none'
                style={{color:'#042264'}}
                value = {
                    this.state.sifre1
                }
                onChangeText = {(value) => this.setState({sifre1: value})}
                secureTextEntry={  this.state.sifre == 1 ? true : false}
                />
                {this.state.sifre == 1 ?
                
       
                <TouchableOpacity onPress={()=>  { this.setState({sifre:0})  } }>
                     <Entypo  name='eye' style={{color:'#042264',fontSize:20,paddingRight:10}}/>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>  { this.setState({sifre:1})  } }>
                     <Entypo  name='eye-with-line' style={{color:'#042264',fontSize:20,paddingRight:10}}/>
                </TouchableOpacity>
                    }
            </Item>
            <Item style={styles.item}>
                <Input placeholder='ŞİFRE TEKRAR'
                placeholderTextColor='#042264'
                autoCapitalize = 'none'
                style={{color:'#042264'}}
                value = {
                    this.state.sifre2
                }
                onChangeText = {(value) => this.setState({sifre2: value})}
                  secureTextEntry={  this.state.sifreTekrar == 1 ? true : false}
                />
                  {this.state.sifreTekrar == 1 ?
                <TouchableOpacity onPress={()=>  { this.setState({sifreTekrar:0})  } }>
                     <Entypo  name='eye' style={{color:'#042264',fontSize:20,paddingRight:10}}/>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>  { this.setState({sifreTekrar:1})  } }>
                     <Entypo  name='eye-with-line' style={{color:'#042264',fontSize:20,paddingRight:10}}/>
                </TouchableOpacity>
                    }
            </Item>
        </Row>
      
            <View style={{flexDirection:'column',marginTop:15 }}>
            <TouchableOpacity style={{ flexDirection: 'row' }}  onPress={() => {this.setModalVisible2(true) }} >
                    <Checkbox.Android
                     uncheckedColor='white'
                     color='#00FFF5'
                     style={{borderColor:'white',borderWidth:1}}
                    status={this.state.kvkk ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ kvkk: !this.state.kvkk }); }}
                />
                <Text style={{marginTop: 5,color:'white',paddingRight:10,fontSize:WIDTH/35}}> KVKK Aydınlatma metni ve açık rıza sözleşmesini okudum.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {this.setModalVisible(true) }}>
                <Checkbox.Android
                  color='#00FFF5'
                     style={{borderColor:'white',borderWidth:1}}
                  uncheckedColor='white'
                    status={this.state.fakto ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ fakto: !this.state.fakto }); }}
                />
                <Text style={{marginTop: 5,color:'white',paddingRight:10,fontSize:WIDTH/35}}> FAKTODEKS kullanıcı sözleşmesini okudum.</Text>
            </TouchableOpacity>
                
            </View>
          
            <Row style={{ justifyContent:'center'  }}>
            <TouchableOpacity   onPress={this.insertUser.bind(this)}>
                <Image
                        style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                        source={require('./assets/giris.png')} 
                    />
        </TouchableOpacity>
        </Row>
</Content>
    </ImageBackground>
    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalLoading}
                        onRequestClose={() => {
                            this.setState({ modalLoading: false })
                        }}>
                        <View style={{ flex: 1, borderRadius: 10, backgroundColor: 'rgba(135, 135, 135, 0.35)', justifyContent: 'center', alignItems: 'center' }} >
                            <View style={styles.modalViewLoading} >

                                <View style={styles.modalUst} >
                               <ActivityIndicator size="large" color="#FFBA00"/>
                                </View>

                            </View>
                        </View>
                    </Modal>
    <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        this.setModalVisible2(!this.state.modalVisible);
      }}>
       
      <Content style={{padding:20,height:HEIGHT/1.5,backgroundColor:'#f3f3f3'}}>
          <FaktodeksSozlesme name={this.state.name} tckn={this.state.tckn} tel={this.state.tel} email={this.state.email}/>
          <Row style={{ justifyContent:'center' ,marginTop:20 }}>
              <TouchableOpacity   onPress={() => { this.setState({ fakto: true ,modalVisible:false}); }}>
            <Image
                    style={{width:WIDTH/2.5,resizeMode:'contain', padding:20}}
                    source={require('./assets/gonder.png')} 
                />
                </TouchableOpacity>
            </Row>
          <Row style={{height:50}}>

          </Row>
        </Content>
    </Modal>
    <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible2}
      onRequestClose={() => {
        this.setModalVisible2(!this.state.modalVisible2);
      }}>
       
      <Content style={{padding:20,height:HEIGHT/1.5,backgroundColor:'#f3f3f3'}}>
          <KVKKSozlesme  name={this.state.name} tckn={this.state.tckn} tel={this.state.tel} email={this.state.email}/>
          <List>
              <ListItem style={{flexDirection:'row'}}>
                 
                  <Text>Tarih : </Text>
                    <Text > {tarih}</Text>
                 
              </ListItem>
              <ListItem style={{flexDirection:'row'}}>
                  <Text>Ad Soyad : </Text>
                    <Text> {this.state.name}</Text>
              </ListItem>
          </List>
          
          <Row style={{ justifyContent:'center',marginTop:20  }}>
              <TouchableOpacity   onPress={() => { this.setState({ kvkk: true,modalVisible2:false }); }}>
                    <Image
                            style={{width:WIDTH/2.5,resizeMode:'contain', padding:20}}
                            source={require('./assets/gonder.png')} 
                        />
                </TouchableOpacity>
            </Row>
          <Row style={{height:50}}>

          </Row>
        </Content>
    </Modal>
    
</Container>
</KeyboardAvoidingView>
      );

}
}
const styles = StyleSheet.create({
    item:{
        width:'100%', 
        backgroundColor:'#fff',
        borderRadius:10,
        borderColor:'transparent',
        borderWidth:1,
        marginTop:20
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
    height: HEIGHT / 2,
    width: WIDTH / 1.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
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

modalViewLoading: {
    height: HEIGHT / 2,
    width: WIDTH / 1.5,
    justifyContent: 'space-around',
},
modalUst: {
    width:WIDTH/1.5,
    height:HEIGHT/2,
      justifyContent: 'space-around',
      paddingHorizontal: 30,
      paddingTop: 20
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