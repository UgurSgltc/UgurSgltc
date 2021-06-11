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
    ActivityIndicator,
    Animated,
    Text,
    Keyboard,
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import { Container,  Button, Textarea, Header,Col,Row,Footer,FooterTab,Grid, Left, Body,Icon, Right, Content,Item,Input,Picker, Label,List,ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  import Moment from 'moment/min/moment-with-locales';
import CalendarPicker from 'react-native-calendar-picker';
import { withNavigation } from 'react-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Menu from '../inc/header';
import RNFetchBlob from 'rn-fetch-blob';
import Altbar from '../inc/footer';
import Modal, {
  ModalTitle,
  ModalContent,
 
} from 'react-native-modals';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

class temlik  extends Component {
    constructor(props) {
    
        super(props);
        this.state = {
        modalVisible:false,
        modalTarih:false,
        modalSuccess:false,
        altKategoriText:'',
        altKategoriId:'',
        anaKategoriId:'',
        anaKategoriText:'',
        sozlesmeModal:false,
        cekArkaModal:false,
        faturaModal:false,
        cekEFaturaModal:false,
        modalLoading:false,
        loading:false,
          showFooter:true,
        sozlesmePath:'',
        sozlesmeUri:'',
        sozlesmeData:'',
        faturaPath:'',
        faturaUri:'',
        faturaData:'',
        selectedStartDate: null,

        temlik_tutar:'',
        talep_tutar:'',
        firma_unvan:'',
        firma_vkn:'',
        borclu_unvan:'',
        cek_id:''
    }
    this.onDateChange = this.onDateChange.bind(this);

  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      modalTarih:false,
    });
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
  setModalSuccess(visible) {
    this.setState({modalSuccess: visible});
    }
setModalVisible(visible) {
  this.setState({modalVisible: visible});
  }
  
setModalLoading(visible) {
  this.setState({modalLoading: visible});
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.checkWhich()
        });
  } 
  async checkWhich(){
    const { params } = this.props.navigation.state;
    if(params){
        this.setState({
          anaKategoriText:params.anaKategoriText,
          anaKategoriId:params.anaKategoriId,
          altKategoriId:params.altKategoriId,
          altKategoriText:params.altKategoriText,
        
        })
    }
  }

  async teklifAc(){
    try{
      let response = await fetch(`https://pro.faktodeks.com//api/forBanka`, {
          method: 'post',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cek_id : this.state.cek_id,
          }),
      });
      console.log(response);
      if (response.status == '200' || response.status == '201') {
   this.setState({ modalSuccess:false})

        this.props.navigation.navigate('Anasayfa')
      } else {
          alert("hata 2")
      }
  
    }
    catch(error){
  
    }
  }

  sozlesmeImageLibrary = () =>{
    ImagePicker.openPicker({
      includeBase64: true,
      compressImageQuality:0.5, cropperToolbarTitle:'Resmi Kırp',
      cropping:true
    }).then(image => {
      let source = {uri: image.path};
          console.log("datas : "  + JSON.stringify(image.data))
          console.log("source : "  + source.uri)
          this.setState({
            sozlesmePath: image,
            sozlesmeData: image.data,
            sozlesmeUri: source.uri,
          });
        
    });
    }
    sozlesmeImageCamera = () =>{
      ImagePicker.openCamera({
        includeBase64: true,
        compressImageQuality:0.5, cropperToolbarTitle:'Resmi Kırp',
        cropping:true
      }).then(image => {
        let source = {uri: image.path};
            console.log("datas : "  + JSON.stringify(image.data))
            console.log("source : "  + source.uri)
            this.setState({
              sozlesmePath: image,
              sozlesmeData: image.data,
              sozlesmeUri: source.uri,
            });
          
      });
    }


    faturaImageLibrary = () =>{
      ImagePicker.openPicker({
        includeBase64: true,
        compressImageQuality:0.5, cropperToolbarTitle:'Resmi Kırp',
        cropping:true
      }).then(image => {
        let source = {uri: image.path};
            console.log("datas : "  + JSON.stringify(image.data))
            console.log("source : "  + source.uri)
            this.setState({
              faturaPath: image,
              faturaData: image.data,
              faturaUri: source.uri,
            });
          
      });
    }
    faturaImageCamera = () =>{
      ImagePicker.openCamera({
        includeBase64: true,
        compressImageQuality:0.5, cropperToolbarTitle:'Resmi Kırp',
        cropping:true
      }).then(image => {
        let source = {uri: image.path};
            console.log("datas : "  + JSON.stringify(image.data))
            console.log("source : "  + source.uri)
            this.setState({
              faturaPath: image,
              faturaData: image.data,
              faturaUri: source.uri,
            });
          
      });
    }
