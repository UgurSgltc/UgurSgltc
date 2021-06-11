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
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import { Container,  Button, Header,Col,Row, Left,Grid,List,Item,Input, Body, Right, Content, ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import QRCodeScanner from 'react-native-qrcode-scanner';
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

class resimler extends Component {
    constructor(props) {
    
        super(props);
        this.state = {
        modalVisible:false,
        modalSuccess:false,
        bankName:'',
        cekNo:'',
        bankaKodu:'',
        subeKodu:'',
        hesapNo:'',
        vgkn:'',
        bankName:'',
        altKategoriText:'',
        altKategoriId:'',
        anaKategoriId:'',
        anaKategoriText:'',
        cekOnModal:false,
        cekArkaModal:false,
        cekFaturaModal:false,
        modalLoading:false,
        loading:false,
        cekOnPath:'',
        cekOnUri:'',
        cekOnData:'',
        cekArkaPath:'',
        cekArkaUri:'',
        cekArkaData:'',
        cekFaturaPath:'',
        cekFaturaUri:'',
        cekFaturaData:'',
        efatura:''
       
    }
     
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
          bankName:params.bank_name,
          cekNo:params.cekNo,
          bankaKodu:params.bankaKodu,
          subeKodu:params.subeKodu,
          hesapNo:params.hesapNo,
          vgkn:params.vgkn,
        })
    }
  }
cekOnImageLibrary = () =>{
ImagePicker.openPicker({
  includeBase64: true,
  cropperChooseText:'Resmi Seç',
  cropperCancelText:'İptal',
  width: 1000,
  height: 800,
  ompressImageQuality:0.6,
   cropperToolbarTitle:'Resmi Kırp',
  cropping:true
}).then(image => {
  let source = {uri: image.path};
      console.log("datas : "  + JSON.stringify(image.data))
      console.log("source : "  + source.uri)
      this.setState({
        cekOnPath: image,
        cekOnData: image.data,
        cekOnUri: source.uri,
      });
    
});
}
cekOnImageCamera = () =>{
  ImagePicker.openCamera({
    includeBase64: true,
    cropperChooseText:'Resmi Seç',
    cropperCancelText:'İptal',
    width: 1000,
    height: 800,
    ompressImageQuality:0.6,
     cropperToolbarTitle:'Resmi Kırp',
         cropping:true
  }).then(image => {
    let source = {uri: image.path};
        console.log("datas : "  + JSON.stringify(image.data))
        console.log("source : "  + source.uri)
        this.setState({
          cekOnPath: image,
          cekOnData: image.data,
          cekOnUri: source.uri,
        });
      
  });
}

cekArkaImageLibrary = () =>{
  ImagePicker.openPicker({
    includeBase64: true,
    cropperChooseText:'Resmi Seç',
    cropperCancelText:'İptal',
    width: 1000,
    height: 800,
    ompressImageQuality:0.6,
     cropperToolbarTitle:'Resmi Kırp',
    cropping:true
  }).then(image => {
    let source = {uri: image.path};
        console.log("datas : "  + JSON.stringify(image.data))
        console.log("source : "  + source.uri)
        this.setState({
          cekArkaPath: image,
          cekArkaData: image.data,
          cekArkaUri: source.uri,
        });
      
  });
}
cekArkaImageCamera = () =>{
  ImagePicker.openCamera({
    includeBase64: true,
    cropperChooseText:'Resmi Seç',
    cropperCancelText:'İptal',
    width: 1000,
    height: 800,
    ompressImageQuality:0.6,
     cropperToolbarTitle:'Resmi Kırp',
    cropping:true
  }).then(image => {
    let source = {uri: image.path};
        console.log("datas : "  + JSON.stringify(image.data))
        console.log("source : "  + source.uri)
        this.setState({
          cekArkaPath: image,
          cekArkaData: image.data,
          cekArkaUri: source.uri,
        });
      
  });
}

