import React, { Component } from 'react';
import {
    Platform,
  
    Stack,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Modal,
    Text,
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import { Container,  Button, Header,Col,Row, Left,Grid, Body, Right, Content } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import QRCodeScanner from 'react-native-qrcode-scanner';
import { withNavigation } from 'react-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Menu from '../inc/header';
import Altbar from '../inc/footer';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class barcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
        modalVisible:false,
        modalSuccess:false,
        bankName:'',
        cekNo:'',bankaKodu:'',subeKodu:'',hesapNo:'',vgkn:'',
        altKategoriText:'',
        altKategoriId:'',
        anaKategoriId:'',
        anaKategoriText:'',
        qr:0
    }
     
  }
  
  setModalSuccess(visible) {
    this.setState({modalSuccess: visible});
    }
setModalVisible(visible) {
  this.setState({modalVisible: visible});
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.checkWhich()
      //setTimeout(this.alert, 10000);

        });
  } 
  async checkWhich(){
    const { params } = this.props.navigation.state;
    if(params){
        this.setState({anaKategoriText:params.anaKategoriText,anaKategoriId:params.anaKategoriId,altKategoriId:params.altKategoriId,altKategoriText:params.altKategoriText})
    }
  }
  onSuccess(e) {
      console.log(e.data)
     var data = e.data;
     var cekNo = data.substring(7, 17);
     var bankaKodu = data.substring(20, 22);
     var subeKodu = data.substring(25, 28);
     var hesapNo = data.substring(37, 45);
     var vgkn = data.substring(47, 57);
     this.setState(
       {
        cekNo:cekNo,bankaKodu:bankaKodu,subeKodu:subeKodu,hesapNo:hesapNo,vgkn:vgkn
        }
       );
   this.getBankName(bankaKodu)
   }
   alert = async () =>{
    const { params } = this.props.navigation.state;
    this.state.qr == 0 ?
      Alert.alert(
        '',
        'Karekodunuz okunamadı. Elle Doldurmak İster misiniz?',
        [
          {
            text: 'Yeniden Dene'
          },
            {
                text: 'Evet',onPress: async () => {
                  {
                    this.props.navigation.navigate('Resimler',
                    { anaKategoriText:params.anaKategoriText,
                      anaKategoriId:params.anaKategoriId,
                      altKategoriId:params.altKategoriId,
                      altKategoriText:params.altKategoriText})
                      this.setState({qr:1})
                    }  },
            },

        ],
        { cancelable: false },
    ):null
   }