renderSozlesmeUri() {
    if (this.state.sozlesmeUri) {
      return <Image
        source={{ uri: this.state.sozlesmeUri }}
        style={{width:'100%',height:HEIGHT/15, resizeMode:'cover',borderTopLeftRadius:15,borderBottomLeftRadius:15}}
      />
    } else {
      return null
    }
  }
  
renderFaturaUri() {
  if (this.state.faturaUri) {
    return <Image
      source={{ uri: this.state.faturaUri }}
      style={{width:'100%',height:HEIGHT/15, resizeMode:'cover',borderTopLeftRadius:15,borderBottomLeftRadius:15}}
    />
  } else {
    return null
  }
}

async  uploadPhoto(){
  if (this.state.sozlesmeUri == '' ||  this.state.faturaUri == '' ) {
      alert('Lütfen Çekinizin Tüm Görsellerini Yükleyiniz');
  }else  if (this.state.firma_unvan == '' ||  this.state.firma_vkn == '' ||  this.state.borclu_unvan == '' ||  this.state.talep_tutar == '' ||  this.state.temlik_tutar == '' ) {
    alert('Lütfen Çekinizin Tüm Görsellerini Yükleyiniz');
}
  else {
  this.setState({loading:true});
  const { selectedStartDate } = this.state;
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  Moment.locale('tr');
  var dt = startDate;
  const a =Moment(dt).format('DD/MM/YYYY') 

      let str =this.state.talep_tutar;
      var lastTree = str.substr(str.length - 3); 
      if(lastTree == ',00'){
        str = str.substring(0, str.length - 3);
        str = str.replace(".", "");
      }else{
        str = str.replace(",", ".");
      }

      let fatura =this.state.temlik_tutar;
      var faturaTree = str.substr(fatura.length - 3); 
      if(faturaTree == ',00'){
        fatura = fatura.substring(0, fatura.length - 3);
        fatura = fatura.replace(".", "");
      }else{
        fatura = fatura.replace(",", ".");
      }
    console.log(str)
    console.log(fatura)
    try {
      const token = await AsyncStorage.getItem('@myStores:access_token');
     RNFetchBlob.fetch('POST', `https://pro.faktodeks.com//api/addNewTemlik`, {
      'Content-Type' : 'multipart/form-data',
  }, [
       {
          name : 'sozlesme',
          filename : 'sozlesme.png',
          data: this.state.sozlesmeData
        },
         {
            name : 'fatura',
            filename : 'fatura.png',
            data: this.state.faturaData
          },
          {
            name : 'token',
            data: token
          },
          {
            name : 'firma_unvan',
            data: this.state.firma_unvan
          },
          {
            name : 'vkn',
            data: this.state.firma_vkn
          },
          {
            name : 'borclu_unvan',
            data: this.state.borclu_unvan
          },
          
          {
            name : 'tarih',
            data: a
          },
          {
            name : 'talep_tutar',
            data: str
          },
          {
            name : 'miktar',
            data: fatura
          },
  ]).then((response) => {
    console.log(response);
   let responseJson =  response.json();

   this.setState({loading:false, modalSuccess:true,cek_id : responseJson.cekid})
    
  }).catch((err) => {
     
  })
  } catch (error) {
      console.error(error);
  }

  }
}

  render() {
  
    const { params } = this.props.navigation.state;
    const today = Moment().format("YYYY-MM-DD");
    const hour = Moment().format("H:mm");
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    Moment.locale('tr');
    var dt = startDate;
    const a =Moment(dt).format('DD/MM/YYYY') 
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
         <Menu borderNo="a" yer="Talep Ekle" ana={params.anaKategoriText} alt={params.altKategoriText}/>
          <Content style={{backgroundColor:'#F5F5F5'}}>
        
            <View style={{width:WIDTH/1,paddingHorizontal:25,backgroundColor:'#F5F5F5'}}>
             
                <TouchableOpacity style={styles.row} onPress={() => {this.setState({sozlesmeModal: true})}}>
                  <View style={{flex:4}}>
                    {this.state.sozlesmeUri != '' ?
                    this.renderSozlesmeUri():
                    <Text style={styles.text}>Temliğe konu olan iş sözleşmesini yükle</Text>
                    }
                  </View>
                  <View style={this.state.sozlesmeUri != '' ? styles.sagAktif : styles.sag}>
                  {this.state.sozlesmeUri != '' ?
                    <Image
                        style={{width:WIDTH/13,resizeMode:'contain',}}
                        source={require('../assets/sagAktif.png')} 
                    />:
                  <Image
                                style={{width:WIDTH/13,resizeMode:'contain',}}
                                source={require('../assets/ekle.png')} 
                            />
                  }
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => {this.setState({faturaModal: true})}}>
                  <View style={{flex:4}}>
                  {this.state.faturaUri != '' ?
                    this.renderFaturaUri():
                    <Text style={styles.text}>Temliğe konu olan fatura yükle</Text>
                    }
                  </View>
                  <View style={this.state.faturaUri != '' ? styles.sagAktif : styles.sag}>
                  {this.state.faturaUri != '' ?
                    <Image
                        style={{width:WIDTH/13,resizeMode:'contain',}}
                        source={require('../assets/sagAktif.png')} 
                    />:
                  <Image
                                style={{width:WIDTH/13,resizeMode:'contain',}}
                                source={require('../assets/ekle.png')} 
                            />
                  }
                  </View>
                </TouchableOpacity>
                <Item style={styles.item}>
                        <Input placeholder='TEMLİK VEREN FİRMANIN ÜNVANI'
                        placeholderTextColor='#042264' 
                        style={{color:'#042264'}}
                        value = {
                            this.state.firma_unvan
                        }
                        onChangeText = {(value) => this.setState({firma_unvan: value})}
                        />
                    </Item>
                    <Item style={styles.item}>
                        <Input placeholder='TEMLİK VEREN FİRMA VKN'
                        placeholderTextColor='#042264'
                        style={{color:'#042264'}}
                        keyboardType='numeric'
                        maxLength={11}
                        value = {
                            this.state.firma_vkn
                        }
                        onChangeText = {(value) => this.setState({firma_vkn: value})}
                        />
                    </Item>
                    <Item style={styles.item}>
                        <Input placeholder='TEMLİK BORÇLUSU FİRMANIN ÜNVANI'
                        placeholderTextColor='#042264'
                        style={{color:'#042264'}}
                        value = {
                            this.state.borclu_unvan
                        }
                        onChangeText = {(value) => this.setState({borclu_unvan: value})}
                        />
                    </Item>
                    <Item  style={styles.item}>
                            <Input 
                               style={{color:'#042264'}}
                               keyboardType='numeric'
                               maxLength={20}
                             value = {
                                this.state.talep_tutar
                            }
                            onChangeText = {(value) => this.setState({talep_tutar: value})}
                            placeholderTextColor='#042264'
                            placeholder='TALEP EDİLEN TEMLİK TUTARI'
                            />
                        </Item>
                    <Row style={{marginTop:20, }}>
                          <Button  block transparent  onPress={() => {
                            this.setState({modalTarih:true});
                                }} style={{backgroundColor:'#fff',width:'100%',borderRadius:10}} >
                              <Text style={{color:'#042264',textAlign:'left',position:'absolute',left:5, fontSize:WIDTH/25}}>
                                {this.state.selectedStartDate == null ? 'TEMLİK VADESİ' : a}</Text>
                            </Button>
                        </Row>
               
                        <Item  style={styles.item}>
                            <Input 
                               style={{color:'#042264'}}
                               keyboardType='numeric'
                               maxLength={20}
                             value = {
                                this.state.temlik_tutar
                            }
                            onChangeText = {(value) => this.setState({temlik_tutar: value})}
                            placeholderTextColor='#042264'
                            placeholder='TEMLİK TUTARI'
                            />
                        </Item>
            </View>
                <Row style={{ justifyContent:'center' ,marginTop:20, paddingHorizontal:20,marginBottom:20 }}>
                  <Button block transparent onPress={this.uploadPhoto.bind(this)} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                  <Text style={{color:'#011153'}}>DEVAM</Text>
                </Button>
              </Row>
  </Content>
   
  <Modal
   onTouchOutside={() => this.setState({ modalSuccess: false })}
   onSwipeOut={() => this.setState({ modalSuccess: false })}
                        animationType="slide"
                        transparent={true}
                      visible={this.state.modalSuccess}
                    onRequestClose={() => {
                      this.setModalSuccess(!this.state.modalSuccess);
                    }}>
                    <Grid  style={styles.main}>
                     <View style={{width:WIDTH/1.3,height:HEIGHT/2,borderRadius:20}}>
                      
                     <Row style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',flexDirection:'column',borderTopLeftRadius:20,borderTopRightRadius:20,marginTop:10}}>
                     <Image
                                style={{width:WIDTH/4,resizeMode:'contain',padding:20,}}
                                source={require('../assets/modal-logo.png')} 
                            />
                       <Text style={{textAlign:'center',color:'#042264', fontWeight:'bold',fontSize:WIDTH/25}}>Talebiniz Oluşturuldu.</Text>
                       <Text style={{textAlign:'center',color:'#042264'}}>Talebinize bankalardan da</Text>
                      <Text  style={{textAlign:'center',color:'#042264', fontWeight:'bold',fontSize:18}}>teklif gelmesini ister misiniz?</Text>
                     </Row>
                     <Row style={{backgroundColor:'#fff',flexDirection:'column',paddingHorizontal:20,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                     <Button  bordered light style={{marginTop:20,padding:10,width:'100%', borderRadius:25,justifyContent:'center',alignItems:'center',borderColor:'#042264',borderWidth:1}}
                  onPress={() => this.props.navigation.navigate('Anasayfa')}
                     >
                      <Text style={{textAlign:'center',color:'#042264'}}>SADECE FAKTORİNG</Text>
                    </Button>
                    <TouchableOpacity   onPress={this.teklifAc.bind(this)} style={{marginTop:20,padding:10,width:'100%',backgroundColor:'#00FFF5',borderColor:'#042264',borderWidth:1, borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{textAlign:'center',color:'#042264'}}>BANKA VE FAKTORİNG</Text>
                    </TouchableOpacity>
                     </Row>
                     </View>
                    </Grid>

                  </Modal>
         
  <Modal
          animationType="slide"
          transparent={false}
          height={1}
          width={1}
          visible={this.state.modalTarih}
          onRequestClose={() => {
            this.setState({ modalTarih: false })
          }}>
            <Header androidStatusBarColor='white' style={{backgroundColor:'#F9F9F9',borderBottomColor:'#a0a0a0',borderBottomWidth:0.7}}>
                <Body>
                   <Text style={{color:'#4a4a4a'}}>Tarih Seçiniz </Text>
                </Body>
                <Right>
                <TouchableOpacity hasText transparent onPress={() => {
                 this.setState({ modalTarih: false })
                }}>   
                    <Text>İptal</Text>
                </TouchableOpacity>
                </Right>
                </Header>
          <Content>
          <List>
                <CalendarPicker
                minDate={today}
                startFromMonday={true}
                 weekdays={['Pzt', 'Sal', 'Çar', 'Per', 'Cu', 'Cmt', 'Pz']}
                 months={['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']}
                 previousTitle="Geri"
                 nextTitle="İleri"
                onDateChange={this.onDateChange}
              />
          </List>
        </Content>
        </Modal>
     
  <Modal.BottomModal
          visible={this.state.sozlesmeModal}
          onTouchOutside={() => this.setState({ sozlesmeModal: false })}
          height={0.3}
          width={0.8}
          onSwipeOut={() => this.setState({ sozlesmeModal: false })}
        >
          <ModalContent
            style={{
              width:WIDTH/1,
              backgroundColor: 'white',
            }}
          >
            <List style={{flexDirection:'column',backgroundColor:'#fff',borderTopLeftRadius:45,borderTopRightRadius:45,}}>
                <Button block bordered onPress={() => {
                    this.setState({sozlesmeModal:false})
                    this.sozlesmeImageCamera()
                }} style={{marginTop:10}}>
                <Text>Fotoğraf Çek</Text>
                </Button>
                <Button bordered block warning onPress={() => {
                    this.setState({sozlesmeModal:false})
                    this.sozlesmeImageLibrary()
                }} style={{marginTop:10}}>
                  <Text>Galeriden Seç</Text>
                </Button>
                <Button block bordered danger onPress={() => {
                    this.setState({sozlesmeModal:false})
                }} style={{marginTop:10}}>
                  <Text>İptal</Text>
                </Button>
            </List>
          </ModalContent>
        </Modal.BottomModal>
        
  <Modal.BottomModal
          visible={this.state.faturaModal}
          onTouchOutside={() => this.setState({ faturaModal: false })}
          height={0.3}
          width={0.8}
          onSwipeOut={() => this.setState({ faturaModal: false })}
        >
          <ModalContent
            style={{
              width:WIDTH/1,
              backgroundColor: 'white',
            }}
          >
            <List style={{flexDirection:'column',backgroundColor:'#fff',borderTopLeftRadius:45,borderTopRightRadius:45,}}>
               <ListItem  bordered onPress={() => {
                      this.setState({faturaModal:false})
                      this.faturaImageCamera()
                }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
               
                <Text>Fotoğraf Çek</Text>
                </ListItem>
                <ListItem  bordered onPress={() => {
                    this.setState({faturaModal:false})
                    this.faturaImageLibrary()
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>Galeriden Seç</Text>
                </ListItem>
                <ListItem  bordered onPress={() => {
                    this.setState({faturaModal:false})
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>İptal</Text>
                </ListItem>
            </List>
          </ModalContent>
        </Modal.BottomModal>
     
<Modal
    visible={this.state.loading}
  
    height={0.1}
  >
    <ModalContent style={{backgroundColor:'transparent',justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large" color="#042264"/>
      </ModalContent>
  </Modal>
                {this.state.showFooter == true ? 
                     <Altbar  checkInfo='a' yolla='CekInfo'/> 
                :null
              }
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(temlik);
const styles = StyleSheet.create({
 row:{
   
  justifyContent:'center',
  alignItems:'center',
   backgroundColor:'white',
   marginTop:15,
   borderRadius:15,
   flexDirection:'row',
   height:HEIGHT/15,
   width:WIDTH/1.1
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
 item:{
  width:'100%', 
  backgroundColor:'#fff',borderRadius:10,
  borderColor:'#fff',
  borderWidth:1,
  marginTop:20
},
 sagAktif:{ 
   height:HEIGHT/15,
   flex:0.7,
   backgroundColor:'#FF8900',
   borderTopRightRadius:15,
   borderBottomRightRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
 sag:{ 
   height:HEIGHT/15,
   flex:0.7,
   backgroundColor:'#042264',
   borderTopRightRadius:15,
   borderBottomRightRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    color:'#042264',
    fontSize:WIDTH/30,
    fontWeight:'bold',
    paddingLeft:10}
});