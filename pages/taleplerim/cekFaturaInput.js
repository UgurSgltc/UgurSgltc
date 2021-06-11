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
  import { Container, Grid, Button,Form, Header,Col,Row, Left, Body,Icon,Textarea,Footer,FooterTab, Right, Content,Item,Input,Picker, Label,List,ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import {
  TextInputMask
} from 'react-native-masked-text';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';
import IconAnt from 'react-native-vector-icons/AntDesign';


const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class cekFaturaInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
         vkn:'',
         tutar:'',
         miktar:'',
         modalLoading:false,
         modalSuccess:false,
         modalFatura: false,
         desc:'',
         cekid:'',
         aktif:0,
         fatura_id:'',
         eksik:''
        }
         
      }
   
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.getFaturaId()
        });
  }
  async getFaturaId(){
    const { params } = this.props.navigation.state;
    this.setState({fatura_id : params.fatura_id,
      tutar:'',
    })
    if(params.fatura_id){
      this.setState({aktif : 1
      })
    }
  }
  setModalFatura(visible) {
    this.setState({ modalFatura: visible });
  }   
  
setModalLoading(visible) {
  this.setState({modalLoading: visible});
  }
  setModalSuccess(visible) {
   this.setState({modalSuccess: visible});
  }
async insertCek(){
  if(this.state.vkn == ''||  this.state.tutar == ''   ){
      Alert.alert(
          '',
           'Tüm Alanları Eksiksiz Doldurunuz.',
          [
              { text: 'Anladım' },
          ],
          { cancelable: false },
      );
    }
    else if(this.state.vkn.length < 10 ){
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
          let str =this.state.tutar;
          var lastTree = str.substr(str.length - 3); 
          if(lastTree == ',00'){
            str = str.substring(0, str.length - 3);
            str = str.replace(".", "");
          }else{
            str = str.replace(",", ".");
          }
       console.log(str)
          const { params } = this.props.navigation.state;
          let response = await fetch(`https://pro.faktodeks.com//api/updateFaturaInput`, {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  fatura_borclusu_vkn: this.state.vkn,
                  fatura_tutari:str,
                  fatura_desc:this.state.desc,
                  cek_id: params.cekid,
                  fatura_id: this.state.fatura_id,
              }),
          });
          console.log(response);
          if (response.status == '200' || response.status == '201') {
            this.setModalLoading(false);
              let responseJson = await response.json();
              this.setState({
                vkn:'',
                tutar:'',
                miktar:'',
                desc:''
              })
              this.setModalSuccess(true)
          } else if(response.status == '404'){
            this.setModalLoading(false);
            let responseJson = await response.json();
            this.setModalFatura(true);
            this.setState({cekid:params.cekid,eksik:responseJson.eksik})
          }else{
            alert("olmadı")
          }
        }
        catch(error){
        }
    }
} 

