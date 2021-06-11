import React, {Component} from 'react';
import { ImageBackground,KeyboardAvoidingView,TouchableOpacity,View, Alert,Dimensions,Animated, StatusBar,StyleSheet, SafeAreaView,Text} from 'react-native';
import {Row, Subtitle, Item} from 'native-base';
import {Image} from '@shoutem/ui';
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';
import Moment from 'moment/min/moment-with-locales';
import Menu from '../inc/header';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default class smsOnayYeniSifre extends Component {
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
        code2:'',
        progressStatus: 0,  
        timer: null,
        counter: 0
    }
  }
   checkToken = async () =>{
    const { params } = this.props.navigation.state;
    var tel1 = params.telefon.substring(0, 3);
    var tel2 = params.telefon.substring(3, 10);

    this.setState({tckn:params.tckn,sms:params.sms,tel1:tel1,tel2:tel2})
   }
   
   _onFinishCheckingCode2() {
    console.log(this.state.isValid);
    if (!this.state.isValid) {
      Alert.alert(
        'Sms Kontrolü',
        'Kod Eşleşmedi',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
    const { params } = this.props.navigation.state;
      this.props.navigation.navigate('SifreDegistir',{tckn:this.state.tckn,onesignal_token:params.onesignal_token});

    }
  }

   
  componentDidMount() {
    this.onAnimate(); 
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
    this.checkToken();

        });
  }
  async control(){
    const { params } = this.props.navigation.state;
          try{
            let response = await fetch(`https://pro.faktodeks.com/api/tcSifre`, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tckn: params.tckn,
                }),
            });
            if (response.status == '200' || response.status == '201') {
                let responseJson = await response.json();
               setState({sms:responseJson.sms})
               alert('Sms tekrar gönderildi. Lütfen mesajlarınızı kontrol ediniz.');
            } else if(response.status == '404'){
                Alert.alert(
                    '',
                     'Hatalı Tc Kimlik Numarası',
                    [
                        { text: 'Anladım' },
                    ],
                    { cancelable: false },
                );
            }else{
              alert("olmadı")
            }
          }
          catch(error){
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
        const { days, hours, mins, secs } = this.state
        return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding">

            <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
      <Menu profilNo="a" yer="Doğrulama"/>
 
            
                <Row  style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',marginTop:20 , height:HEIGHT/8}}>
                        <Subtitle style={{color:'white',fontSize:19,fontWeight:'bold'}}>0 ({this.state.tel1}) {this.state.tel2}</Subtitle>
                        <Text style={{color:'white',fontSize:17,marginTop:10}}>Telefonunuza gelen doğrulama </Text>
                        <Text style={{color:'white',fontSize:17,marginTop:10}}>kodunu giriniz.</Text>
                  </Row>
                  <Row style={{alignItems:'center', justifyContent:'center', paddingHorizontal:30,height:HEIGHT/10,flexDirection:'row', height:HEIGHT/10}}>
                   <Text style={{color:'#fff',fontWeight:'bold'}}>Kalan süre :</Text>
                   
                   <CountDown
                      size={15}
                      until={170}
                      onFinish={() => alert("bitti")}
                      digitStyle={{backgroundColor: 'transparent',}}
                      digitTxtStyle={{color: '#fff'}}
                      timeLabelStyle={{color: '#fff', fontWeight: 'bold',fontSize:WIDTH/35}}
                      separatorStyle={{color: '#00FFF5'}}
                      timeToShow={[ 'M', 'S']}
                      timeLabels={{m: '', s: ''}}
                      showSeparator
                    />
                  </Row>
                  <Row style={{ justifyContent:'center',paddingHorizontal:30 ,marginTop:20, height:HEIGHT/8}}>
                  <View style={styles.container}>  
                        <Animated.View  
                            style={[  
                                styles.inner,{width: this.state.progressStatus +"%"},  
                            ]}  
                        />  
                  </View>  
                  </Row>
                  <Row style={{ justifyContent:'center',alignItems:'center', flexDirection:'column' , height:HEIGHT/4}}>
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
                    onFulfill={(isValid, code) => this.setState({isValid:isValid,code2:code})}
                    containerStyle={{ marginTop: 30 }}
                    codeInputStyle={{ borderWidth: 1.5 }}
                    />
                
               </Row>
               <Row style={{ justifyContent:'center',alignItems:'center', flexDirection:'row'  }}>
                  <TouchableOpacity style={{ justifyContent:'center',}} 
                  onPress={this.control.bind(this)} >
                        <Image
                                style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                                source={require('../assets/tekrar-gonder.png')} 
                            />
                    </TouchableOpacity>
                  <TouchableOpacity style={{ justifyContent:'center',}} 
                  onPress={this._onFinishCheckingCode2.bind(this)} >
                        <Image
                                style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                                source={require('../assets/dogrula.png')} 
                            />
                    </TouchableOpacity>
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
    backgroundColor:"#00FFF5",  
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    alignSelf: "center",  
  }  
});
 