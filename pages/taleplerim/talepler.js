import React, {Component} from 'react';
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
  FlatList,
  ActivityIndicator,
  Modal,
  Text,
  Alert,
  StatusBar,
  Switch,
  ImageBackground,
  SafeAreaView,
  BackHandler,
  RefreshControl,
} from 'react-native';
import {
  Container,
  Button,
  Header,
  Col,
  Row,
  SwipeRow,
  Left,
  Body,
  Right,
  Content,
} from 'native-base';
import {Image, Subtitle} from '@shoutem/ui';
import Menu from '../inc/header';
import Altbar from '../inc/footer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Pusher from 'pusher-js/react-native';
import OneSignal from 'react-native-onesignal';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
Pusher.logToConsole = true;

export default class talepler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talepler: [],
      sonuclananlar: [],
      toplam: '',
      giris: 1,
      register: 0,
      jsonDebugText: '',
      guncellenme: '',
      switchOnOkey: true,
      switchOnFalse: false,
      modalLoading: false,
      refreshing: true,
    };

    this.pusher = new Pusher('f133b70effe845679984', {
      cluster: 'eu',
      forceTLS: true,
    });
    this.chatChannel = this.pusher.subscribe('my-channel');
    this.chatChannel.bind('my-event', (data) => {
      this.taleplerim();
    });
  }
  setModalLoading(visible) {
    this.setState({modalLoading: visible});
  }
  _onRefresh() {
    this.taleplerim();
  }
  componentDidMount() {
    OneSignal.setNotificationOpenedHandler(this.onOpened);
    const {navigation} = this.props;
    this.taleplerim();

    navigation.addListener('willFocus', () => {
      this.taleplerim();
    });
  }
  componentWillMount() {
    // OneSignal.init("9805c75f-b157-4365-bbd2-8af3c693af59", {kOSSettingsKeyAutoPrompt : true});
    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened.bind(this));
    // OneSignal.addEventListener('ids', this.onIds);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  onReceived(notification) {
    console.log('Notification received: ', notification);
  }
  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    console.log(
      'cekid : ' + openResult.notification.payload.additionalData.cek_id,
    );
    console.log(
      'Teklif ID : ' + openResult.notification.payload.additionalData.teklif_id,
    );
    if (
      openResult.notification.payload.additionalData.cek_id ||
      openResult.notification.payload.additionalData.teklif_id
    ) {
      this.props.navigation.navigate('CekDetay', {
        bekleyen_cek_id: openResult.notification.payload.additionalData.cek_id,
        id: openResult.notification.payload.additionalData.teklif_id,
      });
    }
  };

  onIds = (device) => {
    console.log('Device info: ', device.userId);
  };
  handleBackButton = () => {
    Alert.alert(
      '',
      'Uygulamadan Çıkmak İstediğinize emin misiniz?',
      [
        {
          text: 'Evet',
          onPress: () => BackHandler.exitApp(),
        },
        {
          text: 'Hayır',
          onPress: () => console.log('presed'),
        },
      ],
      {cancelable: false},
    );

    return true;
  };
  async taleplerim() {
    try {
      const myToken = await AsyncStorage.getItem('@myStores:access_token');
      let response = await fetch(
        `https://pro.faktodeks.com//api/getTalepler/${myToken}`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status == '200' || response.status == '201') {
        let responseJson = await response.json();
        this.setState({talepler: responseJson.talepler, refreshing: false});

        this.setModalLoading(false);
      } else {
        Alert.alert(
          '',
          'Kategoriler Getirilemedi!',
          [
            {
              text: 'OK',
              onPress: () => console.log('presed'),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async talepSil(cekid) {
    try {
      let response = await fetch(`https://pro.faktodeks.com//api/talepSil`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cek_id: cekid,
        }),
      });
      console.log(response);
      if (response.status == '200' || response.status == '201') {
        let responseeJson = await response.json();
        this.taleplerim();
      } else {
        this.setModalLoading(false);
        this.setState({hata: '1'});
      }
    } catch (error) {
      console.log(response.json());
    }
  }

  async talepKapatTeklifli(cekid) {
    try {
      let response = await fetch(
        `https://pro.faktodeks.com//api/talepKapatTeklifli`,
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cek_id: cekid,
          }),
        },
      );
      console.log(response);
      if (response.status == '200' || response.status == '201') {
        let responseeJson = await response.json();
        this.taleplerim();
        console.log('yapiyursun bu işi');
      } else {
        this.setModalLoading(false);
        this.setState({hata: '1'});
        console.log('denedik beee');
      }
    } catch (error) {
      console.log(response.json());
      console.log('BAŞARAMADIKKKKKKKK');
    }
  }

  async teklifKapat(cekid) {
    try {
      let response = await fetch(`https://pro.faktodeks.com//api/teklifKapat`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cek_id: cekid,
        }),
      });
      console.log(response);
      if (response.status == '200' || response.status == '201') {
        let responseJson = await response.json();
        this.taleplerim();
      } else {
        this.setModalLoading(false);
        this.setState({hata: '1'});
      }
    } catch (error) {}
  }
  async teklifAc(cekid) {
    try {
      let response = await fetch(`https://pro.faktodeks.com//api/teklifAc`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cek_id: cekid,
        }),
      });
      console.log(response);
      if (response.status == '200' || response.status == '201') {
        this.taleplerim();
      } else {
        this.setModalLoading(false);
        this.setState({hata: '1'});
      }
    } catch (error) {}
  }

  
  render() {
    return (

        
        <Container >
       
        <ImageBackground source={
       this.state.talepler == '' ?    require('../images/bs3.png') : require('../images/Background.png')
          
          }  style={{width: '100%', height: '100%'}}>
     
        <Menu back yer="Taleplerim"/>
          <Content style={{backgroundColor:'#16AAE8'}}>

                    <FlatList
                    numColumns={1}
                    data={this.state.talepler}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => (item + index).toString()}
                    refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          tintColor={'#313131'}
                          title={'Yükleniyor'}
                          titleColor={'#313131'}
                          onRefresh={this._onRefresh.bind(this)}
                         
                      />
                  }
                 
                    renderItem={({ item }) => (
                       <View>
                         {item.durum == 1 ?

                        <SwipeRow
                        style={{borderTopEndRadius:20, height:HEIGHT/5, backgroundColor:'transparent',marginTop:10,marginBottom:10}}
                        rightOpenValue={-WIDTH/7}
                        leftOpenValue={WIDTH/10}
                        body={
                            <Button onPress={() =>  this.props.navigation.navigate('CekDetay',{cek_id:item.id,guncellenme:item.fark})} style={{backgroundColor:'transparent',width:'100%',height:'100%'}}>
                            <View  style={{ borderBottomWidth:0,borderBottomColor:'#D1D1D1', flexDirection:'column',justifyContent:'center',borderRightWidth:20,borderRightColor:'#ff4d4d',alignItems:'center',height:HEIGHT/5,width:WIDTH/1}}>   
                             
                              <Row style={{borderTopEndRadius:20,  borderTopStartRadius:0, backgroundColor:'#FFFFFF', paddingTop:5,borderTopColor:'#FFFFFF', borderBottomWidth:0.5,borderBottomColor:'#D1D1D1',paddingHorizontal:WIDTH/35}}>
                              <Col style={{flex:1,marginTop:10}}>
                                <Text style={{color:'black'}}>{item.eklenme}</Text>
                                </Col>
                                <Col style={{flex:1,marginTop:10}}>
                                {/* <Text style={{color:'black',textAlign:'right'}}>{item.altKategoriText}</Text> */}
                                <Text style={{textAlign:'right'}}>İşlem Tipi</Text>
                                </Col>
                                <Col style={{flex:1,marginTop:10}}>
                                {/* <Text style={{color:'black',textAlign:'right'}}>{item.anaKategoriText}</Text> */}
                                 <Text style={{color:'black',textAlign:'right'}}>{item.altKategoriText}</Text> 
                    



                                     
                                </Col>
                              </Row>
                            
                            
                              <Button onPress={() =>  this.props.navigation.navigate('CekDetay',{cek_id:item.id,guncellenme:item.fark})} style={{backgroundColor:'transparent',width:'100%'}}>
                           <Row style={{ backgroundColor:'#ffffff'}}>
                           
  
                           
                                   


                                <Col>
                                    <Image
                                      style={{width:WIDTH/4,height:50,resizeMode:'contain',left:10 ,bottom:15  }}
                                      source={
                                        {uri : 'https://pro.faktodeks.com//uploads/bankalar/'+item.logo}
                                        } 
                                  />
                                </Col>
                                <Col style={{flexDirection:'column'}}>
                                  <Text  style={{textAlign:'right',right:10}}>Çek No</Text>
                                <Text style={{textAlign:'right',color:'black',fontWeight:'bold'}}>{item.cek_no}</Text>
                                </Col>
                                <Col style={{flexDirection:'column'}}>
                                  <Text style={{textAlign:'right',right:10}}>Çek Tarihi</Text>
                                <Text style={{textAlign:'right',color:'black',fontWeight:'bold',right:10}}>{item.tarih}</Text>

                                {/* <Text style={{textAlign:'right',marginRight:-30,top:-37}}> -> </Text> */}
                                <Image
                                source={require('../assets/ok2.png')}
                                            style={{left:122, top:-37,width:27,height:27,}}
                                            
                                        />

                                  </Col>
                               
                                  
                                   
                              </Row>
                              </Button>
                                   
                              <Row style={{backgroundColor:'#fff',height:HEIGHT/20,}}>
                                  <Col> 
                                    <Button style={{borderBottomStartRadius:0, backgroundColor:'#ff4d4d', width:'100%',height:'100%',flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                                       {/* <AntDesign  name='left' style={{textAlign:'left',color:'white',fontSize:WIDTH/25,marginRight:15}}/> */}
                                     

                                      {/* onPress={() => {
                            item.toplam_teklif == 0 ?
                            this.props.navigation.navigate('CekDetay',{cek_id:item.id,guncellenme:item.fark}):
                             this.props.navigation.navigate('Teklifler',{cek_id:item.id,guncellenme:item.fark})
                                      }}> */}

                         <Text style={{color:'white',fontSize:WIDTH/30,textAlign:'center'}}>TEKLİFE KAPALI</Text>
                                    </Button>
                                  </Col>
                                   <Col style={{backgroundColor:'#F5F5F5',justifyContent:'center',}}>
                                     <Text style={{top:5,fontSize:25,color:'black',fontWeight:'bold',textAlign:'right',paddingRight:10}}>{item.miktar} {item.para_birim}</Text>
                                  </Col>
                                </Row>
                         </View>
                          </Button>
                        }
                        right={
                          <View style={{flexDirection:'row',}}>
                            <Button style={{marginTop:10, height:HEIGHT/5,backgroundColor:'#ff4d4d',flexDirection:'column',justifyContent:'center',alignItems :'center'}}
                             onPress={() => this.teklifAc(item.id)}>
                               
                             {/* <Text style={{color:'white',textAlign:'center'}}>TEKLİFLERE </Text> */}
                             <Text style={{borderWidth:0.5 ,color:'white',textAlign:'center'}}> KAPALI </Text>
                          </Button>
                          {/* <Button style={{marginTop:10,height:HEIGHT/5,backgroundColor:'#FF8900',flexDirection:'column',justifyContent:'center',alignItems :'center'}} 
                          onPress={() => {
                            // item.toplam_teklif == 0 ?
                            // this.props.navigation.navigate('CekDetay',{cek_id:item.id,guncellenme:item.fark}):
                            this.props.navigation.navigate('Teklifler',{cek_id:item.id,guncellenme:item.fark}) */}
                          {/* }}> */}
                            
                            {/* <Text style={{borderWidth:0.5 ,color:'white',textAlign:'center'}}> DETAY </Text> */}
                             {/* <Text style={{color:'white',textAlign:'center'}}> DETAYI</Text> */}
                          {/* </Button> */}
                          </View>
                          
                        }
                        left={
                          <View style={{flexDirection:'row'}}>
                            <Button style={{marginTop:10, height:HEIGHT/5,backgroundColor:'#D1D1D1',flexDirection:'column',justifyContent:'center',alignItems :'center'}}
                             onPress={() => 
                             
                             

                              Alert.alert(
                                '',
                                'Bu Talebi Silmek İstediğinize Emin Misiniz ?',
                                [
                                    {
                                        text: 'İPTAL', onPress: () => console.log('Talep Sil başarısız')
                                          
                                    },
                                    {
                                      text: 'SİL', onPress: () => this.talepSil(item.id) 
                                     
                                  }
                  
                                ],
                                { cancelable: false },
                            ) 
                         
                             }>
                               
                  
                             <Text style={{borderWidth:0.5 ,color:'black',textAlign:'center'}}> SİL </Text>
                          </Button>
                         
                          </View>
                          
                        }
                      />
                            :null }
                            
                         {item.durum == 2 ?
                        <SwipeRow
                        style={{ height:HEIGHT/5,backgroundColor:'transparent',marginTop:10,marginBottom:10}}
                        rightOpenValue={-WIDTH/7}
                        leftOpenValue={WIDTH/10}
                        body={



                          



                            <View  style={{borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', flexDirection:'column',justifyContent:'center',borderRightWidth:20,borderRightColor:'#00cc00',alignItems:'center', height:HEIGHT/5,width:WIDTH/1}}>   
                              <Row style={{ borderTopEndRadius:20,borderTopStartRadius:0, backgroundColor:'#FFFFFF',paddingTop:5, borderBottomWidth:0.5,borderBottomColor:'#D1D1D1',paddingHorizontal:WIDTH/35}}>
                              <Col style={{flex:1}}>
                                <Text style={{color:'black',}}>{item.eklenme}</Text>
                                </Col>
                                <Col style={{flex:1}}>
                                {/* <Text style={{color:'black',textAlign:'right'}}>{item.altKategoriText}</Text> */}
                                <Text style={{color:'black',textAlign:'right'}}>İşlem Tipi</Text>
                                </Col>
                                <Col style={{flex:1}}>
                                {/* <Text style={{color:'black',textAlign:'right'}}>{item.anaKategoriText}</Text> */}
                                  <Text style={{color:'black',textAlign:'right'}}>{item.altKategoriText}</Text> 
                                </Col>
                              </Row>
                              <Button onPress={() =>  this.props.navigation.navigate('CekDetay',{cek_id:item.id,guncellenme:item.fark})} style={{backgroundColor:'transparent',width:'100%'}}>
                              <Row style={{backgroundColor:'#fff',padding:10}}>
                                <Col>
                                    <Image
                                      style={{width:WIDTH/4,height:50,resizeMode:'contain' ,left:10,bottom:10  }}
                                      source={
                                        {uri : 'https://pro.faktodeks.com//uploads/bankalar/'+item.logo}
                                        } 
                                  />
                                </Col>
                                <Col style={{flexDirection:'column'}}>
                                  <Text  style={{textAlign:'right'}}>Çek No</Text>
                                <Text style={{textAlign:'right',color:'black',fontWeight:'bold',}}>{item.cek_no}</Text>
                                </Col>
                                <Col style={{flexDirection:'column'}}>
                                  <Text style={{textAlign:'right',right:10}}>Çek Tarihi</Text>
                                <Text style={{textAlign:'right',color:'black',fontWeight:'bold',right:10}}>{item.tarih}</Text>


                                {/* <Text style={{textAlign:'right',marginRight:-30,top:-37}}> -> </Text>  */}
                          
                                <Image
                                source={require('../assets/ok2.png')}
                                            style={{left:125, top:-30,width:27,height:27,}}
                                            
                                        />
                           
                                  </Col>
     
                              </Row>
                              </Button>
                              <Row style={{backgroundColor:'#ffffffff',height:HEIGHT/18,borderBottomStartRadius:50}}>
                                  <Col> 
                                  {item.toplam_teklif == 0 ? 
                                    <Button style={{borderBottomStartRadius:0, backgroundColor:'#e6e6e6', width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                      <Text style={{color:'black',fontSize:WIDTH/25,top:6 ,textAlign:'center'}}>TEKLİF YOK</Text>
                                    </Button>
                                    :
                                    <Button onPress={() =>  this.props.navigation.navigate('Teklifler',{cek_id:item.id,guncellenme:item.fark})} style={{borderBottomStartRadius:0,backgroundColor:'#FF8900', width:'100%',height:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                          <Image
                                            style={{width:20,height:20,resizeMode:'contain',top:8,right:10}}
                                            source={require('../assets/zil.png')}
                                        />
                                    <Text style={{ color:'white',fontSize:WIDTH/25,top:7}}>{item.toplam_teklif} TEKLİF VAR</Text>
                                  </Button>
                                   }
                                  </Col>
                                   <Col style={{backgroundColor:'#F5F5F5',justifyContent:'center'}}>
                                     <Text style={{fontSize:25 ,top:7,color:'black',fontWeight:'bold',textAlign:'right',paddingRight:10}}>{item.miktar} {item.para_birim}</Text>
                                  </Col>
                                </Row>
                         </View>
                        }






                        
                        right={
                          <View style={{flexDirection:'row',borderBottomStartRadius:20}}>
                            <Button style={{ top:10,height:HEIGHT/5,backgroundColor:'#00cc00',flexDirection:'column',justifyContent:'center',alignItems :'center'}}
                             onPress={() => 
                              //  this.teklifKapat(item.id)

                    
                             { item.toplam_teklif == 0 ?

                                this.teklifKapat(item.id)
                               :

//                                this.talepSil(item.id)
//                              }
                              
                              Alert.alert(
                                'Çekinize Teklif Var!',
                               'Bu taleplebi kapatırsanız. Çekiniz Silinecek ve aynı çek 72 saat yüklenemez.!',
                               [
                                    {
                                          text: 'Yinede Kapat', onPress: () => this.talepSil(item.id)
                                      //  text: 'Yinede Kapat', onPress: () => this.talepKapatTeklifli(item.id)
                  
                                    },
                                  {
                                      text: 'İptal', onPress: () => console.log('Çek teklife kapatılmadı.')
                
                                  }
                  
                                ],
                                 { cancelable: false },
                             )
                            
                             
                         }}>
     
                            

                          
                             <Text style={{borderWidth:0.5 ,color:'white',textAlign:'center',}}>  AÇIK </Text>

                            
                          </Button>
                          {/* <Button style={{borderWidth:0.5 ,top:10,height:HEIGHT/5,backgroundColor:'#FF8900',flexDirection:'column',justifyContent:'center',alignItems :'center'}} 
                          onPress={() => {
                            item.toplam_teklif == 0 ?
                            this.props.navigation.navigate('CekDetay',{cek_id:item.id,guncellenme:item.fark}):
                            this.props.navigation.navigate('CekDetay',{cek_id:item.id,guncellenme:item.fark})
                          }}>
                             <Text style={{borderWidth:0.5 ,color:'white',textAlign:'center'}}> DETAY </Text>
                              <Text style={{color:'white',textAlign:'center'}}> DETAYI</Text> 
                          </Button> */}
                          </View>
                          
                        }




                        left={
                          <View style={{flexDirection:'row'}}>
                            <Button style={{marginTop:10, height:HEIGHT/5,backgroundColor:'#D1D1D1',flexDirection:'column',justifyContent:'center',alignItems :'center'}}
                             onPress={() => 
                             
                             

                              Alert.alert(
                                '',
                                'Bu Talebi Silmek İstediğinize Emin Misiniz ?',
                                [
                                    {
                                        text: 'İPTAL', onPress: () => console.log('Talep Sil başarısız')
                                          
                                    },
                                    {
                                      text: 'SİL', onPress: () => this.talepSil(item.id) 
                                     
                                  }
                  
                                ],
                                { cancelable: false },
                            ) 
                         
                             }>
                               
                  
                             <Text style={{borderWidth:0.5 ,color:'black',textAlign:'center'}}> SİL </Text>
                          </Button>
                         
                          </View>
                          
                        }








                      />
                            :null }
                       
                          {item.durum == 3 ?
                          
                        <SwipeRow
                        style={{ height:HEIGHT/5,backgroundColor:'transparent',marginTop:10,marginBottom:10}}
                        rightOpenValue={-WIDTH/7}
                        leftOpenValue={-WIDTH/10}
                        body={
                            <View  style={{borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', flexDirection:'column',justifyContent:'center',borderRightWidth:20,borderRightColor:'#ffffff',alignItems:'center', height:HEIGHT/5,width:WIDTH/1}}>   
                              <Row style={{ borderTopEndRadius:20,backgroundColor:'#FFFFFF',paddingTop:5, borderBottomWidth:0.5,borderBottomColor:'#D1D1D1',paddingHorizontal:WIDTH/35}}>
                              <Col style={{flex:1}}>
                                <Text style={{color:'black'}}>{item.eklenme}</Text>
                                </Col>
                                <Col style={{flex:1}}>
                                <Text style={{color:'black',textAlign:'right'}}>{item.altKategoriText}</Text>
                                </Col>
                                <Col style={{flex:1}}>
                                <Text style={{color:'black',textAlign:'right'}}>{item.anaKategoriText}</Text>
                                </Col>
                              </Row>

                              <Button onPress={() =>  this.props.navigation.navigate('CekDetay',{cek_id:item.id,guncellenme:item.fark})} style={{backgroundColor:'transparent',width:'100%'}}>
                              <Row style={{backgroundColor:'#fff'}}>
                                <Col>
                                    <Image
                                      style={{width:WIDTH/4,height:50,resizeMode:'contain',left:10 ,bottom:25}}
                                      source={
                                        {uri : 'https://pro.faktodeks.com//uploads/bankalar/'+item.logo}
                                        } 
                                  />
                                </Col>
                                <Col style={{flexDirection:'column'}}>
                                  <Text  style={{textAlign:'right',right:10}}>Çek No</Text>
                                <Text style={{textAlign:'right',color:'black',fontWeight:'bold'}}>{item.cek_no}</Text>
                                </Col>
                                <Col style={{flexDirection:'column'}}>
                                  <Text style={{textAlign:'right',right:10}}>Çek Tarihi</Text>
                                <Text style={{textAlign:'right',color:'black',fontWeight:'bold',right:10}}>{item.tarih}</Text>

                                 {/* <Text style={{textAlign:'right',marginRight:-30,top:-37}}> -> </Text>  */}

                                <Image
                                source={require('../assets/ok2.png')}
                                            style={{left:130, top:-30,width:27,height:27,}}
                                            
                                        /> 


                                  </Col>
                              </Row>
                              </Button>
                              <Row style={{backgroundColor:'#ffffffff',height:HEIGHT/17,}}>
                                  <Col> 
                                  
                                  {item.toplam_teklif == 0 ? 
                                    <Button style={{ backgroundColor:'#00FFF5', width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                      <Text style={{color:'#042264',fontSize:WIDTH/30,textAlign:'center'}}>TEKLİF YOK</Text>
                                    </Button>
                                    :
                                    <Button style={{backgroundColor:'#FF8900', width:'100%',height:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                 
                                    <Text style={{color:'white',fontSize:WIDTH/30,textAlign:'center'}}>İSTİHBARATTA</Text>
                                  </Button>
                                   }
                                  </Col>
                                   <Col style={{backgroundColor:'#F5F5F5',justifyContent:'center'}}>
                                     <Text style={{fontSize:25,color:'black',fontWeight:'bold',textAlign:'right',paddingRight:10}}>{item.miktar} {item.para_birim}</Text>
                                  </Col>
                                </Row>
                         </View>
                        }
                        right={
                          <View style={{flexDirection:'row'}}>
                          
                            {/* <Button style={{margintop:10, height:HEIGHT/5,backgroundColor:'#707070',flexDirection:'column',justifyContent:'center',alignItems :'center'}} */}
                            <Button style={{ top:10,height:HEIGHT/5,backgroundColor:'#00cc00',flexDirection:'column',justifyContent:'center',alignItems :'center'}}
                             onPress={() => this.teklifKapat(item.id)}>
                             
                             {/* <Text style={{color:'white',textAlign:'center'}}> KAPAT</Text> */}
                             
                             <Text style={{borderWidth:0.5 ,color:'white',textAlign:'center',}}>  AÇIK </Text>

                          </Button>


                         
                          

                          </View>
                          
                        }

                        // left={
                        //   <View style={{flexDirection:'row'}}>
                        //     <Button style={{marginTop:10, height:HEIGHT/5,backgroundColor:'#D1D1D1',flexDirection:'column',justifyContent:'center',alignItems :'center'}}
                        //      onPress={() => 
                             
                             

                        //       Alert.alert(
                        //         '',
                        //         'Bu Talebi Silmek İstediğinize Emin Misiniz ?',
                        //         [
                        //             {
                        //                 text: 'İPTAL', onPress: () => console.log('Talep Sil başarısız')
                                          
                        //             },
                        //             {
                        //               text: 'SİL', onPress: () => this.talepSil(item.id) 
                                     
                        //           }
                  
                        //         ],
                        //         { cancelable: false },
                        //     ) 
                         
                        //      }>
                               
                  
                        //      <Text style={{borderWidth:0.5 ,color:'black',textAlign:'center'}}> SİL </Text>
                        //   </Button>
                         
                        //   </View>
                          
                        // }


                      />
                            :null  }
                       </View>
                    )} /> 
              
                 
              
                  
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

    <Altbar ileri='' ileriQR=''/>          
    </ImageBackground>
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
   

modalViewLoading: {
  height: HEIGHT / 2,
  width: WIDTH / 1.5,
  justifyContent: 'space-around',
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