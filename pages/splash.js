import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Row} from 'native-base';
import OneSignal from 'react-native-onesignal';
export default class splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      durum: 2,
      onesignal_token: '',
      sonHali: 0,
    };
  }
  componentWillMount() {
    OneSignal.setAppId("9805c75f-b157-4365-bbd2-8af3c693af59")
    // OneSignal.init('9805c75f-b157-4365-bbd2-8af3c693af59', {
    //   kOSSettingsKeyAutoPrompt: true,
    // });
    OneSignal.setNotificationWillShowInForegroundHandler(this.onReceived);
    OneSignal.setNotificationOpenedHandler(this.onOpened);
    OneSignal.getDeviceState().then(this.onIds);
  }
  componentDidMount() {
    // OneSignal.setNotificationOpenedHandler(this.onOpened);
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
      setTimeout(this.checkToken2, 3000);
    });
  }

  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    this.props.navigation.navigate('CekDetay', {
      cek_id: openResult.notification.payload.additionalData.cek_id,
    });
  }
  onIds = (device) => {
    console.log('Device info: ', device.userId);
    this.checkToken(device.userId);
    this.setState({onesignal_token: device.userId});
  };
  checkToken2 = async () => {
    if (this.state.sonHali == 1) {
      this.props.navigation.navigate('Anasayfa');
    } else if (this.state.sonHali == 0) {
      this.props.navigation.navigate('Register', {
        onesignal_token: this.state.onesignal_token,
      });
    }
  };
  checkToken = async (onesignal_token) => {
    const myToken = await AsyncStorage.getItem('@myStores:access_token');
    if (myToken) {
      try {
        let response = await fetch(
          `https://pro.faktodeks.com//api/getUserNotifData/${myToken}/${onesignal_token}`,
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
            this.setState({durum: 1, name: responseJson[0].name, sonHali: 1});
          } else {
            this.setState({durum: 0, sonHali: 0});
          }
        } else {
          this.setState({durum: 0, sonHali: 0});
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      this.setState({durum: 0, sonHali: 0});
    }
  };
  render() {
    return this.state.durum == 0 ? (
      <ImageBackground
        source={require('./assets/splash.png')}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}></ImageBackground>
    ) : (
      <ImageBackground
        source={require('./assets/splash.png')}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Row
          style={{
            bottom: 200,
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Hoşgeldiniz</Text>
          <Text style={{color: '#FFBA00', fontSize: 24}}>
            {this.state.name}
          </Text>
        </Row>
      </ImageBackground>
    );
  }
}
