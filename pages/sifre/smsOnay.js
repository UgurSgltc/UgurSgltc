import React, {Component} from 'react';
import { ImageBackground,KeyboardAvoidingView,TouchableOpacity,View, Alert,Dimensions,Animated, StatusBar,StyleSheet, SafeAreaView,Text} from 'react-native';
import {Row, Subtitle, Item} from 'native-base';
import {Image} from '@shoutem/ui';
import CodeInput from 'react-native-confirmation-code-input';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default class smsOnay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      tckn:'',
      tel1:'',
      tel2:'',
      telefon:'',
      sms:'',
      timer:180,
      code:'',
      progressStatus: 0,  
      timer: null,
      counter: 0
    }
  }
  componentDidMount() {
    this.onAnimate(); 
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
    this.checkToken();

        });
  }
   checkToken = async () =>{
    const { params } = this.props.navigation.state;
    
    var tel1 = params.telefon.substring(0, 3);
    var tel2 = params.telefon.substring(3, 10);
    this.setState({tckn:params.tckn,sms:params.sms,telefon:params.telefon,tel1:tel1,tel2:tel2})
   }
   async tokenOlustur(){
    const { params } = this.props.navigation.state;
    //await AsyncStorage.setItem('@myStores:access_token', params.token);
    this.props.navigation.navigate('AddFirma',{token:params.token});
  }
async loginFetch() {
  const { params } = this.props.navigation.state;
        try {
            let response = await fetch('https://pro.faktodeks.com//api/login', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tckn: params.tckn,
                    parola: params.parola,
                }),
            });
            console.log(response);
            if (response.status == '200' || response.status == '201') {
                let responseJson = await response.json();
                Alert.alert(
                  'Sms Onay',
                     'Sms Tekrar Gönderildi Lütfen Kontrol Ediniz',
                  [
                      { text: 'OK' },
                  ],
                  { cancelable: false },
              );
                this.setState({sms:responseJson.sms})
            }
            else if(response.status == '404') {
                Alert.alert(
                    '',
                       'Gönderilemedi',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }else{
                alert("Büyük Hata")
                this.setModalLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
}
   _onFinishCheckingCode2(isValid, code) {
    console.log(isValid);
    if(code != ''){
    if (!isValid) {
      Alert.alert(
        'Sms Kontrolü',
        'Kod Eşleşmedi',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      this.setState({ code });
      this.tokenOlustur()
    }
  }else{
    Alert.alert(
      '',
      'Kod Boş Bırakılamaz',
      [{text: 'OK'}],
      { cancelable: false }
    );
  }
  }
 
  anim = new Animated.Value(0);  

  componentWillUnmount() {
   clearInterval(this.clockCall);
  }
  
  decrementClock = () => {      
   this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
  };
  anim = new Animated.Value(0);  
   onAnimate = () =>{  
       this.anim.addListener(({value})=> {  
           this.setState({progressStatus: parseInt(value,10)});  
       });  
       Animated.timing(this.anim,{  
        toValue: 100,  
        duration: 180000, 
       }).start();  
   }  
   render() {
        const code = this.state.sms.toString() 
        return (
          <KeyboardAvoidingView style={{flex:1}} behavior="padding">
          <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
          <StatusBar backgroundColor="#16aae8" barStyle="light-content" />

            <Row style={{ justifyContent:'center',height:WIDTH/10  }}>
            <Image
                        style={{width:WIDTH/4,resizeMode:'contain',marginTop:20, padding:20}}
                        source={require('../images/logo-beyaz.png')} 
                    />
              </Row>
              <Row  style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',marginTop:20  }}>
                      <Subtitle style={{color:'white',fontSize:19}}>+90 {this.state.tel1} {this.state.tel2}</Subtitle>
                      <Text style={{color:'white',fontSize:17,marginTop:10}}>Telefonunuza gelen doğrulama kodunu giriniz.</Text>
                </Row>
                <Row style={{ justifyContent:'center',paddingHorizontal:30 ,marginTop:20}}>
                <View style={styles.container}>  
                      <Animated.View  
                          style={[  
                              styles.inner,{width: this.state.progressStatus +"%"},  
                          ]}  
                      />  
                </View>  
                </Row>
                <Row style={{ justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
                  <CodeInput
                   codeLength={6}
                  ref="codeInputRef2"
                  keyboardType="numeric"
                  compareWithCode={code}
                  activeColor='white'
                  inactiveColor='white'
                  autoFocus={false}
                  ignoreCase={true}
                  inputPosition='center'
                  size={50}
                  onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
                  containerStyle={{ marginTop: 30 }}
                  codeInputStyle={{ borderWidth: 1.5 }}
                  />
              
             </Row>
             <Row style={{ justifyContent:'center',alignItems:'center', flexDirection:'column'  }}>
             { this.state.progressStatus > 99 ?
                <TouchableOpacity style={{ justifyContent:'center',}} 
                onPress={this.control} >
                      <Image
                              style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                              source={require('../images/tekrar-gonder.png')} 
                          />
                  </TouchableOpacity>
                  :null}
              </Row>
          </ImageBackground>
          </KeyboardAvoidingView>

         );
      
      }
    }
  
     
const styles = StyleSheet.create({
  container: {  
    width: "100%",  
    height: 30,  
    padding: 3,  
    borderColor: "#FFFFFF",  
    borderWidth: 3,  
    borderRadius: 30,  
    justifyContent: "center",  
  },  
  inner:{  
    width: "100%",  
    height: 20,  
    borderRadius: 15,  
    backgroundColor:"#FFBA00",  
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    alignSelf: "center",  
  }  
});
 