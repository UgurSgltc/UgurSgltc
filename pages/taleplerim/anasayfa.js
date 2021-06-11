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
  Left,
  Body,
  Right,
  ListItem,
  List,
  Content,
  Grid,
  Card,
} from 'native-base';
import {Image, Subtitle} from '@shoutem/ui';
import ImagePicker from 'react-native-image-crop-picker';
import Menu from '../inc/header';
import RNFetchBlob from 'rn-fetch-blob';
import Altbar from '../inc/footer';
import Modal, {ModalTitle, ModalContent} from 'react-native-modals';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
import {Avatar} from 'react-native-elements';

export default class anasayfa extends Component {
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
      modalLoading: true,
      refreshing: true,
      profilepic: null,
      profileModal: false,
      name: '',
      profilePath: '',
      profileData: '',
      profileUri: '',
    };
  }
  setModalLoading(visible) {
    this.setState({modalLoading: visible});
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
      this.checkToken();
    });
  }

  checkToken = async () => {
    const myToken = await AsyncStorage.getItem('@myStores:access_token');
    if (myToken) {
      try {
        let response = await fetch(
          `https://pro.faktodeks.com//api/getUser/${myToken}`,
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
          console.log('ham veri: ', responseJson);
          if (responseJson[0] != null) {
            this.setState({
              name: responseJson[0].name,
              profilepic: responseJson[0].profilepic,
            });
          } else {
            this.setState({name: ''});
          }
        } else {
          this.props.navigation.navigate('Register');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      this.props.navigation.navigate('Register');
    }
  };
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
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


// ***********************************





  profileImageLibrary = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 500,
      height: 500,
      cropperChooseText: 'Resmi Seç',
      cropperCancelText: 'İptal',
      compressImageQuality: 1,
      cropperToolbarTitle: 'Resmi Kırp',
      cropping: true,
    }).then((image) => {
      let source = {uri: image.path};
      console.log('datas : ' + JSON.stringify(image.data));
      console.log('source : ' + source.uri);
      this.setState({
        profilePath: image,
        profileData: image.data,
        profileUri: source.uri,
      });
      this.uploadPhoto();
    });
  };
  profileImageCamera = () => {
    ImagePicker.openCamera({
      includeBase64: true,
      width: 500,
      height: 500,
      cropperChooseText: 'Resmi Seç',
      cropperCancelText: 'İptal',
      cropperToolbarTitle: 'Resmi Kırp',
      cropping: true,
    }).then((image) => {
      let source = {uri: image.path};
      console.log('datas : ' + JSON.stringify(image.data));
      console.log('source : ' + source.uri);
      this.setState({
        profilePath: image,
        profileData: image.data,
        profileUri: source.uri,
      });
      this.uploadPhoto();
    });
  };

  async uploadPhoto() {
    this.setState({loading: true});

    try {
      const token = await AsyncStorage.getItem('@myStores:access_token');
      RNFetchBlob.fetch(
        'POST',
        'https://pro.faktodeks.com//api/uploadProfilePicture',
        {
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'profilepic',
            filename: 'profilepic.png',
            data: this.state.profileData,
          },
          {
            name: 'token',
            data: token,
          },
        ],
      )
        .then((response) => {
          console.log(response);
          let responseJson = response.json();

          this.setState({loading: false});
        })
        .catch((err) => {
          this.setState({loading: false});

          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  }
  renderProfileUri() {
    if (this.state.profileUri) {
      return (
        <Avatar
          size="xlarge"
          rounded
          onPress={() => this.setState({profileModal: true})}
          onAccessoryPress={() => this.setState({profileModal: true})}
          source={{uri: this.state.profileUri}}
          showAccessory
        />
      );
    } else {
      return null;
    }
  }



// ************************




  render() {
    return (
      <Container>
        <ImageBackground



          source={require('../images/Background.png')}
          style={{width: '100%', height: '100%'}}>


          <Menu backNo="a" yer="" profil="" bildirim="a" borderNo="a" />
          <Content style={{zIndex: 1}}>






            <Row
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                height: HEIGHT / 2.9,
              }}>

              {/* ************************************* */}
            {this.state.profileUri == '' ? (
                <Avatar
                 style={{height:100,width:90}}
                  size="medium"
                  rounded
                  onPress={() => this.setState({profileModal: true})}
                  onAccessoryPress={() => this.setState({profileModal: true})}


                  source={
                    this.state.profilepic != null
                      ? {
                          uri:
                            'https://pro.faktodeks.com//uploads/cekOn/' +
                            this.state.profilepic,
                        }
                      : require('../assets/modal-logo.png')
                  }


                  showAccessory
                />
              ) : (
                 this.renderProfileUri()
              )} 


              {/* ************************************* */}
              <Text
                style={{
                  marginTop: WIDTH / 25,
                  fontSize: WIDTH / 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {this.state.name.toUpperCase()}
              </Text>
            </Row>
            <Row
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F7F7F7',
                height: HEIGHT / 2,
                marginTop: 30,
              }}>
              <Row
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F7F7F7',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  zIndex: 99999,
                  bottom: HEIGHT / 14,
                  width: WIDTH / 1.1,
                }}>
                <Row style={{marginTop: 15, flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Talepler')}
                    style={{
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: WIDTH / 3,
                      height: HEIGHT / 6,
                      borderBottomWidth: 5,
                      borderBottomColor: '#FF8900',
                    }}>
                    <Image
                      style={{width: WIDTH / 4, resizeMode: 'contain'}}
                      source={require('../assets/taleplerim.png')}
                    />
                    <Text
                      style={{
                        textAlign: 'left',
                        color: '#042264',
                        position: 'absolute',
                        bottom: 5,
                        left: 5,
                        fontWeight: 'bold',
                      }}>
                      Taleplerim
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('IslemGecmis')
                    }
                    style={{
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: WIDTH / 3,
                      height: HEIGHT / 6,
                      borderBottomWidth: 5,
                      borderBottomColor: '#16AAE8',
                      marginLeft: 20,
                    }}>
                    <Image
                      style={{width: WIDTH / 4, resizeMode: 'contain'}}
                      source={require('../assets/islem_gecmisi.png')}
                    />
                    <Text
                      style={{
                        textAlign: 'left',
                        color: '#042264',
                        position: 'absolute',
                        bottom: 5,
                        left: 5,
                        fontWeight: 'bold',
                      }}>
                      İşlem Geçmişi
                    </Text>
                  </TouchableOpacity>
                </Row>
                <Row style={{height: HEIGHT / 3.5}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Input')}
                    style={{
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: WIDTH / 3,
                      height: HEIGHT / 6,
                      borderBottomWidth: 5,
                      borderBottomColor: '#00FFF5',
                    }}>
                    <Image
                      style={{width: WIDTH / 4, resizeMode: 'contain'}}
                      source={require('../assets/deks.png')}
                    />
                    <Text
                      style={{
                        textAlign: 'left',
                        color: '#042264',
                        position: 'absolute',
                        bottom: 5,
                        left: 5,
                        fontWeight: 'bold',
                      }}>
                      Deks
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FirmaDetay')}
                    style={{
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: WIDTH / 3,
                      height: HEIGHT / 6,
                      borderBottomWidth: 5,
                      borderBottomColor: '#011153',
                      marginLeft: 20,
                    }}>
                    <Image
                      style={{width: WIDTH / 4, resizeMode: 'contain'}}
                      source={require('../assets/isletme_ayar.png')}
                    />
                    <Text
                      style={{
                        textAlign: 'left',
                        color: '#042264',
                        position: 'absolute',
                        bottom: 5,
                        left: 5,
                        fontWeight: 'bold',
                      }}>
                      İşletme Ayarları
                    </Text>
                  </TouchableOpacity>
                </Row>
              </Row>
            </Row>
            <Modal visible={this.state.loading} height={0.1}>
              <ModalContent
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#042264" />
              </ModalContent>
            </Modal>
            <Modal.BottomModal
              visible={this.state.profileModal}
              onTouchOutside={() => this.setState({profileModal: false})}
              height={0.3}
              width={0.8}
              onSwipeOut={() => this.setState({profileModal: false})}>



              {/* ************************************* */}


 <ModalContent
                style={{
                  width: WIDTH / 1,
                  backgroundColor: 'white',
                }}>
                <List
                  style={{
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 45,
                    borderTopRightRadius: 45,
                  }}>
                  <Button
                    block
                    bordered
                    onPress={() => {
                      this.setState({profileModal: false});
                      this.profileImageCamera();
                    }}
                    style={{marginTop: 10}}>
                    <Text>Resmini Çek</Text>
                  </Button>
                  <Button
                    bordered
                    block
                    warning
                    onPress={() => {
                      this.setState({profileModal: false});
                      this.profileImageLibrary();
                    }}
                    style={{marginTop: 10}}>
                    <Text>Galeriden Seç</Text>
                  </Button>
                  <Button
                    block
                    bordered
                    danger
                    onPress={() => {
                      this.setState({profileModal: false});
                    }}
                    style={{marginTop: 10}}>
                    <Text>İptal</Text>
                  </Button>
                </List>
              </ModalContent> 





              {/* ************************************* */}


            </Modal.BottomModal>

            <Row style={{backgroundColor: '#F7F7F7'}} />
          </Content>
          <Altbar anasayfa="a" ileriQR="" />
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
  card: {
    width: WIDTH / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
  imageCard: {
    borderRadius: 20,

    resizeMode: 'contain',
  },

  modalViewLoading: {
    height: HEIGHT / 2,
    width: WIDTH / 1.5,
    justifyContent: 'space-around',
  },
  modalView: {
    flex: 1,
    width: WIDTH / 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    bottom: 0,
    borderColor: 'gray',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
    justifyContent: 'space-around',
  },
  hr: {
    borderTopWidth: 0.5,
    borderTopColor: '#e7e7e7',
    paddingTop: 10,
  },

  kategori: {
    flexDirection: 'column',
    height: HEIGHT / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
