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
  import { Container,  Button, Header,Col,Row,Item,Input, Left,Grid,List, Body, Right, Content, ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import { withNavigation } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import Menu from '../inc/header';
import RNFetchBlob from 'rn-fetch-blob';
import Altbar from '../inc/footer';
import Modal, {
  ModalTitle,
  ModalContent,
 
} from 'react-native-modals';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

class faturalar extends Component {
    constructor(props) {
    
        super(props);
        this.state = {
        modalVisible:false,
        modalSuccess:false,
        cekFaturaModal:false,
        cekEFaturaModal:false,
        modalLoading:false,
        loading:false,
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
cekFaturaImageLibrary = () =>{
  ImagePicker.openPicker({
    includeBase64: true,
    cropperChooseText:'Resmi Seç',
    cropperCancelText:'İptal',
    width: 1000,
    height: 800,
    compressImageQuality:0.6,
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
  compressImageQuality:0.6,
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
  const { params } = this.props.navigation.state;
 
  if (this.state.cekFaturaUri == '' ) {
    if(this.state.efatura != ''){
      this.setState({loading:true});
      try {
        const token = await AsyncStorage.getItem('@myStores:access_token');
       RNFetchBlob.fetch('POST', `https://pro.faktodeks.com//api/faturaResimUpload`, {
        'Content-Type' : 'multipart/form-data',
    }, [
          
            {
               name : 'cekEFatura',
               data: this.state.efatura
             },
            {
              name : 'token',
              data: token
            },
            {
              name : 'cek_id',
              data: String(params.cekid)
            },
    ]).then((response) => {
      console.log(response);
     this.setState({loading:false, showOkey:1,cekid:response.cekid,cekFaturaUri:'',efatura:''})
     let responseJson =  response.json();
     console.log("faturalar " +responseJson)
     this.props.navigation.navigate('CekInfoDetay',{cekid:params.cekid,fatura_id:responseJson.fatura_id})
    }).catch((err) => {
       
    })
    } catch (error) {
        console.error(error);
    }
    }else{

      Alert.alert(
        '',
        'Lütfen Çekinizin Fatura Görselini veya Linkini Yükleyiniz',
        [
          {
            text: 'Anladım'
          },
        ]
      )
  }

  } else {
  this.setState({loading:true});
    try {
      const token = await AsyncStorage.getItem('@myStores:access_token');
     RNFetchBlob.fetch('POST', `https://pro.faktodeks.com//api/faturaResimUpload`, {
      'Content-Type' : 'multipart/form-data',
  }, [
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
            name : 'cek_id',
            data: String(params.cekid)
          },
  ]).then((response) => {
    console.log(response);
   this.setState({loading:false, showOkey:1,cekid:response.cekid,cekFaturaUri:'',efatura:''})
   let responseJson =  response.json();
   console.log("faturalar " +responseJson)
   this.props.navigation.navigate('CekInfoDetay',{cekid:params.cekid,fatura_id:responseJson.fatura_id})
  }).catch((err) => {
     
  })
  } catch (error) {
      console.error(error);
  }

  }
 
}

  render() {
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
         <Menu borderNo="a"  alt="Yurtiçi Faktoring" yer="Talep Ekle"/>
          <Content style={{backgroundColor:'#F5F5F5'}}>
            <View style={{width:WIDTH/1,paddingHorizontal:25,backgroundColor:'#F5F5F5'}}>
                <TouchableOpacity style={styles.row} onPress={() => {this.setState({cekFaturaModal: true})}}>
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
             <ListItem  bordered onPress={() => {
                    this.setState({cekFaturaModal:false})
                    this.cekFaturaImageCamera()
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>Fotoğraf Çek</Text>
                </ListItem>
                <ListItem bordered block warning onPress={() => {
                    this.setState({cekFaturaModal:false})
                    this.cekFaturaImageLibrary()
                  }} style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  <Text>Galeriden Seç</Text>
                </ListItem>
                <ListItem block bordered danger onPress={() => {
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
        <Text>Resmini Çek</Text>
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
export default withNavigation(faturalar);
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
 item:{
  width:'100%', 
  backgroundColor:'#fff',borderRadius:10,
  borderColor:'#fff',
  borderWidth:1,
  marginTop:20
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
  text:{
    color:'#042264',
    fontSize:WIDTH/30,
    fontWeight:'bold',
    paddingLeft:10}
});