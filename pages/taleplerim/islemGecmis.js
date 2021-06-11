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
import Pusher from 'pusher-js/react-native';
import OneSignal from 'react-native-onesignal';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
Pusher.logToConsole = true;

export default class islemGecmis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sonuclananlar: [],
      toplam: '',
      jsonDebugText: '',
      guncellenme: '',
      switchOnOkey: true,
      switchOnFalse: false,
      modalLoading: true,
      refreshing: true,
    };

    this.pusher = new Pusher('f133b70effe845679984', {
      cluster: 'eu',
      forceTLS: true,
    });
    this.chatChannel = this.pusher.subscribe('my-channel');
    this.chatChannel.bind('my-event', (data) => {
      this.sonuclananlar();
    });
  }
  setModalLoading(visible) {
    this.setState({modalLoading: visible});
  }
  _onRefresh() {
    this.sonuclananlar();
  }
  componentDidMount() {
    OneSignal.setNotificationOpenedHandler(this.onOpened);
    const {navigation} = this.props;
    this.sonuclananlar();
    navigation.addListener('willFocus', () => {
      this.sonuclananlar();
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

  async sonuclananlar() {
    try {
      const myToken = await AsyncStorage.getItem('@myStores:access_token');
      let response = await fetch(
        `https://pro.faktodeks.com//api/getTaleplerSonuclandi/${myToken}`,
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
        this.setState({
          sonuclananlar: responseJson.talepler,
          refreshing: false,
        });
        console.log(responseJson.talepler);
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
      <Container>
        <ImageBackground
          source={
            this.state.talepler == ''
              ? require('../images/bs3.png')
              : require('../images/Background.png')
          }
          style={{width: '100%', height: '100%'}}>
          <Menu back yer="İşlem Geçmişi" />
          <Content style={{backgroundColor: '#fff'}}>
            <FlatList
              numColumns={1}
              data={this.state.sonuclananlar}
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
              renderItem={({item}) => (
                <View>
                  {item.durum == 4 ? (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('IslemDetay', {
                          cek_id: item.id,
                        })
                      }
                      style={styles.box1}>
                      <Row
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 5,
                          borderBottomWidth: 0.5,
                          borderBottomColor: '#D1D1D1',
                          paddingHorizontal: WIDTH / 35,
                        }}>
                        <Col style={{flex: 1}}>
                          <Text style={{color: 'black'}}>{item.eklenme}</Text>
                        </Col>
                        <Col style={{flex: 1}}>
                          <Text style={{color: 'black', textAlign: 'right'}}>
                            {item.altKategoriText}
                          </Text>
                        </Col>
                        <Col style={{flex: 1}}>
                          <Text style={{color: 'black', textAlign: 'right'}}>
                            {item.anaKategoriText}
                          </Text>
                        </Col>
                      </Row>
                      <Row style={{backgroundColor: '#f5f5f5', padding: 10}}>
                        <Col>
                          <Image
                            style={{
                              width: WIDTH / 4,
                              height: 50,
                              resizeMode: 'contain',
                            }}
                            source={{
                              uri:
                                'https://pro.faktodeks.com//uploads/bankalar/' +
                                item.logo,
                            }}
                          />
                        </Col>
                        <Col style={{flexDirection: 'column'}}>
                          <Text style={{textAlign: 'right'}}>Çek No</Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            {item.cek_no}
                          </Text>
                        </Col>
                        <Col style={{flexDirection: 'column'}}>
                          <Text style={{textAlign: 'right'}}>Çek Tarihi</Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            {item.tarih}
                          </Text>
                        </Col>
                      </Row>

                      <Row
                        style={{
                          backgroundColor: '#ffffffff',
                          height: HEIGHT / 10,
                        }}>
                        {item.toplam_teklif == 0 ? (
                          <Col>
                            <Button
                              style={{
                                backgroundColor: 'red',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: WIDTH / 30,
                                  textAlign: 'center',
                                }}>
                                İŞLEM OLMADI
                              </Text>
                            </Button>
                          </Col>
                        ) : (
                          <Col>
                            <Button
                              style={{
                                backgroundColor: '#D1D1D1',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: WIDTH / 30,
                                  textAlign: 'center',
                                }}>
                                İŞLEM OLDU
                              </Text>
                            </Button>
                          </Col>
                        )}
                        <Col
                          style={{
                            backgroundColor: '#F5F5F5',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 25,
                              color: 'black',
                              fontWeight: 'bold',
                              textAlign: 'right',
                              paddingRight: 10,
                            }}>
                            {item.miktar} {item.para_birim}
                          </Text>
                        </Col>
                      </Row>
                    </TouchableOpacity>
                  ) : null}

                  {item.durum == 10 ? (
                    <View style={styles.box1}>
                      <Row
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 5,
                          borderBottomWidth: 0.5,
                          borderBottomColor: '#D1D1D1',
                          paddingHorizontal: WIDTH / 35,
                        }}>
                        <Col style={{flex: 1}}>
                          <Text style={{color: 'black'}}>{item.eklenme}</Text>
                        </Col>
                        <Col style={{flex: 1}}>
                          <Text style={{color: 'black', textAlign: 'right'}}>
                            {item.altKategoriText}
                          </Text>
                        </Col>
                        <Col style={{flex: 1}}>
                          <Text style={{color: 'black', textAlign: 'right'}}>
                            {item.anaKategoriText}
                          </Text>
                        </Col>
                      </Row>
                      <Row style={{backgroundColor: '#f5f5f5', padding: 10}}>
                        <Col>
                          <Image
                            style={{
                              width: WIDTH / 4,
                              height: 50,
                              resizeMode: 'contain',
                            }}
                            source={{
                              uri:
                                'https://pro.faktodeks.com//uploads/bankalar/' +
                                item.logo,
                            }}
                          />
                        </Col>
                        <Col style={{flexDirection: 'column'}}>
                          <Text style={{textAlign: 'right'}}>Çek No</Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            {item.cek_no}
                          </Text>
                        </Col>
                        <Col style={{flexDirection: 'column'}}>
                          <Text style={{textAlign: 'right'}}>Çek Tarihi</Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            {item.tarih}
                          </Text>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          backgroundColor: '#ffffffff',
                          height: HEIGHT / 10,
                        }}>
                        {item.toplam_teklif == 0 ? (
                          <Col>
                            <Button
                              style={{
                                backgroundColor: 'red',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: WIDTH / 30,
                                  textAlign: 'center',
                                }}>
                                İŞLEM OLMADI
                              </Text>
                            </Button>
                          </Col>
                        ) : (
                          <Col>
                            <Button
                              style={{
                                backgroundColor: 'red',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: WIDTH / 30,
                                  textAlign: 'center',
                                }}>
                                İŞLEM OLMADI
                              </Text>
                            </Button>
                          </Col>
                        )}
                        <Col
                          style={{
                            backgroundColor: '#F5F5F5',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 25,
                              color: 'black',
                              fontWeight: 'bold',
                              textAlign: 'right',
                              paddingRight: 10,
                            }}>
                            {item.miktar} {item.para_birim}
                          </Text>
                        </Col>
                      </Row>
                    </View>
                  ) : null}
                </View>
              )}
            />
          </Content>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalLoading}
            onRequestClose={() => {
              this.setState({modalLoading: false});
            }}>
            <View
              style={{
                flex: 1,
                borderRadius: 10,
                backgroundColor: 'rgba(135, 135, 135, 0.35)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.modalViewLoading}>
                <View style={styles.modalUst}>
                  <ActivityIndicator size="large" color="#FFBA00" />
                </View>
              </View>
            </View>
          </Modal>

          <Altbar ileri="" ileriQR="" />
        </ImageBackground>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  box1: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#D1D1D1',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT / 4,
    width: WIDTH / 1,
  },
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
