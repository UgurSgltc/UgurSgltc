import React, {Component} from 'react';
import { ImageBackground,TouchableOpacity, Alert,Dimensions, StatusBar,StyleSheet, SafeAreaView,Text} from 'react-native';
import {Row, Subtitle} from 'native-base';
import {Image} from '@shoutem/ui';
import CodeInput from 'react-native-confirmation-code-input';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import moment from 'moment/min/moment-with-locales';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default class mailOnay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value:'',
        setValue:'',
        timer: 180 ,
        progress: 0,
        progressWithOnComplete: 0,
        progressCustomized: 0,
    }
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
    this.startTimer();

        });
  }
  startTimer = () => {
    this.clockCall = setInterval(() => {
     this.decrementClock();
    }, 1000);
   }
   
   decrementClock = () => {  
    if(this.state.timer === 0) clearInterval(this.clockCall)
    this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
   };
   
   componentWillUnmount() {
    clearInterval(this.clockCall);
   }
      render() {
        const barWidth = Dimensions.get('screen').width/1.2;
        const progressCustomStyles = {
          backgroundColor: 'red', 
          borderRadius: 0,
          borderColor: 'orange',
        };
        setTimeout((function() {
          this.setState({ progress: this.state.progress + (Math.PI * 20)});
        }).bind(this),3000);
        return (
            <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
            <StatusBar backgroundColor="#16aae8" barStyle="light-content" />
 
              <Row style={{ justifyContent:'center',height:WIDTH/10  }}>
              <Image
                          style={{width:WIDTH/4,resizeMode:'contain',marginTop:20, padding:20}}
                          source={require('../images/logo-beyaz.png')} 
                      />
                </Row>
                <Row  style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',  }}>
                        <Subtitle style={{color:'white',fontSize:19}}>abbaslanbay@gmail.com</Subtitle>
                        <Text style={{color:'white',fontSize:17}}>E postanıza gelen doğrulama kodunu giriniz.</Text>
                  </Row>
                  <Row style={{ justifyContent:'center',alignItems:'center',flexDirection:'column'  }}>
                  <Text style={{color:'white',fontSize:17}}> {this.state.timer === 0 ? 'Zaman Doldu!' :'Kalan Süre :' + this.state.timer }</Text>
                  </Row>
                  <Row style={{ justifyContent:'center',paddingHorizontal:30 }}>
                  <ProgressBarAnimated
                    width={barWidth}
                    value={this.state.progress}
                    backgroundColorOnComplete="#ffaf00"
                    backgroundColor="#ffaf00"
                  />
                  </Row>
                  <Row>
                    <CodeInput
                    ref="codeInputRef2"
                    keyboardType="numeric"
                    compareWithCode='123456'
                    activeColor='white'
                    inactiveColor='white'
                    autoFocus={false}
                    ignoreCase={true}
                    inputPosition='center'
                    size={50}
                    onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
                    containerStyle={{ marginTop: 30 }}
                    codeInputStyle={{ borderWidth: 1.5 }}
                    />
               </Row>
               <Row style={{ justifyContent:'center',alignItems:'center', flexDirection:'column'  }}>
                  <TouchableOpacity style={{ justifyContent:'center',}}   onPress={() => { this.setState({ kvkk: true,modalVisible2:false }); }}>
                        <Image
                                style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                                source={require('../images/buton-girisyap.png')} 
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent:'center',}}   onPress={()=>this.props.navigation.navigate('YeniSifre')}>
                        <Image
                                style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                                source={require('../images/buton-girisyap.png')} 
                            />
                    </TouchableOpacity>
                </Row>
                
            </ImageBackground>
        );
      
      }
    }
  
     
const styles = StyleSheet.create({

});
 