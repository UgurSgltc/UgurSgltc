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
    ScrollView,
ActivityIndicator,
    KeyboardAvoidingView,
    Text,
    FlatList,
    Keyboard,
    RefreshControl,
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import { Container,  Button, Header,Col,Row, Left, Body,Icon,Grid, Right,DatePicker,Textarea, Content,Item,Input,Picker, Label,List,ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import { Checkbox } from 'react-native-paper';
import {
  TextInputMask
} from 'react-native-masked-text';
import {   TextInput } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';

import AntDesign from 'react-native-vector-icons/AntDesign';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class proforma extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sira:2,
          modalBirim:false,
          birim : '',
          fatura_tutar:'',
          //alici
          alici_name : '',
          alici_ulke : '',
          alici_il : '',
          alici_ilce : '',
          alici_semt : '',
          alici_cadde : '',
          alici_daire:'',
          alici_yetkili_ad : '',
          alici_tel : '',
          alici_email : '',
          //sicil
          sicil_no:'',
          kac_yildir_calisiliyor:'',
          calisma_sekli:'',
          teslim_sekli:'',
          odeme_vadesi:'',
          is_suresi:'',
          doviz_cinsi:'',
          satis_sozlemesi:'',
          iskonto:'',
          diger:'',
          //satici
          
          //satici
          satici_name : '',
          satici_ulke : '',
          satici_il : '',
          satici_ilce : '',
          satici_semt : '',
          satici_cadde : '',
          satici_daire:'',
          satici_yetkili_ad : '',
          satici_tel : '',
          satici_email : '',


          //kurulus
          chosenDate: new Date() ,
          sermayesi:'',
          faktoring_hizmeti:'',
          ortalama_satis:'',
          yillik_ihracat:'',
          yillik_islem:'',
          grup_sirketleri:'',
          iskonto_uygalaniyormu:'',
          dis_ticaret:'',
          //son
          alici_ile_temas:'',
          alici_ile_ticaret:'',
          mahsup_islem:'',
          ne_aliyorsunuz:'',
          faktoring_sirketi:'',
          muhabir_adi:'',
          not:'',


        showFooter:true,
          modalLoading:false,
        }
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      } 
_keyboardDidShow () {
  this.setState({showFooter: false});
}

