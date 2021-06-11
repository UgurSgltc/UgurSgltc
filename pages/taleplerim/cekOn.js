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
    Animated,
    Text,
    ActivityIndicator,
    Alert,
    StatusBar,
    ImageBackground,
    Modal,
    SafeAreaView,
  } from 'react-native';
  import { Container,  Button, Header,Col,Row, Left, Body, Right,FooterTab,Footer, Content } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Altbar from '../inc/footer';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class cekOn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalVisible:false,
          modalLoading:false,
          filepath: {
            data: '',
            uri: ''
          },
          fileData: '',
          fileUri: '',
          cevir:null,
          showOkey:0,
          imageSource:'',
          cek_id:'',
          cek_token:''
        }
         
      }
      setModalLoading(visible) {
        this.setState({modalLoading: visible});
        }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
        }
        launchCamera = () => {
          this.setState({ modalVisible: false })
          ImagePicker.openCamera({
            includeBase64: true,
            compressImageQuality:0.5,
            cropping:true
          }).then(image => {
            let source = {uri: image.path};
                console.log("datas : "  + JSON.stringify(image.data))
                console.log("source : "  + source.uri)
                this.setState({
                  filePath: image,
                  fileData: image.data,
                  fileUri: source.uri,
                });
                this.uploadPhoto();
          });
        }
        launchImageLibrary = () => {
          this.setState({ modalVisible: false })
          ImagePicker.openPicker({
            includeBase64: true,
            compressImageQuality:0.5,
            cropping:true
          }).then(image => {
            let source = {uri: image.path};
            
                console.log("datas : "  + JSON.stringify(image.data))
                console.log("source : "  + source.uri)
               
                this.setState({
                  filePath: image,
                  fileData: image.data,
                  fileUri: source.uri,
                });
                this.uploadPhoto();
          });
         
        }
        async  uploadPhoto(){
          this.setModalLoading(true);
          if (this.state.fileUri == '') {
              alert('Tüm Alanları Eksiksiz Doldurun!');
          } else {
            try {
              const { params } = this.props.navigation.state;
              const token = await AsyncStorage.getItem('@myStores:access_token');
             RNFetchBlob.fetch('POST', `https://pro.faktodeks.com//api/cekOn/uploadImage`, {
              'Content-Type' : 'multipart/form-data',
          }, [
              {
                  name : 'avatars',
                  filename : 'avatar.png',
                  data: this.state.fileData
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
            this.setModalLoading(false);
            console.log(response);
           this.setState({showOkey:1,cekid:params.cekid})
          }).catch((err) => {
             
          })
          } catch (error) {
              console.error(error);
          }

          }
        }
        renderFileData() {
          if (this.state.fileData) {
            return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
              style={this.state.cevir == 1 ?styles.cevir : styles.cevirme}
            />
          } else {
            return null
          }
        }
      
        renderFileUri() {
          if (this.state.fileUri) {
            return <Image
              source={{ uri: this.state.fileUri }}
              style={this.state.cevir == 1 ?styles.cevir : styles.cevirme}
            />
          } else {
            return null
          }
        }
  render() {
    return (

        
        <Container >
       
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
                                <Text style={{fontSize:20,color:'white',textAlign:'center'}}>
                              Çekinizin önyüzü yükleniyor lütfen bekleyiniz
                                </Text>

                               <ActivityIndicator size="large" color="#FFBA00"/>
                                </View>

                            </View>
                        </View>
                    </Modal>
        <ImageBackground
         
         source={
          this.state.fileUri == '' ?   require('../images/cekOn.png') : require('../images/Background.png')
          }
         
         style={{width: '100%', height: '100%'}}>
        <Modal
                              animationType="fade"
                              transparent={true}
                              visible={this.state.modalVisible}
                              onRequestClose={() => {
                                  this.setState({ modalVisible: false })
                              }}>
                              <View style={{ flex: 1,backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' }} >
                                
                                  <View style={styles.modalView} >
                                  <TouchableOpacity onPress={() => this.setModalVisible(false)} style={styles.exit} >
                                          <Image source={require('../images/iptal.png')} style={{ width: '100%', height: '100%' }} />
                                  </TouchableOpacity>
                                  <Row></Row>
                                  <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30}}>
                                <Image
                                      style={{width:WIDTH/1.5,resizeMode:'contain'   }}
                                      source={require('../images/kameraOn.png')} 
                                    />
                                  </Row>
                                  <Row style={{justifyContent:'center',alignItems:'center',}}>
                                    <Col>
                                    <TouchableOpacity onPress={this.launchCamera} >
                                          <Image
                                            style={{width:WIDTH/3,resizeMode:'contain',marginLeft:WIDTH/10   }}
                                            source={require('../images/kamera.png')} 
                                        />
                                    </TouchableOpacity>
                                    </Col>
                                    <Col>
                                    <TouchableOpacity onPress={this.launchImageLibrary} >
                                          <Image
                                            style={{width:WIDTH/3,resizeMode:'contain'   }}
                                            source={require('../images/galeri.png')} 
                                        />
                                  </TouchableOpacity>
                                    </Col>
                                
                                  </Row>
                                  <Row></Row>
                                  </View>
                              </View>
                          </Modal>
                      
        <Menu />
          <Content>

          {this.state.giris == 1 ? 
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
       :
       
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
        </View> }
        <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,height:70}}>
                  <Image
                      style={{width:WIDTH/1.5,height:50,resizeMode:'contain'   }}
                      source={require('../images/2adim.png')} 
                  />
                  </Row>
                 {this.state.fileUri == '' ? 
                <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',marginTop:30  }}>
                        <Subtitle style={{color:'white',fontSize:24,fontWeight:'bold'}}>Çekinizin önyüzünü çekin</Subtitle>
                        <Subtitle style={{color:'white',fontSize:24,fontWeight:'bold'}}>ya da yükleyin.</Subtitle>
                    </Row>
                    :null}
                    {this.state.showOkey == 1 ?  
              <Row style={{justifyContent:'center',alignItems:'center',flexDirection:'column',paddingHorizontal:30,height:70,marginTop:30}}>
                  <Subtitle style={{color:'white',fontSize:24}}>Çekinizin önyüzü yüklendi!</Subtitle>
                  <Image
                      style={{width:50,height:50,resizeMode:'contain',marginTop:30  }}
                      source={require('../images/okey.png')} 
                  />
                  </Row>
                  :null}
                    <Row style={{ justifyContent:'center',alignItems:'center' }}>
                       {this.renderFileUri()}
                    </Row>
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
            onPress={()=> { this.state.showOkey == 1 ? this.props.navigation.navigate('CekArka',{cekid:this.state.cekid}) : this.setModalVisible(true) }}
             > 
                 <Image
                   style={{width:60,height:60,zIndex:999,bottom:10, resizeMode:'contain'}}
                   source={require('../images/ileri.png')}
                   />
                  
             </Button>
             <Button transparent onPress={() => this.props.navigation.navigate('BizeYazin')}>
            <Image
                  style={{width:50,height:30,resizeMode:'contain'}}
                  source={require('../images/yardim.png')}
                  />
            </Button>
            
          </FooterTab>
          
        </Footer>
      </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(cekOn);
const styles = StyleSheet.create({
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
    },
    
   modalView: {
    height: HEIGHT / 1,
    justifyContent: 'center',
    flexDirection:'column',
    alignItems: 'center',
    width: WIDTH / 1,
    borderRadius: 10,

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
      modalViewLoading: {
        height: HEIGHT / 2,
        width: WIDTH / 1.5,
        justifyContent: 'space-around',
    },
cevir: {
  width: WIDTH/2,
  height: HEIGHT / 2,
  transform:[{ rotate: '90deg' }],
  resizeMode:'contain',
  marginHorizontal: 3
},
cevirme: {
  width: WIDTH/2,
  height: HEIGHT / 2,
  resizeMode:'contain',
  marginHorizontal: 3
},
});