cekFaturaImageLibrary = () =>{
  ImagePicker.openPicker({
    includeBase64: true,
    cropperChooseText:'Resmi Seç',
    cropperCancelText:'İptal',
    width: 1000,
    height: 800,
    ompressImageQuality:0.6,
     cropperToolbarTitle:'Resmi Kırp',
    cropping:true
  }).then(image => {
    let source = {uri: image.path};
        console.log("datas : "  + JSON.stringify(image.data))
        console.log("source : "  + source.uri)
        this.setState({
          cekFaturaPath: image,
          cekFaturaData: image.data,
          cekFaturaUri: source.uri,
        });
      
  });
}
cekFaturaImageCamera = () =>{
  ImagePicker.openCamera({
    includeBase64: true,
    cropperChooseText:'Resmi Seç',
    cropperCancelText:'İptal',
    width: 1000,
    height: 800,
    ompressImageQuality:0.6,
     cropperToolbarTitle:'Resmi Kırp',
    cropping:true
  }).then(image => {
    let source = {uri: image.path};
        console.log("datas : "  + JSON.stringify(image.data))
        console.log("source : "  + source.uri)
        this.setState({
          cekFaturaPath: image,
          cekFaturaData: image.data,
          cekFaturaUri: source.uri,
        });
      
  });
}

cekEFaturaImageLibrary = () =>{
  ImagePicker.openPicker({
    includeBase64: true,
    cropperChooseText:'Resmi Seç',
    cropperCancelText:'İptal',
    ompressImageQuality:0.6,
    width: 1000,
    height: 800,
     cropperToolbarTitle:'Resmi Kırp',
    cropping:true
  }).then(image => {
    let source = {uri: image.path};
        console.log("datas : "  + JSON.stringify(image.data))
        console.log("source : "  + source.uri)
        this.setState({
          cekEFaturaPath: image,
          cekEFaturaData: image.data,
          cekEFaturaUri: source.uri,
        });
      
  });
}

renderCekOnUri() {
  if (this.state.cekOnUri) {
    return <Image
      source={{ uri: this.state.cekOnUri }}
      style={{width:'100%',height:HEIGHT/7, resizeMode:'cover',borderTopLeftRadius:15,borderBottomLeftRadius:15}}
    />
  } else {
    return null
  }
}
renderCekArkaUri() {
  if (this.state.cekArkaUri) {
    return <Image
      source={{ uri: this.state.cekArkaUri }}
      style={{width:'100%',height:HEIGHT/7, resizeMode:'cover',borderTopLeftRadius:15,borderBottomLeftRadius:15}}
    />
  } else {
    return null
  }
}
renderCekFaturaUri() {
    if (this.state.cekFaturaUri) {
      return <Image
        source={{ uri: this.state.cekFaturaUri }}
        style={{width:'100%',height:HEIGHT/7, resizeMode:'cover',borderTopLeftRadius:15,borderBottomLeftRadius:15}}
      />
    } else {
      return null
    }
  }
 
