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
  import { Container,  Button, Header,Col,Row,Grid, Left, Body, Right,FooterTab,Footer, Content } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob'
import Altbar from '../inc/footer';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class karekod extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalVisible:true,
          modalLoading:false,
          modalSuccess:false,
          filepath: {
            data: '',
            uri: ''
          },
          fileData: '',
          fileUri: '',
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
        setModalSuccess(visible) {
            this.setState({modalSuccess: visible});
            }
        launchImageLibrary = () => {
          this.setState({ modalVisible: false })
          let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            quality: 0.2,
            allowsEditing: true
          };
          ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                filePath: response,
                fileData: response.data,
                fileUri: response.uri,
                imageSource:source
                ,modalSuccess:true
              });
              this.setModalSuccess(true);
            }
          });
      
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
         
         source={ require('../images/karekod.png')}
         
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
                                      source={require('../images/oklar.png')} 
                                    />
                                  </Row>
                                  <Row style={{justifyContent:'center',alignItems:'center',}}>
                                    <Col>
                                    <TouchableOpacity onPress={() => 
                                    {
                                      this.props.navigation.navigate("Barcode")
                                      this.setModalVisible(false)
                                    }
                                      } >
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
                      
        <Menu backtoTalepler="a" backNo = "a"/>
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
                <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',marginTop:30  }}>
                        <Subtitle style={{color:'white',fontSize:24}}>Çekinizin karekodunu taratın.</Subtitle>
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
        <Modal
                        animationType="slide"
                        transparent={true}
                      visible={this.state.modalSuccess}
                    onRequestClose={() => {
                      this.setModalSuccess(!this.state.modalSuccess);
                    }}>
                    <Grid style={styles.main}>
                     <View style={{width:WIDTH/1.3,height:HEIGHT/2}}>
                       <View style={{justifyContent:'center',alignItems:'center',}}>
                       <Image
                                style={{width:WIDTH/4,resizeMode:'contain',padding:20,top:30,zIndex:99999}}
                                source={require('../images/logo3.png')} 
                            />
                      </View>
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
                      {this.props.navigation.navigate('CekInfo')
                      this.setModalSuccess(false)}
                      } style={{marginTop:20,padding:10,width:'100%',backgroundColor:'#C63131',borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{textAlign:'center',color:'white'}}>Elle Gir</Text>
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
export default withNavigation(karekod);
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
images: {
  width: WIDTH/2,
  height: HEIGHT / 2,
  transform:[{ rotate: '90deg' }],
  resizeMode:'contain',
  marginHorizontal: 3
},
});