async teklifKapat(){
  const { params } = this.props.navigation.state;
  const cekid = params.cekid;
  this.setModalLoading(true);
  try{
     const token = await AsyncStorage.getItem('@myStores:access_token');
    let response = await fetch(`https://pro.faktodeks.com//api/teklifKapat`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cek_id : cekid
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
        this.setModalLoading(false);
        let responseJson = await response.json();
        this.setModalSuccess(false);
        this.props.navigation.navigate('Taleplerim2')

    } else {
        this.setModalLoading(false);
      this.setState({ hata: '1'})
    }

  }
  catch(error){

  }
}
async teklifAc(){
  const { params } = this.props.navigation.state;
  const cekid = params.cekid;
  this.setModalLoading(true);
  try{
     const token = await AsyncStorage.getItem('@myStores:access_token');
    let response = await fetch(`https://pro.faktodeks.com//api/teklifAc`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cek_id : cekid
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
        this.setModalLoading(false);
        let responseJson = await response.json();
        this.setModalSuccess(false);
        this.props.navigation.navigate('Taleplerim2')

    } else {
        this.setModalLoading(false);
      this.setState({ hata: '1'})
    }

  }
  catch(error){

  }
}
  render() {
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
          <Menu />
          <Content >
                <View style={{flexDirection:'row',top:0,marginTop:2}}>
                          <View onPress={()=>  {
                              this.setState({giris:1,register:0 })
                            }
                            }>
                          <Image
                                     style={{width:WIDTH/2,height:HEIGHT/12, resizeMode:'contain' }}
                                     source={require('../images/taleplerim-aktif.png')} 
                                 />
                          </View>
                          <View onPress={()=>  {
                              this.setState({giris:0,register:1 })
                            }
                            }>
                          <Image
                                     style={{width:WIDTH/2,height:HEIGHT/12,resizeMode:'contain'   }}
                                     source={require('../images/islem-gecmisi.png')} 
                                 />
                          </View>
                    </View>
                  <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,height:70}}>
                  <Image
                      style={{width:WIDTH/1.5,height:50,resizeMode:'contain'   }}
                      source={require('../images/4adim.png')} 
                  />
                  </Row>
                  <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,height:70,flexDirection:'column'}}>
                            <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>Fatura bilgilerinizi girin!</Text>
                  </Row>
                  
                    <View  style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30}}>
                      <Item floatingLabel style={{marginTop:15}}>
                            <Label style={{color:'white'}}>FATURA BORÇLUSU VKN</Label>
                            <Input 
                               style={{color:'white'}}
                               keyboardType='numeric'
                               maxLength={11}
                             value = {
                                this.state.vkn
                            }
                            onChangeText = {(value) => this.setState({vkn: value})}
                            />
                          </Item>
                        <Item  style={{marginTop:15,width:'100%'}}>

                      
                        {this.state.aktif == 1 ?
                   <Item floatingLabel style={{marginTop:15}}>
                   <Label  style={{color:'white'}}>FATURA TUTARI</Label>
                          <Input 
                             style={{color:'white'}}
                             keyboardType='numeric'
                             maxLength={20}
                           value = {
                              this.state.tutar
                          }
                          onChangeText = {(value) => this.setState({tutar: value})}
                          placeholderTextColor='white'
                          />
                      </Item>
                              :
                              
                              <Item floatingLabel style={{marginTop:15}}>
                              <Label  style={{color:'white'}}>FATURA TUTARI</Label>
                                     <Input 
                                        style={{color:'white'}}
                                        keyboardType='numeric'
                                        maxLength={20}
                                      value = {
                                         this.state.tutar
                                     }
                                     onChangeText = {(value) => this.setState({tutar: value})}
                                     placeholderTextColor='white'
                                     />
                                 </Item>}
                        </Item>
                        <Form style={{width:'100%',marginTop:15}}>
                        <Label style={{color:'white'}}>FATURA AÇIKLAMA NOTU</Label>
                          <Textarea 
                                placeholderTextColor='white'
                                style={{color:'white'}}
                                maxLength={140}
                           value = {
                            this.state.desc
                        }
                        onChangeText = {(value) => this.setState({desc: value})}
                          rowSpan={5} bordered />
                        </Form>
                        </View>
                </Content>
                <Footer style={{backgroundColor: 'transparent'}}>
          <FooterTab style={{borderTopLeftRadius:50,borderTopRightRadius:50,backgroundColor:'white'}}>
            <Button transparent onPress={() => this.props.navigation.navigate('Taleplerim') }>
                <Image
                  style={{width:50,height:50,resizeMode:'contain'}}
                  source={require('../images/taleplerim.png')}
                  />
            </Button>
              <Button transparent
                    onPress={this.insertCek.bind(this)}>
                 <Image
                   style={{width:60,height:60,zIndex:999,bottom:10, resizeMode:'contain'}}
                   source={require('../images/ileri.png')}
                   />
                  
             </Button>
            <Button transparent>
            <Image
                  style={{width:50,height:30,resizeMode:'contain'}}
                  source={require('../images/yardim.png')}
                  />
            </Button>
            
          </FooterTab>
          
        </Footer>    
        
        <Modal
                        animationType="slide"
                        transparent={true}
                      visible={this.state.modalSuccess}
                    onRequestClose={() => {
                      this.setModalSuccess(!this.state.modalSuccess);
                    }}>
                    <Grid  style={styles.main}>
                     <View style={{width:WIDTH/1.3,height:HEIGHT/1.5,borderRadius:20}}>
                       <View style={{justifyContent:'center',alignItems:'center',}}>
                          <Image
                                style={{width:WIDTH/4,resizeMode:'contain',padding:20,top:30,zIndex:99999}}
                                source={require('../images/logo3.png')} 
                            />
                      </View>
                     <Row style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',flexDirection:'column',borderTopLeftRadius:20,borderTopRightRadius:20,marginTop:10}}>
                       <Text style={{textAlign:'center',color:'#042264', fontWeight:'bold',fontSize:WIDTH/25}}>Talebiniz başarıyla oluşturuldu.</Text>
                       <Text style={{textAlign:'center',color:'#042264'}}>24 saat boyunca talebiniz teklife açık olacaktır.</Text>
                      <Text  style={{textAlign:'center',color:'#042264', fontWeight:'bold',fontSize:18}}>Tekliflere açmaya hazır mısınız?</Text>
                     </Row>
                     <Row style={{backgroundColor:'#ff8d00ff',flexDirection:'column',paddingHorizontal:20,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                     <Button  bordered light style={{marginTop:20,padding:10,width:'100%', borderRadius:25,justifyContent:'center',alignItems:'center'}}
                    onPress={this.teklifKapat.bind(this)}
                     >
                      <Text style={{textAlign:'center',color:'white'}}>DAHA SONRA</Text>
                    </Button>
                    <TouchableOpacity   onPress={this.teklifAc.bind(this)} style={{marginTop:20,padding:10,width:'100%',backgroundColor:'#ff7a00ff',borderColor:'#fff',borderWidth:2, borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{textAlign:'center',color:'white'}}>TEKLİFLERE AÇ</Text>
                    </TouchableOpacity>
                     </Row>
                     </View>
                    </Grid>

                  </Modal>
         
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
                        transparent={true}
                      visible={this.state.modalFatura}
                    onRequestClose={() => {
                      this.setModalFatura(!this.state.modalFatura);
                    }}>
                    <Grid style={styles.main}>
                     <View style={{width:WIDTH/1.3,height:HEIGHT/2.3,borderBottomLeftRadius:20,borderBottomRightRadius:20,}}>
                     <View style={{justifyContent:'center',alignItems:'center',}}>
                          <Image
                                style={{width:WIDTH/4,resizeMode:'contain',padding:20,top:30,zIndex:99999}}
                                source={require('../images/logo3.png')} 
                            />
                      </View>
                     <Row style={{backgroundColor:'#C63131',justifyContent:'center',alignItems:'center',flexDirection:'column',padding:10,marginTop:20, borderTopLeftRadius:20,borderTopRightRadius:20}}>
                       <Text style={{textAlign:'center',color:'white', fontWeight:'bold',fontSize:WIDTH/25}}>Fatura, çek tutarından düşük!</Text>
                       <Text style={{textAlign:'center',color:'white', fontWeight:'bold',fontSize:WIDTH/35}}>
                       Toplam fatura tutarınız, çek tutarına
                        eşit ya da fazla olmalıdır.
                       </Text>
                       <Text style={{textAlign:'center',color:'white', fontWeight:'bold',fontSize:WIDTH/35}}>
                      Eksik Tutar : {this.state.eksik} TL
                       </Text>
                     </Row>
                     <Row style={{backgroundColor:'#fff',flexDirection:'column',paddingHorizontal:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,}}>
                   
                    <TouchableOpacity  
                   onPress={() => 
                    {
                      this.setModalFatura(false)
                      this.props.navigation.navigate('CekFaturaYeni',{cekid:this.state.cekid})
                    
                    }}  style={{marginTop:20,padding:10,width:'100%',backgroundColor:'#C63131',borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{textAlign:'center',color:'white'}}>Yeni Fatura Ekle</Text>
                    </TouchableOpacity>
                     </Row>
                     </View>
                    </Grid>

                  </Modal>
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(cekFaturaInput);
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
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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