async  uploadPhoto(){
  if (this.state.cekOnUri == '' || this.state.cekArkaUri == '') {
      Alert.alert(
        '',
        'Lütfen Çekinizin Tüm Görsellerini Yükleyiniz',
        [
          {
            text: 'Anladım'
          },
        ]
      )
  } else {
    if(this.state.cekFaturaUri  == ''){
      if(this.state.efatura == ''){
        Alert.alert(
          '',
          'Lütfen Faturanızı Yükleyiniz',
          [
            {
              text: 'Anladım'
            },
          ]
        )
      }else{
        
        try {
          const token = await AsyncStorage.getItem('@myStores:access_token');
        RNFetchBlob.fetch('POST', `https://pro.faktodeks.com//api/uploadAllResimler`, {
          'Content-Type' : 'multipart/form-data',
      }, [
          {
              name : 'cekOn',
              filename : 'cekOn.png',
              data: this.state.cekOnData
            },
            {
              name : 'cekArka',
              filename : 'cekArka.png',
              data: this.state.cekArkaData
            },
              {
                name : 'cekEFatura',
                data: this.state.efatura
              },
              {
                name : 'token',
                data: token
              },
              {
                name : 'anaKategoriId',
                data: String(this.state.anaKategoriId)
              },
              {
                name : 'altKategoriId',
                data: String(this.state.altKategoriId)
              },
              {
                name : 'anaKategoriText',
                data: this.state.anaKategoriText
              },
              {
                name : 'altKategoriText',
                data: this.state.altKategoriText
              },
                ]).then((response) => {
                  console.log(response);
                this.setState({loading:false, showOkey:1,cekid:response.cekid})
                let responseJson =  response.json();
                console.log("json3 :  " +responseJson.cekid)
                this.props.navigation.navigate('CekInfo',{
                  cekid:responseJson.cekid,
                  cekNo:this.state.cekNo,
                  bankaKodu:this.state.bankaKodu,
                  subeKodu:this.state.subeKodu,
                  hesapNo:this.state.hesapNo,
                  vgkn:this.state.vgkn,
                  bankName:this.state.bank_name,
                  anaKategoriText:this.state.anaKategoriText,
                  anaKategoriId:this.state.anaKategoriId,
                  altKategoriId:this.state.altKategoriId,
                  altKategoriText:this.state.altKategoriText
                })
                }).catch((err) => {
                  
                })
          } catch (error) {
              console.error(error);
          }
      }
    }else{
      this.setState({loading:true});
      try {
        const token = await AsyncStorage.getItem('@myStores:access_token');
       RNFetchBlob.fetch('POST', `https://pro.faktodeks.com//api/uploadAllResimler`, {
        'Content-Type' : 'multipart/form-data',
    }, [
         {
            name : 'cekOn',
            filename : 'cekOn.png',
            data: this.state.cekOnData
          },
          {
             name : 'cekArka',
             filename : 'cekArka.png',
             data: this.state.cekArkaData
           },
           {
              name : 'cekFatura',
              filename : 'cekFatura.png',
              data: this.state.cekFaturaData
            },
            {
               name : 'cekEFatura',
               data: this.state.efatura
             },
            {
              name : 'token',
              data: token
            },
            {
              name : 'anaKategoriId',
              data: String(this.state.anaKategoriId)
            },
            {
              name : 'altKategoriId',
              data: String(this.state.altKategoriId)
            },
            {
              name : 'anaKategoriText',
              data: this.state.anaKategoriText
            },
            {
              name : 'altKategoriText',
              data: this.state.altKategoriText
            },
            ]).then((response) => {
              console.log(response);
            this.setState({loading:false, showOkey:1,cekid:response.cekid})
            let responseJson =  response.json();
            console.log("json3 :  " +responseJson.cekid)
            this.props.navigation.navigate('CekInfo',{
              cekid:responseJson.cekid,
              cekNo:this.state.cekNo,
              bankaKodu:this.state.bankaKodu,
              subeKodu:this.state.subeKodu,
              hesapNo:this.state.hesapNo,
              vgkn:this.state.vgkn,
              bankName:this.state.bank_name,
              anaKategoriText:this.state.anaKategoriText,
              anaKategoriId:this.state.anaKategoriId,
              altKategoriId:this.state.altKategoriId,
              altKategoriText:this.state.altKategoriText
            })
            }).catch((err) => {
              
            })
        } catch (error) {
            console.error(error);
        }
    }
     


  }
}

  render() {
  
    const { params } = this.props.navigation.state;
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
         <Menu borderNo="a" yer="Talep Ekle" alt={params.altKategoriText} />
          <Content style={{backgroundColor:'#F5F5F5'}}>
        
            <View style={{width:WIDTH/1,paddingHorizontal:25,backgroundColor:'#F5F5F5'}}>
             
                <TouchableOpacity  style={styles.row} onPress={() => {this.setState({cekOnModal: true})}}>
                  <View style={{flex:4}}>
                    {this.state.cekOnUri != '' ?
                    this.renderCekOnUri():
                    <Text style={styles.text}>Çekinizin önyüzünün fotoğrafını ekle</Text>
                    }
                  </View>
                  <View style={this.state.cekOnUri != '' ? styles.sagAktif : styles.sag}>
                  {this.state.cekOnUri != '' ?
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
                <TouchableOpacity  style={styles.row} onPress={() => {this.setState({cekArkaModal: true})}}>
                  <View style={{flex:4}}>
                    {this.state.cekArkaUri != '' ?
                    this.renderCekArkaUri():
                    <Text style={styles.text}>Çekinizin arkayüzünün fotoğrafını ekle</Text>
                    }
                  </View>
                  <View style={this.state.cekArkaUri != '' ? styles.sagAktif : styles.sag}>
                  {this.state.cekArkaUri != '' ?
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
                <TouchableOpacity  style={styles.row} onPress={() => {this.setState({cekFaturaModal: true})}}>
                  <View style={{flex:4}}>
                  {this.state.cekFaturaUri != '' ?
                    this.renderCekFaturaUri():
                    <Text style={styles.text}>Çekinizin faturasının fotoğrafını ekle</Text>
                    }
                  </View>
                  <View style={this.state.cekFaturaUri != '' ? styles.sagAktif : styles.sag}>
                  {this.state.cekFaturaUri != '' ?
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
                      <Item  style={styles.item}>
                            <Input 
                               style={{color:'#042264'}}
                             value = {
                                this.state.efatura
                            }
                            onChangeText = {(value) => this.setState({efatura: value})}
                            placeholderTextColor='#042264'
                            placeholder='Çekinizin E-fatura Linki'
                            />
                        </Item>
            </View>
                <Row style={{ justifyContent:'center' ,marginTop:20, paddingHorizontal:20 }}>
                  <Button block transparent onPress={this.uploadPhoto.bind(this)} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                  <Text style={{color:'#011153'}}>DEVAM</Text>
                </Button>
              </Row>
  </Content>

  <Modal.BottomModal
          visible={this.state.cekOnModal}
          onTouchOutside={() => this.setState({ cekOnModal: false })}
          height={0.3}
          width={0.8}
          onSwipeOut={() => this.setState({ cekOnModal: false })}
        >
          <ModalContent
            style={{
              width:WIDTH/1,
              backgroundColor: 'white',
            }}
          >
            <List style={{flexDirection:'column',backgroundColor:'#fff',borderTopLeftRadius:45,borderTopRightRadius:45,}}>
                <ListItem  bordered onPress={() => {
                    this.setState({cekOnModal:false})
                    this.cekOnImageCamera()
                }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                <Text style={{textAlign:'center'}}>Fotoğraf Çek</Text>
                </ListItem>
                <ListItem bordered   onPress={() => {
                    this.setState({cekOnModal:false})
                    this.cekOnImageLibrary()
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>Galeriden Seç</Text>
                </ListItem>
                <ListItem  bordered  onPress={() => {
                    this.setState({cekOnModal:false})
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>İptal</Text>
                </ListItem>
            </List>
          </ModalContent>
        </Modal.BottomModal>
        

  <Modal.BottomModal
          visible={this.state.cekArkaModal}
          onTouchOutside={() => this.setState({ cekArkaModal: false })}
          height={0.3}
          width={0.8}
          onSwipeOut={() => this.setState({ cekArkaModal: false })}
        >
          <ModalContent
            style={{
              width:WIDTH/1,
              backgroundColor: 'white',
            }}
          >
            <List style={{flexDirection:'column',backgroundColor:'#fff',borderTopLeftRadius:45,borderTopRightRadius:45,}}>
            <ListItem  bordered  onPress={() => {
                    this.setState({cekArkaModal:false})
                    this.cekArkaImageCamera()
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>Fotoğraf Çek</Text>
                </ListItem>
                <ListItem  bordered  onPress={() => {
                    this.setState({cekArkaModal:false})
                    this.cekArkaImageLibrary()
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>Galeriden Seç</Text>
                </ListItem>
                <ListItem  bordered  onPress={() => {
                    this.setState({cekArkaModal:false})
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>İptal</Text>
                </ListItem>
            </List>
          </ModalContent>
        </Modal.BottomModal>
      
  <Modal.BottomModal
          visible={this.state.cekFaturaModal}
          onTouchOutside={() => this.setState({ cekFaturaModal: false })}
          height={0.3}
          width={0.8}
          onSwipeOut={() => this.setState({ cekFaturaModal: false })}
        >
          <ModalContent
            style={{
              width:WIDTH/1,
              backgroundColor: 'white',
            }}
          >
            <List style={{flexDirection:'column',backgroundColor:'#fff',borderTopLeftRadius:45,borderTopRightRadius:45,}}>
            <ListItem  bordered  onPress={() => {
                    this.setState({cekFaturaModal:false})
                    this.cekFaturaImageCamera()
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>Fotoğraf Çek</Text>
                </ListItem>
                <ListItem  bordered  onPress={() => {
                    this.setState({cekFaturaModal:false})
                    this.cekFaturaImageLibrary()
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>Galeriden Seç</Text>
                </ListItem>
                <ListItem  bordered  onPress={() => {
                    this.setState({cekFaturaModal:false})
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>İptal</Text>
                </ListItem>
            </List>
          </ModalContent>
        </Modal.BottomModal>
     
  <Modal.BottomModal
  visible={this.state.cekEFaturaModal}
  onTouchOutside={() => this.setState({ cekEFaturaModal: false })}
  height={0.3}
  width={0.8}
  onSwipeOut={() => this.setState({ cekEFaturaModal: false })}
>
  <ModalContent
    style={{
      width:WIDTH/1,
      backgroundColor: 'white',
    }}
  >
    <List style={{flexDirection:'column',backgroundColor:'#fff',borderTopLeftRadius:45,borderTopRightRadius:45,}}>
        <Button block bordered onPress={() => {
            this.setState({cekEFaturaModal:false})
            this.cekEFaturaImageCamera()
        }} style={{marginTop:10}}>
        <Text>Fotoğraf Çek</Text>
        </Button>
        <Button bordered block warning onPress={() => {
            this.setState({cekEFaturaModal:false})
            this.cekEFaturaImageLibrary()
        }} style={{marginTop:10}}>
          <Text>Galeriden Seç</Text>
        </Button>
        <Button block bordered danger onPress={() => {
            this.setState({cekEFaturaModal:false})
        }} style={{marginTop:10}}>
          <Text>İptal</Text>
        </Button>
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

                     <Altbar  disable="a"  checkInfo='a' yolla='CekInfo'/> 
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(resimler);
const styles = StyleSheet.create({
 row:{
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:'white',
   marginTop:15,
   borderRadius:15,
   flexDirection:'row',
   height:HEIGHT/7,
   width:WIDTH/1.1
 },
 sagAktif:{ 
   height:HEIGHT/7,
   flex:0.7,
   backgroundColor:'#FF8900',
   borderTopRightRadius:15,
   borderBottomRightRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
 sag:{ 
   height:HEIGHT/7,
   flex:0.7,
   backgroundColor:'#042264',
   borderTopRightRadius:15,
   borderBottomRightRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  item:{
    width:'100%', 
    backgroundColor:'#fff',borderRadius:10,
    borderColor:'#fff',
    borderWidth:1,
    marginTop:20
},
  text:{
    color:'#042264',
    fontSize:WIDTH/30,
    fontWeight:'bold',
    paddingLeft:10}
});