async getBankName(bankaKodu){
  try {
    const { params } = this.props.navigation.state;

    let response = await fetch(`https://pro.faktodeks.com//api/bankalar/${bankaKodu}`, {
        method: 'get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (response.status == '200' || response.status == '201') {
        let responseJson = await response.json();
        this.props.navigation.navigate('Resimler',{
          cekNo:this.state.cekNo,
          bankaKodu:this.state.bankaKodu,
          subeKodu:this.state.subeKodu,
          hesapNo:this.state.hesapNo,
          vgkn:this.state.vgkn,
          bankName:responseJson.bank_name,
          anaKategoriText:params.anaKategoriText,
          anaKategoriId:params.anaKategoriId,
          altKategoriId:params.altKategoriId,
          altKategoriText:params.altKategoriText
        })
    } else {
        Alert.alert(
            '',
            'Karekodunuz okunamadı. Elle Doldurmak İster misiniz?',
            [
              {
                text: 'Yeniden Dene'
              },
                {
                    text: 'Evet',onPress: async () => {
                        this.props.navigation.navigate('Resimler',
                        { anaKategoriText:params.anaKategoriText,
                          anaKategoriId:params.anaKategoriId,
                          altKategoriId:params.altKategoriId,
                          altKategoriText:params.altKategoriText})
                    },
                },

            ],
            { cancelable: false },
        );
    }
} catch (error) {
    console.error(error);
}
}

launchImageLibrary = () => {
  ImagePicker.openPicker({
    includeBase64: true,
    compressImageQuality:0.5,
    cropperToolbarTitle:'Resmi Kırp',
    cropperChooseText:'Resmi Seç',
    cropperCancelText:'İptal',
    cropping:true
  }).then(image => {
    let source = {uri: image.path};
        console.log("datas : "  + JSON.stringify(image.data))
        console.log("source : "  + source.uri)
       
        this.setState({
          filePath: image,
          fileData: image.data,
          fileUri: source.uri,
          qr:1
        });
        this.setModalSuccess(true);
  });
 
}
  render() {
    const { params } = this.props.navigation.state;
    return (

        
        <Container >
           
        <Modal
                        animationType="slide"
                        transparent={true}
                      visible={this.state.modalSuccess}
                    onRequestClose={() => {
                      this.setModalSuccess(!this.state.modalSuccess);
                    }}>
                    <Grid style={styles.main}>
                     <View style={{width:WIDTH/1.3,height:HEIGHT/2.5}}>
                      
                     <Row style={{backgroundColor:'#C63131',justifyContent:'center',alignItems:'center',flexDirection:'column',borderTopLeftRadius:25,borderTopRightRadius:25}}>
                       <Text style={{textAlign:'center',color:'white', fontWeight:'bold',fontSize:WIDTH/25}}>Karekod bilgileri okunmadı</Text>
                     </Row>
                     <Row style={{backgroundColor:'#fff',flexDirection:'column',paddingHorizontal:20,borderBottomLeftRadius:25,borderBottomRightRadius:25}}>
                     <Button  bordered light style={{marginTop:20,padding:10,width:'100%',borderColor:'black', borderRadius:25,justifyContent:'center',alignItems:'center'}}
                    onPress={this.launchImageLibrary}
                     >
                      <Text style={{textAlign:'center',color:'black'}}>Yeniden Dene</Text>
                    </Button>
                    <TouchableOpacity   onPress={() => 
                      {this.props.navigation.navigate('Resimler',{anaKategoriText:params.anaKategoriText,anaKategoriId:params.anaKategoriId,altKategoriId:params.altKategoriId,altKategoriText:params.altKategoriText})
                      this.setModalSuccess(false)}
                      } style={{marginTop:20,padding:10,width:'100%',backgroundColor:'#C63131',borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{textAlign:'center',color:'white'}}>Elle Gir</Text>
                    </TouchableOpacity>
                     </Row>
                     </View>
                    </Grid>

                  </Modal>
      
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
     <Menu borderNo="a" yer="Talep Ekle" ana={params.anaKategoriText} alt={params.altKategoriText}/>
          <Content style={{backgroundColor:'#F5F5F5'}}>
                 
                  <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',marginTop:30  }}>
                        <Subtitle style={{color:'#042264',fontSize:WIDTH/20,fontWeight:'bold'}}>Çekinizin karekodunu taratın.</Subtitle>
                    </Row>
                <Row style={{flexDirection:'row', backgroundColor:'#F5F5F5',height:HEIGHT/3,marginTop:WIDTH/6}}>
                 <View style={{flex:1,backgroundColor:'#F5F5F5',}}>

                 </View>
                 <View style={{flex:2,backgroundColor:'#F5F5F5',}}>
                 <QRCodeScanner
                        onRead={this.onSuccess.bind(this)}
                       
                        cameraStyle={{width:WIDTH/2,backgroundColor:'#F5F5F5',height:HEIGHT/3 }}
                    />
                </View>
                <View style={{flex:1,backgroundColor:'#F5F5F5',}}>

                </View>
               
                 
                </Row>
                <Row style={{justifyContent:'center',alignItems:'center', marginTop:30,flexDirection:'column'}}>
                  <Text style={{color:'#042264',textAlign:'center'}}>Çekin karekodu yoksa ya da </Text>
                  <Text style={{color:'#042264',textAlign:'center'}}> çek fotoğraflarınız galerinizdeyse</Text>
                  <Text style={{color:'#042264',textAlign:'center'}}> bir sonraki adıma geçebilirsiniz. </Text>
                     




                  <TouchableOpacity   onPress={() => 
                      {this.props.navigation.navigate('Resimler',{anaKategoriText:params.anaKategoriText,anaKategoriId:params.anaKategoriId,altKategoriId:params.altKategoriId,altKategoriText:params.altKategoriText})
                      this.setModalSuccess(false)}
                      } style={{marginTop:20,padding:10,width:'90%',backgroundColor:'#00FFF5',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{textAlign:'center',color:'#042264'}}>Karekod Bilgilerini Elle Gir</Text>
                    </TouchableOpacity>
                     





                </Row>
              {/* <Row style={{ justifyContent:'center' ,marginTop:20, paddingHorizontal:20 }}>
                  <Button block transparent onPress={this.launchImageLibrary}
                   style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                  <Text style={{color:'#042264'}}>GALERİDEN FOTOĞRAF SEÇ</Text>
                </Button>
              </Row> */}
  </Content>
                     <Altbar disable="a"  checkInfo='a' yolla='Resimler'/> 
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(barcode);
const styles = StyleSheet.create({
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
    backgroundColor: '#FFFFFF',
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