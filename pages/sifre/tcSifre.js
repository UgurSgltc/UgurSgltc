import React, { Component } from 'react';
import { StyleSheet,View,TouchableOpacity,KeyboardAvoidingView,RefreshControl,Modal, FlatList,Alert,Platform, Dimensions,ImageBackground,StatusBar} from 'react-native';
import { Container,Grid,Thumbnail,Col,Row, Content,Icon,Item,Input,Header,Button, Text,Body, ListItem,List,Left,Right } from 'native-base';
import {Image, Card,Subtitle,Caption,Title, Html,  RichMedia} from '@shoutem/ui';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper';
import Menu from '../inc/header';
import Moment from 'moment/min/moment-with-locales';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default class tcSifre extends Component {
    constructor(props) {
        super(props);
        this.state = {
        checked: 'first',
        tcknLogin:'',
        onesignal_token:null,
        tc:''
    }
     
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
        this.tcGel()
    });
  }
  async tcGel(){
    const { params } = this.props.navigation.state;
    if(params){
        this.setState({tcknLogin:params.tckn,onesignal_token:params.onesignal_token})
    }
  }
  async control(){
    if(this.state.tcknLogin == ''){
        Alert.alert(
            '',
             'Tüm Alanları Eksiksiz Doldurunuz.',
            [
                { text: 'Anladım' },
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
        else{
          try{
            let response = await fetch(`https://pro.faktodeks.com/api/tcSifre`, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tckn: this.state.tcknLogin,
                }),
            });
            console.log(response);
            if (response.status == '200' || response.status == '201') {
                let responseJson = await response.json();
                this.props.navigation.navigate('SmsOnayYeniSifre',{tckn:this.state.tcknLogin,sms:responseJson.sms,telefon:responseJson.gsm,onesignal_token:this.state.onesignal_token});
            } else if(response.status == '404'){
                Alert.alert(
                    '',
                     'Hatalı Tc Kimlik Numarası',
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
  render() {
    const { checked } = this.state;
    return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding">

        <Container >
       
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
     <Menu profilNo="a" yer="Şifre Güncelle"/>
                <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',height:HEIGHT/8  }}>
                        <Title style={{color:'white',fontSize:23,fontWeight:'bold'}}>11 haneli TCKN’nizi giriniz.</Title>
                    </Row>
                <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',height:HEIGHT/8  }}>
                <Text style={{color:'white',fontSize:17,textAlign:'center'}}>Sisteme kayıtlı telefon numaranıza doğrulama kodunuz gelecektir.</Text>

                    </Row>



                <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column' ,paddingHorizontal:20 }}>
                {this.state.hataTckn == 1 ? 
                        <Item error style={styles.item}>
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
                        </Item>
                        :  <Item  style={styles.item}>
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
                </Row>
              <Row style={{ justifyContent:'center'  }}>
                  <TouchableOpacity  onPress={this.control.bind(this)}>
                    <Image
                            style={{width:WIDTH/2,resizeMode:'contain',marginTop:20, padding:20}}
                            source={require('../assets/gonder.png')} 
                        />
                </TouchableOpacity>
              </Row>
    </ImageBackground>
  </Container>
    </KeyboardAvoidingView>
      );

}
}
const styles = StyleSheet.create({
    item:{
        width:'100%', 
        backgroundColor:'#fff',borderRadius:10,
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