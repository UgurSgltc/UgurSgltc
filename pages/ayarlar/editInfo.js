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
  import { Container,  Button, Header,Col,Row, Left, Body,Icon,Grid, Right, Content,Item,Input,Picker, Label,List,ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import { Checkbox } from 'react-native-paper';
import {
  TextInputMask
} from 'react-native-masked-text';
import {   TextInput } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';


const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class editInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sektor : '',
          firma_vkn : '',
          firma_unvan : '',
          vergi_dairesi :'',
          firma_tel : '',
          email : '',
          hataEmail:0,
          hataTckn:0,
          website : '',
          il : '',
          ilce : '',
          semt : '',
          cadde : '',
          kapi_no : '',
          daire_no : '',
          yetkili_tckn : '',
          yetkili_ad : '',
          yetkili_tel : '',
          yetkili_mail : '',
          yetkili_unvan : '',
          modalLoading:false,
        }
         
      }
      
setModalLoading(visible) {
    this.setState({modalLoading: visible});
    }
 componentDidMount() {
  const { navigation } = this.props;
  navigation.addListener('willFocus', () => {
    this.checkToken()
      });
}
checkToken = async () =>{
  this.setModalLoading(true);
  const myToken = await AsyncStorage.getItem('@myStores:access_token');
  if (myToken) {
    try {
      let response = await fetch(`https://pro.faktodeks.com//api/getFirma/${myToken}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      });
      if (response.status == '200' || response.status == '201') {
        let responseJson = await response.json();
        console.log('ham veri: ', responseJson);
        this.setModalLoading(false);
        if(responseJson[0] != null){
          this.setState({
              sektor : responseJson[0].sektor,
              firma_vkn : responseJson[0].firma_vkn,
              firma_unvan : responseJson[0].firma_unvan,
              vergi_dairesi : responseJson[0].vergi_dairesi,
              firma_tel : responseJson[0].firma_tel,
              email : responseJson[0].email,
              website : responseJson[0].website,
              il : responseJson[0].il,
              ilce : responseJson[0].ilce,
              semt : responseJson[0].semt,
              cadde : responseJson[0].cadde,
              kapi_no : responseJson[0].kapi_no,
              daire_no : responseJson[0].daire_no,
              yetkili_tckn : responseJson[0].yetkili_tckn,
              yetkili_ad : responseJson[0].yetkili_ad,
              yetkili_tel : responseJson[0].yetkili_tel,
              yetkili_mail : responseJson[0].yetkili_mail,
              yetkili_unvan : responseJson[0].yetkili_unvan,
          })
        }else{
         
        }
      } else {
        alert("olmadı")
      }
  } catch (error) {
      console.error(error);
  }
  } else {
  }
}  

async tcKontrol(tcKontrol) {
  const tcno = String(tcKontrol);
  if (tcno.substring(0, 1) === '0') {
      console.log(tcKontrol)
      console.log("Tckn not correct");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 1})
  }else{
      
      console.log("Tckn doğru");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 0})
      }
  if (tcno.length !== 11) {
      console.log("Tckn not correct");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 1})
  }else{
      
      console.log("Tckn doğru");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 0})
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
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 1})
  }else{
      
      console.log("Tckn doğru");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 0})
      }

  ilkon_total += parseInt(ilkon_array[9], 10); 
  if (ilkon_total % 10 !== parseInt(tcno.substr(-1), 10)) {
      console.log("Tckn not correct");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 1})
  }else{
      
  console.log("Tckn doğru");
  this.setState({yetkili_tckn:tcKontrol,hataTckn : 0})
  }

  }
  
async insertFirma(){
if(this.state.sektor == ''||  this.state.firma_vkn == ''  || this.state.firma_unvan == ''  || this.state.vergi_dairesi == ''  || this.state.firma_tel == ''
|| this.state.email == ''|| this.state.il == ''|| this.state.ilce == ''|| this.state.semt == ''|| this.state.cadde == ''|| this.state.kapi_no == ''
){
      Alert.alert(
          '',
           'Tüm Alanları Eksiksiz Doldurunuz.',
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
    else if(this.state.hataEmail == 1){
      this.setModalLoading(false);
      Alert.alert(
          '',
             'Email Adres yanlış',
          [
              { text: 'OK' },
          ],
          { cancelable: false },
      );
    }
    else if(this.state.firma_vkn.length < 10 ){
      Alert.alert(
        '',
         'VKN numaranızın en az karakter sayısı 10 olmalıdır.',
        [
            { text: 'Anladım' },
        ],
        { cancelable: false },
    );
    }
    else{
        try{
          this.setModalLoading(true);
           const token = await AsyncStorage.getItem('@myStores:access_token');
          let response = await fetch(`https://pro.faktodeks.com//api/insertFirma`, {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                token:token,
                sektor : this.state.sektor,
                firma_vkn : this.state.firma_vkn,
                firma_unvan : this.state.firma_unvan,
                vergi_dairesi : this.state.vergi_dairesi,
                firma_tel : this.state.firma_tel,
                email : this.state.email,
                website : this.state.website,
                il : this.state.il,
                ilce : this.state.ilce,
                semt : this.state.semt,
                cadde : this.state.cadde,
                kapi_no : this.state.kapi_no,
                daire_no : this.state.daire_no,
                yetkili_tckn : this.state.yetkili_tckn,
                yetkili_ad : this.state.yetkili_ad,
                yetkili_tel : this.state.yetkili_tel,
                yetkili_mail : this.state.yetkili_mail,
                yetkili_unvan : this.state.yetkili_unvan,
              }),
          });
          console.log(response);
          if (response.status == '200' || response.status == '201') {
              this.setModalLoading(false);
              let responseJson = await response.json();
              this.checkToken();

          } else {
              this.setModalLoading(false);
            this.setState({ hata: '1'})
          }

        }
        catch(error){

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
  render() {
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
          <Menu />
          <Content >
                  <View style={{marginHorizontal:20}}>
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>SEKTÖR</Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.sektor
                            }
                            onChangeText = {(value) => this.setState({sektor: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>FİRMA VKN </Label>
                            <Input 
                               style={{color:'white'}}
                               maxLength={11}
                             value = {
                                this.state.firma_vkn
                            }
                            keyboardType='numeric'
                            onChangeText = {(value) => this.setState({firma_vkn: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                        
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>FİRMA ÜNVANI </Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.firma_unvan
                            }
                            onChangeText = {(value) => this.setState({firma_unvan: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>VERGİ DAİRESİ </Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.vergi_dairesi
                            }
                            onChangeText = {(value) => this.setState({vergi_dairesi: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                      <View style={{flexDirection:'row'}}>
                        <Item style={{flex:1}}>
                            <Input placeholder='+90'
                            disabled
                            placeholderTextColor='white'
                            style={{color:'white'}}
                            
                            />
                        </Item>
                        <Item style={{flex:4,marginLeft:10}}>
                            <Input placeholder='Tel'
                            placeholderTextColor='white'
                            keyboardType='numeric'
                            style={{color:'white'}}
                            maxLength={10}
                            value = {
                                this.state.firma_tel
                            }
                            onChangeText = {(value) => this.setState({firma_tel: value})}
                            />
                        </Item>
                        </View>
                        {this.state.hataEmail == 1 ? 
                        <Item stackedLabel error  style={{marginTop:10}}>
                          <Label  style={{color:'white'}}>E POSTA ADRESİ</Label>

                              <Input 
                              style={{color:'white'}}
                              keyboardType="email-address"
                              autoCapitalize = 'none'
                              value = {
                                  this.state.email
                              }
                              onChangeText={(text) => this.validate(text)}
                              />
                              
                              </Item>
                              :
                              <Item stackedLabel  style={{marginTop:10}}>
                                <Label  style={{color:'white'}}>E POSTA ADRESİ</Label>
                              <Input
                               autoCapitalize = 'none'
                               keyboardType="email-address"
                              style={{color:'white'}}
                              
                              value = {
                                  this.state.email
                              }
                              onChangeText={(text) => this.validate(text)}
                              />
                          </Item>}
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>WEBSİTE</Label>
                            <Input 
                             autoCapitalize = 'none'
                               style={{color:'white'}}
                             value = {
                                this.state.website
                            }
                            onChangeText = {(value) => this.setState({website: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                      
                      
                     <Label  style={{color:'white',fontWeight:'bold',marginTop:25}}>Firma Adres:</Label>
                     
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>İL</Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.il
                            }
                            onChangeText = {(value) => this.setState({il: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>İLÇE</Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.ilce
                            }
                            onChangeText = {(value) => this.setState({ilce: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                  
                        <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>SEMT/MAHALLE</Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.semt
                            }
                            onChangeText = {(value) => this.setState({semt: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>CADDE/SOKAK</Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.cadde
                            }
                            onChangeText = {(value) => this.setState({cadde: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>KAPI NO</Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.kapi_no
                            }
                            onChangeText = {(value) => this.setState({kapi_no: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                  <Item stackedLabel style={{marginTop:15}}>
                     <Label  style={{color:'white'}}>DAİRE NO</Label>
                            <Input 
                               style={{color:'white'}}
                             value = {
                                this.state.daire_no
                            }
                            onChangeText = {(value) => this.setState({daire_no: value})}
                            placeholderTextColor='white'
                            />
                        </Item>
                        <Label  style={{color:'white',fontWeight:'bold',marginTop:25}}>Firma Yetkilisi:</Label>
                          {this.state.hataTckn == 1 ? 
                          <Item error stackedLabel style={{marginTop:15}}>
                             <Label  style={{color:'white'}}> TCKN</Label>
                             <Input
                             maxLength={11}
                            keyboardType='numeric'
                             value = {
                                this.state.yetkili_tckn
                            }
                            placeholderTextColor='white'
                            style={{color:'white'}}
                            onChangeText={(yetkili_tckn) => this.tcKontrol(yetkili_tckn)}
                            />
                        </Item>
                        :  <Item stackedLabel  style={{marginTop:15}}>
                             <Label  style={{color:'white'}}> TCKN</Label>
                        <Input 
                         maxLength={11}
                        keyboardType='numeric'
                         value = {
                            this.state.yetkili_tckn
                        }
                        placeholderTextColor='white'
                        style={{color:'white'}}
                        onChangeText={(yetkili_tckn) => this.tcKontrol(yetkili_tckn)}
                        />
                    </Item> }
                        <Item stackedLabel style={{marginTop:15}}>
                         <Label  style={{color:'white'}}>AD-SOYAD</Label>
                              <Input 
                              value = {
                                  this.state.yetkili_ad
                              }
                              style={{color:'white'}}
                              onChangeText = {(value) => this.setState({yetkili_ad: value})}
                              />
                          </Item>
                      <View style={{flexDirection:'row'}}>
                        <Item style={{flex:1}}>
                            <Input placeholder='+90'
                            disabled
                            placeholderTextColor='white'
                            style={{color:'white'}}
                            
                            />
                        </Item>
                        <Item style={{flex:4,marginLeft:10}}>
                            <Input placeholder='Tel'
                            placeholderTextColor='white'
                            keyboardType='numeric'
                            style={{color:'white'}}
                            maxLength={10}
                            value = {
                                this.state.yetkili_tel
                            }
                            onChangeText = {(value) => this.setState({yetkili_tel: value})}
                            />
                        </Item>
                        </View>
                        <Item stackedLabel style={{marginTop:15}}>
                         <Label  style={{color:'white'}}>E-POSTA</Label>
                              <Input 
                              value = {
                                  this.state.yetkili_mail
                              }
                              autoCapitalize = 'none'
                              style={{color:'white'}}
                              onChangeText = {(value) => this.setState({yetkili_mail: value})}
                              />
                          </Item>
                        <Item stackedLabel style={{marginTop:15}}>
                         <Label  style={{color:'white'}}>ÜNVAN</Label>
                              <Input 
                              value = {
                                  this.state.yetkili_unvan
                              }
                              style={{color:'white'}}
                              onChangeText = {(value) => this.setState({yetkili_unvan: value})}
                              />
                          </Item>
                            <Row style={{ justifyContent:'center' ,marginTop:15 }}>
                                    <TouchableOpacity   onPress={this.insertFirma.bind(this)}>
                                        <Image
                                                style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                                                source={require('../images/kaydet.png')} 
                                            />
                                </TouchableOpacity>
                                </Row>
                        </View>
                </Content>
                  
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
                    
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(editInfo);
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }, 
  
  modalViewLoading: {
    height: HEIGHT / 2,
    width: WIDTH / 1.5,
    justifyContent: 'space-around',
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
  exit: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    top:15,
    width: 25,
    height: 25,
    borderRadius: 25,
    zIndex:1
},  modalView: {
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
 guncelle: {
  width: '100%',
  height: '100%',
  backgroundColor: "rgba(90,170,2,1)",
  textAlign: 'center',
  justifyContent: 'center'
},
sag: {
  flex: 2,
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingLeft: 30
},
modalUst: {
width:WIDTH/1.5,
height:HEIGHT/2,
  justifyContent: 'space-around',
  paddingHorizontal: 30,
  paddingTop: 20
},
modalAlt: {
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#c8c8c8'
},
mUstSatir: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  flex: 1,
},
mAltSatir: {
  flex: 1,
  alignItems: 'center'
},
minput: {
  height: 40,
  width: '60%',
  borderRadius: 15,
  backgroundColor: '#393939',
  justifyContent:'center'
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

});