_keyboardDidHide () {
  this.setState({showFooter: true});
}   
componentWillMount() {
  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
 
}
componentWillUnmount () {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
}
setModalLoading(visible) {
    this.setState({modalLoading: visible});
    }
    
    setmodalBirim(visible) {
      this.setState({modalBirim: visible});
      }
    art = async ()  =>{
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
      this.setState({sira:this.state.sira+1})
      this.setModalLoading(false);
    }
    arttir = async ()  => {
    this.setModalLoading(true);
    /*
    if(this.state.sira == 1){
      if(this.state.name == ''||  this.state.ulke == ''  || this.state.il == ''  || this.state.ilce == ''  || this.state.semt == ''||
        this.state.cadde == ''||  this.state.daire == ''  ||  this.state.yetkili_ad == ''  || this.state.tel == ''|| this.state.email == ''
      ){
        this.setModalLoading(false);
        Alert.alert(
            '',
            'Tüm Alanları Eksiksiz Doldurunuz.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
      }else{
        setTimeout(this.art, 1000);
      } 
    }*/

     if(this.state.sira == 2){
      if(this.state.fatura_tutar == ''||this.state.birim == ''||this.state.alici_name == ''||  this.state.alici_ulke == ''  || this.state.alici_il == ''  || this.state.alici_ilce == ''  || this.state.alici_semt == ''||
        this.state.alici_cadde == ''||  this.state.alici_daire == ''  || this.state.alici_yetkili_ad == ''  || this.state.alici_tel == ''|| this.state.alici_email == ''
      ){
        this.setModalLoading(false);
        Alert.alert(
            '',
            'Tüm Alanları Eksiksiz Doldurunuz.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
      }else{
        setTimeout(this.art, 1000);
      } 
    }
    else if(this.state.sira == 3){
      if(this.state.sicil_no == ''||  this.state.kac_yildir_calisiliyor == ''  || this.state.calisma_sekli == ''  || this.state.teslim_sekli == ''  || this.state.odeme_vadesi == ''||
        this.state.is_suresi == ''||  this.state.doviz_cinsi == ''  || this.state.satis_sozlemesi == ''  || this.state.iskonto == ''|| this.state.diger == ''
      ){
        this.setModalLoading(false);
        Alert.alert(
            '',
            'Tüm Alanları Eksiksiz Doldurunuz.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
      }else{
        setTimeout(this.art, 1000);
      } 
    }
    else if(this.state.sira == 4){
      if(this.state.satici_name == ''||  this.state.satici_ulke == ''  || this.state.satici_il == ''  || this.state.satici_ilce == ''  || this.state.satici_semt == ''||
        this.state.satici_cadde == ''||  this.state.satici_daire == ''  || this.state.satici_yetkili_ad == ''  || this.state.satici_tel == ''|| this.state.satici_email == ''
      ){
        this.setModalLoading(false);
        Alert.alert(
            '',
            'Tüm Alanları Eksiksiz Doldurunuz.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
      }else{
        setTimeout(this.art, 1000);
      } 
    }
    else if(this.state.sira == 5){
      if(this.state.chosenDate == null||  this.state.sermayesi == ''  || this.state.faktoring_hizmeti == ''  ||  this.state.ortalama_satis == ''||
        this.state.yillik_ihracat == ''||  this.state.yillik_islem == ''  || this.state.grup_sirketleri == ''  || this.state.iskonto_uygalaniyormu == ''|| this.state.dis_ticaret == ''
      ){
        this.setModalLoading(false);
        Alert.alert(
            '',
            'Tüm Alanları Eksiksiz Doldurunuz.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
      }else{
        setTimeout(this.art, 1000);
      } 
    }
    else if(this.state.sira == 6){
      if(this.state.alici_ile_temas == ''||  this.state.alici_ile_ticaret == ''  || this.state.mahsup_islem == ''  ||  this.state.faktoring_sirketi == ''){
        this.setModalLoading(false);
        Alert.alert(
            '',
            'Tüm Alanları Eksiksiz Doldurunuz.',
            [
                { text: 'Anladım' },
            ],
            { cancelable: false },
        );
      }else{
        setTimeout(this.insertIhracat, 1000);
      } 
    }
  }
  async azalt(){
    this.setState({sira:this.state.sira-1})
  }
  insertIhracat = async ()  =>{
    let fatura =this.state.fatura_tutar;
    var faturaTree = fatura.substr(fatura.length - 3); 
    if(faturaTree == ',00'){
      fatura = fatura.substring(0, fatura.length - 3);
      fatura = fatura.replace(".", "");
    }else{
      fatura = fatura.replace(",", ".");
    }
        try{
           const token = await AsyncStorage.getItem('@myStores:access_token');
          let response = await fetch(`https://pro.faktodeks.com//api/insertIhracat`, {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                token:token,
                //alici
                fatura_tutar:fatura,
                birim:this.state.birim,
                alici_name : this.state.alici_name,
                alici_ulke : this.state.alici_ulke,
                alici_il : this.state.alici_il,
                alici_ilce : this.state.alici_ilce,
                alici_semt : this.state.alici_semt,
                alici_cadde : this.state.alici_cadde,
                alici_daire:this.state.alici_daire,
                alici_yetkili_ad : this.state.alici_yetkili_ad,
                alici_tel : this.state.alici_tel,
                alici_email : this.state.alici_email,
                //sicil
                sicil_no:this.state.sicil_no,
                kac_yildir_calisiliyor:this.state.kac_yildir_calisiliyor,
                calisma_sekli:this.state.calisma_sekli,
                teslim_sekli:this.state.teslim_sekli,
                odeme_vadesi:this.state.odeme_vadesi,
                is_suresi:this.state.is_suresi,
                doviz_cinsi:this.state.doviz_cinsi,
                satis_sozlemesi:this.state.satis_sozlemesi,
                iskonto:this.state.iskonto,
                diger:this.state.diger,
                //satici
                satici_name : this.state.satici_name,
                satici_ulke : this.state.satici_ulke,
                satici_il : this.state.satici_il,
                satici_ilce : this.state.satici_ilce,
                satici_semt : this.state.satici_semt,
                satici_cadde : this.state.satici_cadde,
                satici_daire:this.state.satici_daire,
                satici_yetkili_ad : this.state.satici_yetkili_ad,
                satici_tel : this.state.satici_tel,
                satici_email : this.state.satici_email,
                //kurulus
                chosenDate: this.state.chosenDate ,
                sermayesi:this.state.sermayesi,
                faktoring_hizmeti:this.state.faktoring_hizmeti,
                ortalama_satis:this.state.ortalama_satis,
                yillik_ihracat:this.state.yillik_ihracat,
                yillik_islem:this.state.yillik_islem,
                grup_sirketleri:this.state.grup_sirketleri,
                iskonto_uygalaniyormu:this.state.iskonto_uygalaniyormu,
                dis_ticaret:this.state.dis_ticaret,
                //son
                alici_ile_temas:this.state.alici_ile_temas,
                alici_ile_ticaret:this.state.alici_ile_ticaret,
                mahsup_islem:this.state.mahsup_islem,
                ne_aliyorsunuz:this.state.ne_aliyorsunuz,
                faktoring_sirketi:this.state.faktoring_sirketi,
                muhabir_adi:this.state.muhabir_adi,
                not:this.state.not,
                
             
              }),
          });
          console.log(response);
          if (response.status == '200' || response.status == '201') {
              this.setModalLoading(false);
              let responseJson = await response.json();
              Alert.alert(
                '',
                'Talebiniz alınmıştır.',
                [
                    { text: 'Anladım',onPress: () => this.props.navigation.navigate('Anasayfa')},
                ],
                { cancelable: false },
            );
          } else {
              this.setModalLoading(false);
            this.setState({ hata: '1'})
          }

        }
        catch(error){
          console.log(error)
        }
    
} 

  render() {
    const { params } = this.props.navigation.state;

    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>         
            <Header androidStatusBarColor='white'  style={  {backgroundColor:'#14a0de',elevation: 0, shadowOffset: {height: 0, width: 0},shadowOpacity: 0} }>  
                <StatusBar backgroundColor="#14a0de" barStyle="light-content" />
                <Left>
                  <Button transparent  onPress={() =>
                  this.state.sira == 2 ? 
                  this.props.navigation.goBack()
                  :
                     this.azalt()
                     }>
                    <AntDesign  name='left' style={{color:'white',fontSize:25}}/>
                  </Button>
                </Left>
                <Body style={{ textAlign:'center',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                    width:WIDTH/2,
                    paddingLeft:WIDTH/6 }}>
                    
                    <Text style={{color:'white',fontSize:WIDTH/25,fontWeight:'bold',textAlign:'center'}}>Talep Ekle</Text>  
                    <Text style={{color:'white',fontSize:WIDTH/35,textAlign:'center'}}>
                          {params.altKategoriText}
                    </Text>  
                  
                  
                </Body>
                <Right >
                </Right>
          </Header>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalBirim}
          onRequestClose={() => {
            this.setmodalBirim(!this.state.modalBirim);
          }}>
            <Header androidStatusBarColor='white' style={{backgroundColor:'#F9F9F9',borderBottomColor:'#a0a0a0',borderBottomWidth:0.7}}>
                <Body>
                   <Text style={{color:'#4a4a4a'}}>Birim Seçiniz </Text>
                </Body>
                <Right>
                <TouchableOpacity hasText transparent onPress={() => {
                  this.setmodalBirim(!this.state.modalBirim);
                }}>   
                    <Text>İptal</Text>
                </TouchableOpacity>
                </Right>
                </Header>
          <Content>
          <List>
       
              <ListItem onPress={()=> this.setState({ modalBirim: false,birim:'TL' })}>
              <Body>
              <Text>TL</Text>
                </Body>
                    <Right>
                    </Right>
              </ListItem>
              <ListItem onPress={()=> this.setState({ modalBirim: false,birim:'EUR' })}>
              <Body>
              <Text>EUR</Text>
                </Body>
                    <Right>
                    </Right>
              </ListItem>
              <ListItem onPress={()=> this.setState({ modalBirim: false,birim:'USD'})}>
              <Body>
              <Text>USD</Text>
                </Body>
                    <Right>
                    </Right>
              </ListItem>
               </List>
    
        </Content>
        </Modal>
      
                <ScrollView style={{backgroundColor:'#F5F5F5'}}  ref={(c) => {this.scroll = c}}>
                  {this.state.sira == 1 ? 
                  <View style={{marginHorizontal:20}}>
                    <Label style={{marginTop:10,color:'#042264',fontWeight:'bold'}}>PROFORMA FATURA/ALICI BİLGİ FORMU</Label>
                    <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='ADI / ÜNVANI'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.name
                            }
                            onChangeText = {(value) => this.setState({name: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                        
                            <Input 
                            placeholder='ÜLKE'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.ulke
                            }
                            onChangeText = {(value) => this.setState({ulke: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='İL'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.il
                            }
                            onChangeText = {(value) => this.setState({il: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='İLÇE'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.ilce
                            }
                            onChangeText = {(value) => this.setState({ilce: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                              placeholder='SEMT / MAHALLE'
                              placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.semt
                            }
                            onChangeText = {(value) => this.setState({semt: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                               placeholder='CADDE / SOKAK'
                               placeholderTextColor='#042264'
                               style={{color:'#042264'}}
                             value = {
                                this.state.cadde
                            }
                            onChangeText = {(value) => this.setState({cadde: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                              placeholder='KAPI / DAİRE NO'
                              placeholderTextColor='#042264'
                               style={{color:'#042264'}}
                             value = {
                                this.state.daire
                            }
                            onChangeText = {(value) => this.setState({daire: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                              placeholder='YETKİLİ KİŞİ'
                              placeholderTextColor='#042264'
                               style={{color:'#042264'}}
                             value = {
                                this.state.yetkili_ad
                            }
                            onChangeText = {(value) => this.setState({yetkili_ad: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                              placeholder='TELEFON'
                              placeholderTextColor='#042264'
                               style={{color:'#042264'}}
                             value = {
                                this.state.tel
                            }
                            keyboardType='numeric'

                            onChangeText = {(value) => this.setState({tel: value})}
                            
                            />
                        </Item>
                       
                        <Item floatingLabel  style={styles.item}>
                              <Input
                              placeholder='E POSTA'
                              placeholderTextColor='#042264'
                               autoCapitalize = 'none'
                               keyboardType="email-address"
                              style={{color:'#042264'}}
                              
                              value = {
                                  this.state.email
                              }
                              onChangeText = {(value) => this.setState({email: value})}
                              />
                          </Item>
               
                                  <Row style={{ justifyContent:'center' ,marginTop:15,marginBottom:30 }}>
                                  <Button block transparent onPress={this.arttir} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                                    <Text style={{color:'#011153'}}>KAYDET</Text>
                                  </Button>
                                   
                                </Row>
                        </View>
                    :null}
             
                  {this.state.sira ==2 ? 
                  <View style={{marginHorizontal:20}}>
                    <Label style={{marginTop:10,color:'#042264',fontWeight:'bold'}}>ALICI BİLGİ FORMU</Label>
                    <Item floatingLabel style={styles.item}>
                          <Input 
                               style={{color:'#042264'}}
                               keyboardType='numeric'
                               maxLength={20}
                             value = {
                                this.state.fatura_tutar
                            }
                            onChangeText = {(value) => this.setState({fatura_tutar: value})}
                            placeholderTextColor='#042264'
                            placeholder='PROFORMA FATURA TUTARI'
                            />
                        </Item>
                        <Row style={{marginTop:20, }}>
                          <Button iconRight block transparent  onPress={() => {
                            this.setmodalBirim(true);
                                }} style={{backgroundColor:'#fff',width:'100%',borderRadius:10}} >
                              <Text style={{color:'#042264',textAlign:'left',position:'absolute',left:5, fontSize:WIDTH/25}}>
                              {this.state.birim == '' ? 'PROFORMA PARA BİRİMİ' : this.state.birim}</Text>
                              <AntDesign name="down" style={{color:'#042264', position:'absolute',right:5}}/>
                            </Button>
                        </Row>
                        
                        <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='ADI / ÜNVANI'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_name
                            }
                            onChangeText = {(value) => this.setState({alici_name: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                        
                            <Input 
                            placeholder='ÜLKE'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_ulke
                            }
                            onChangeText = {(value) => this.setState({alici_ulke: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='İL'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_il
                            }
                            onChangeText = {(value) => this.setState({alici_il: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='İLÇE'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_ilce
                            }
                            onChangeText = {(value) => this.setState({alici_ilce: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                              placeholder='SEMT / MAHALLE'
                              placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_semt
                            }
                            onChangeText = {(value) => this.setState({alici_semt: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                               placeholder='CADDE / SOKAK'
                               placeholderTextColor='#042264'
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_cadde
                            }
                            onChangeText = {(value) => this.setState({alici_cadde: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                              placeholder='KAPI / DAİRE NO'
                              placeholderTextColor='#042264'
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_daire
                            }
                            onChangeText = {(value) => this.setState({alici_daire: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                              placeholder='YETKİLİ KİŞİ'
                              placeholderTextColor='#042264'
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_yetkili_ad
                            }
                            onChangeText = {(value) => this.setState({alici_yetkili_ad: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                              placeholder='TELEFON'
                              placeholderTextColor='#042264'
                               style={{color:'#042264'}}
                             value = {
                                this.state.alici_tel
                            }
                            keyboardType='numeric'

                            onChangeText = {(value) => this.setState({alici_tel: value})}
                            
                            />
                        </Item>
                     
                              <Item floatingLabel  style={styles.item}>
                              <Input
                              placeholder='E POSTA'
                              placeholderTextColor='#042264'
                               autoCapitalize = 'none'
                               keyboardType="email-address"
                              style={{color:'#042264'}}
                              
                              value = {
                                  this.state.alici_email
                              }
                              onChangeText = {(value) => this.setState({alici_email: value})}
                              />
                          </Item>
               
                                  <Row style={{ justifyContent:'center' ,marginTop:15,marginBottom:30 }}>
                                  <Button block transparent onPress={() => this.arttir()} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                                    <Text style={{color:'#011153'}}>KAYDET</Text>
                                  </Button>
                                   
                                </Row>
                        </View>
                    :null}
                    
                  {this.state.sira ==3 ? 
                  <View style={{marginHorizontal:20}}>
                    <Label style={{marginTop:10,color:'#042264',fontWeight:'bold'}}>ALICI BİLGİ FORMU</Label>

                        <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='FİRMA VERGİ SİCİL NO'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.sicil_no
                            }
                            onChangeText = {(value) => this.setState({sicil_no: value})}
                            
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                        
                            <Input 
                            placeholder='KAÇ YILDIR BU ALICI İLE ÇALIŞILIYOR?'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.kac_yildir_calisiliyor
                            }
                            onChangeText = {(value) => this.setState({kac_yildir_calisiliyor: value})}
                            
                            />
                        </Item>
                        <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.calisma_sekli}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({calisma_sekli: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="ÇALIŞMA ŞEKLİ" value="" />
                          <Picker.Item label="Mal Mukabili" value="Mal Mukabili" />
                          <Picker.Item label="Vesaik Mukabili" value="Vesaik Mukabili" />
                          <Picker.Item label="Akreditif" value="Akreditif" />
                        </Picker>
                      </View>
                    
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.teslim_sekli}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({teslim_sekli: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="TESLİM ŞEKLİ" value="" />
                          <Picker.Item label="FOB" value="FOB" />
                          <Picker.Item label="CIF" value="CIF" />
                          <Picker.Item label="CF/CFR" value="CF/CFR" />
                          <Picker.Item label="DDU" value="DDU" />
                          <Picker.Item label="DİĞER" value="DİĞER" />

                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.odeme_vadesi}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({odeme_vadesi: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="ÖDEME VADESİ" value="" />
                          <Picker.Item label="30" value="30" />
                          <Picker.Item label="45" value="45" />
                          <Picker.Item label="60" value="60" />
                          <Picker.Item label="90" value="90" />
                          <Picker.Item label="DİĞER" value="DİĞER" />
                        </Picker>
                      </View>
                        <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='İŞ SÜRESİ'
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.is_suresi
                            }
                            onChangeText = {(value) => this.setState({is_suresi: value})}
                            
                            />
                        </Item>
                        
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.doviz_cinsi}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({doviz_cinsi: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="DÖVİZ CİNSİ" value="" />
                          <Picker.Item label="EURO" value="EURO" />
                          <Picker.Item label="USD" value="USD" />
                          <Picker.Item label="GBP" value="GBP" />
                          <Picker.Item label="DİĞER" value="DİĞER" />
                        </Picker>
                      </View>
                      
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.satis_sozlemesi}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({satis_sozlemesi: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="SATIŞ SÖZLEŞMESİ" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.iskonto}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({iskonto: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="İSKONTO UYGULANIYOR MU?" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                      </View>
                      <Textarea style={styles.item} rowSpan={4}
                      value = {
                        this.state.diger
                          }
                        
                      onChangeText = {(value) => this.setState({diger: value})}
                      bordered placeholder="DİĞER BİLGİLER"
                      placeholderTextColor="#042264" />
                                  <Row style={{ justifyContent:'center' ,marginTop:15,marginBottom:30 }}>
                                  <Button block transparent onPress={() => this.arttir()} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                                    <Text style={{color:'#011153'}}>KAYDET</Text>
                                  </Button>
                                   
                                </Row>
                        </View>
                    :null}
                    
                  {this.state.sira ==4 ? 
                    <View style={{marginHorizontal:20}}>
                      <Label style={{marginTop:10,color:'#042264',fontWeight:'bold'}}>SATICI BİLGİ FORMU</Label>
  
                          <Item floatingLabel style={styles.item}>
                              <Input 
                              placeholder='FİRMA ÜNVANI'
                              placeholderTextColor='#042264' 
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_name
                              }
                              onChangeText = {(value) => this.setState({satici_name: value})}
                              
                              />
                          </Item>
                          <Item floatingLabel style={styles.item}>
                          
                              <Input 
                              placeholder='ÜLKE'
                              placeholderTextColor='#042264' 
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_ulke
                              }
                              onChangeText = {(value) => this.setState({satici_ulke: value})}
                              
                              />
                          </Item>
                          <Item floatingLabel style={styles.item}>
                              <Input 
                              placeholder='İL'
                              placeholderTextColor='#042264' 
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_il
                              }
                              onChangeText = {(value) => this.setState({satici_il: value})}
                              
                              />
                          </Item>
                          <Item floatingLabel style={styles.item}>
                              <Input 
                              placeholder='İLÇE'
                              placeholderTextColor='#042264' 
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_ilce
                              }
                              onChangeText = {(value) => this.setState({satici_ilce: value})}
                              
                              />
                          </Item>
                          <Item floatingLabel style={styles.item}>
                              <Input 
                                placeholder='SEMT / MAHALLE'
                                placeholderTextColor='#042264' 
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_semt
                              }
                              onChangeText = {(value) => this.setState({satici_semt: value})}
                              
                              />
                          </Item>
                          <Item floatingLabel style={styles.item}>
                              <Input 
                                 placeholder='CADDE / SOKAK'
                                 placeholderTextColor='#042264'
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_cadde
                              }
                              onChangeText = {(value) => this.setState({satici_cadde: value})}
                              
                              />
                          </Item>
                          <Item floatingLabel style={styles.item}>
                              <Input 
                                placeholder='KAPI / DAİRE NO'
                                placeholderTextColor='#042264'
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_daire
                              }
                              onChangeText = {(value) => this.setState({satici_daire: value})}
                              
                              />
                          </Item>
                          <Item floatingLabel style={styles.item}>
                              <Input 
                                placeholder='YETKİLİ KİŞİ'
                                placeholderTextColor='#042264'
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_yetkili_ad
                              }
                              onChangeText = {(value) => this.setState({satici_yetkili_ad: value})}
                              
                              />
                          </Item>
                          <Item floatingLabel style={styles.item}>
                              <Input 
                                placeholder='TELEFON'
                                placeholderTextColor='#042264'
                                 style={{color:'#042264'}}
                               value = {
                                  this.state.satici_tel
                              }
                              keyboardType='numeric'
  
                              onChangeText = {(value) => this.setState({satici_tel: value})}
                              
                              />
                          </Item>
                       
                                <Item floatingLabel  style={styles.item}>
                                <Input
                                placeholder='E POSTA'
                                placeholderTextColor='#042264'
                                 autoCapitalize = 'none'
                                 keyboardType="email-address"
                                style={{color:'#042264'}}
                                
                                value = {
                                    this.state.satici_email
                                }
                                onChangeText = {(value) => this.setState({satici_email: value})}
                                />
                            </Item>
                 
                                    <Row style={{ justifyContent:'center' ,marginTop:15,marginBottom:30 }}>
                                    <Button block transparent onPress={() => this.arttir()} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                                      <Text style={{color:'#011153'}}>KAYDET</Text>
                                    </Button>
                                     
                                  </Row>
                          </View>
                      :null}
                      
                  {this.state.sira ==5 ? 
                  <View style={{marginHorizontal:20}}>
                    <Label style={{marginTop:10,color:'#042264',fontWeight:'bold'}}>ALICI BİLGİ FORMU</Label>

                        <View floatingLabel style={styles.item}>
                        <DatePicker
                            locale={"tr"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="KURULUŞ TARİHİ"
                            textStyle={{ color: "#042264" }}
                            placeHolderTextStyle={{ color: "#042264" }}
                            onDateChange={this.setDate}
                            disabled={false}
                            />
                        </View>
                       
                        <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.sermayesi}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({sermayesi: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="SERMAYESİ" value="" />
                          <Picker.Item label="0-1 MİO" value="0-1 MİO" />
                          <Picker.Item label="1-5 MİO" value="1-5 MİO" />
                          <Picker.Item label="5 MİO" value="5 MİO" />
                          <Picker.Item label="DİĞER" value="DİĞER" />
                        </Picker>
                      </View>

                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.faktoring_hizmeti}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({faktoring_hizmeti: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="FAKTORİNG HİZMETİ ALDINIZ MI?" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                      </View>


                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.ihracatta_satis}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({ihracatta_satis: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="İHRACATTA SATIŞ ŞEKLİ" value="" />
                          <Picker.Item label="Mal Mukabili" value="Mal Mukabili" />
                          <Picker.Item label="Vesaik Mukabili" value="Vesaik Mukabili" />
                          <Picker.Item label="Akreditif" value="Akreditif" />
                          
                        </Picker>
                      </View>

                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.ortalama_satis}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({ortalama_satis: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="ORTALAMA SATIŞ VADELERİ" value="" />
                          <Picker.Item label="30" value="30" />
                          <Picker.Item label="45" value="45" />
                          <Picker.Item label="60" value="60" />
                          <Picker.Item label="90" value="90" />
                          <Picker.Item label="DİĞER" value="DİĞER" />
                          
                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.yillik_ihracat}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({yillik_ihracat: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="YILLIK İHRACAT DAĞILIMINIZ" value="" />
                          <Picker.Item label="EURO" value="EURO" />
                          <Picker.Item label="USD" value="USD" />
                          <Picker.Item label="GBP" value="GBP" />
                          <Picker.Item label="DİĞER" value="DİĞER" />
                          
                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.yillik_islem}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({yillik_islem: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="YILLIK İŞLEM HACMİ (İHRACAT)" value="" />
                          <Picker.Item label="10.000" value="10.000" />
                          <Picker.Item label="5.000 - 15.000" value="5.000 - 15.000" />
                          <Picker.Item label="15.000" value="15.000" />
                          <Picker.Item label="DİĞER" value="DİĞER" />
                          
                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.grup_sirketleri}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({grup_sirketleri: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="GRUP ŞİRKETLERİ" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.iskonto_uygalaniyormu}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({iskonto_uygalaniyormu: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="İSKONTO UYGULANIYOR MU?" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.dis_ticaret}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({dis_ticaret: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="DIŞ TİC. ŞİRKETİ KULLANILIYOR MU?" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                      </View>
                        <Row style={{ justifyContent:'center' ,marginTop:15,marginBottom:30 }}>
                            <Button block transparent onPress={() => this.arttir()} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                              <Text style={{color:'#011153'}}>KAYDET</Text>
                            </Button>
                              
                          </Row>
                      </View>
                    :null}
                    
                  {this.state.sira ==6 ? 
                  <View style={{marginHorizontal:20}}>
                    <Label style={{marginTop:10,color:'#042264',fontWeight:'bold'}}>SATICI BİLGİ FORMU</Label>

                        <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.alici_ile_temas}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({alici_ile_temas: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="ALICI İLE TEMASA İZİN VERİLİYOR MU?" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                      </View>
                    
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.alici_ile_ticaret}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({alici_ile_ticaret: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="ALICI İLE KARŞILIKLI TİCARETİNİZ VAR MI?" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />

                        </Picker>
                      </View>
                      <Textarea style={styles.item} rowSpan={3}
                      value = {
                        this.state.ne_aliyorsunuz
                          }
                        
                      onChangeText = {(value) => this.setState({ne_aliyorsunuz: value})}
                      bordered placeholder="EVET İSE NE ALIYORSUNUZ?"
                      placeholderTextColor="#042264" />
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.mahsup_islem}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({mahsup_islem: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="MAHSUP İŞLEMİ VAR MI?" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />

                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Picker
                          selectedValue={this.state.faktoring_sirketi}
                          pickerStyleType="Android"
                          onValueChange={(value) => {
                            this.setState({faktoring_sirketi: value});
                          }}
                          style={{color:'#042264'}}
                          mode="dialog">
                          <Picker.Item label="FAKTORİNG ŞİRKETİ İLE ÇALIŞIYOR MU?" value="" />
                          <Picker.Item label="Evet" value="Evet" />
                          <Picker.Item label="Hayır" value="Hayır" />

                        </Picker>
                      </View>
                      <Item floatingLabel style={styles.item}>
                            <Input 
                            placeholder='EVET İSE MUHABİR ADI '
                            placeholderTextColor='#042264' 
                               style={{color:'#042264'}}
                             value = {
                                this.state.muhabir_adi
                            }
                            onChangeText = {(value) => this.setState({muhabir_adi: value})}
                            
                            />
                        </Item>
                   <Textarea style={styles.item} rowSpan={4}
                      value = {
                        this.state.not
                          }
                        
                      onChangeText = {(value) => this.setState({not: value})}
                      bordered placeholder="NOT:"
                      placeholderTextColor="#042264" />
                                  <Row style={{ justifyContent:'center' ,marginTop:15,marginBottom:30 }}>
                                  <Button block transparent onPress={() => this.arttir()} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                                    <Text style={{color:'#011153'}}>KAYDET</Text>
                                  </Button>
                                   
                                </Row>
                        </View>
                    :null}
             </ScrollView>
             {this.state.showFooter == true ?       
                <Altbar />
              :null}
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
                               <ActivityIndicator size={80} color="#042264"/>
                                </View>

                            </View>
                        </View>
                    </Modal>
                    
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(proforma);
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }, 
  item:{
    width:'100%', 
    backgroundColor:'#fff',borderRadius:10,
    borderColor:'#fff',
    borderWidth:1,
    marginTop:20
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