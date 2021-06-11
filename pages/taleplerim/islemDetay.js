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
    ScrollView,
    FlatList,
    Text,
    Alert,
    StatusBar,
    Switch,
    ImageBackground,
    SafeAreaView,
    RefreshControl
  } from 'react-native';
  import { Container,  Button, Header,Col,Row, Left, Body, Right, Content,FooterTab,Footer } from 'native-base';
  import {Image, Subtitle} from '@shoutem/ui';
  
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';
import CountDown from 'react-native-countdown-component';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class islemDetay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        talepler:'',
        toplam:'',
        detay:'',
        refreshing:true,
        vkn:'',
        eklenme:'',
        onyuz:'',
        arkayuz:'',
        fiyat:'',
        eklenme_tarihi:'',
        banka_logo:'',
        fatura:[],
        setValue:'',
        timer: 1500 ,
        progress: 0,
        progressWithOnComplete: 0,
        progressCustomized: 0,
    }
     
  }
  _onRefresh() {
    this.taleplerim();
  }
  startTimer = () => {
    this.clockCall = setInterval(() => {
     this.decrementClock();
    }, 1000);
   }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.taleplerim()
      this.cekDetay()
      this.getTalepFiyat()
        });
  }
async taleplerim() {
  try {
    const { params } = this.props.navigation.state;
    const myToken = await AsyncStorage.getItem('@myStores:access_token');
      let response = await fetch(`https://pro.faktodeks.com//api/getTaleplerDetay/${params.cek_id}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });

      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          this.setState({ talepler: responseJson[0], refreshing:false })
      } else {
          Alert.alert(
              '',
              'Kategoriler Getirilemedi!',
              [
                  {
                      text: 'OK', onPress: () => console.log('presed')

                  }

              ],
              { cancelable: false },
          );
      }
  } catch (error) {
      console.error(error);
  }
}
async cekDetay(){
  const { params } = this.props.navigation.state;
  try {
    const myToken = await AsyncStorage.getItem('@myStores:access_token');
      let response = await fetch(`https://pro.faktodeks.com//api/getCekDetay/${params.cek_id}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });

      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          this.setState({ vkn: responseJson.cekDetay[0].vkn,eklenme:responseJson.cekDetay[0].eklenme,onyuz:responseJson.cekDetay[0].cekOn,arkayuz:responseJson.cekDetay[0].cekArka,fatura:responseJson.faturalar,  refreshing:false })
      } else {
          Alert.alert(
              '',
              'Kategoriler Getirilemedi!',
              [
                  {
                      text: 'OK', onPress: () => console.log('presed')

                  }

              ],
              { cancelable: false },
          );
      }
  } catch (error) {
      console.error(error);
  }
}
 
async getTalepFiyat(){
  const { params } = this.props.navigation.state;
  try {
    const myToken = await AsyncStorage.getItem('@myStores:access_token');
      let response = await fetch(`https://pro.faktodeks.com//api/getIslemlerDetay/${myToken}/${params.cek_id}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });

      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          this.setState({ fiyat : responseJson[0].fiyat, eklenme_tarihi:responseJson[0].eklenme, banka_logo:responseJson[0].logo })
      } else {
          Alert.alert(
              '',
              'Kategoriler Getirilemedi!',
              [
                  {
                      text: 'OK', onPress: () => console.log('presed')

                  }

              ],
              { cancelable: false },
          );
      }
  } catch (error) {
      console.error(error);
  }
}
faturalarGetir() {
  return this.state.fatura.map((val, key) => {
      return (
      
          <TouchableOpacity key={key} 
             style={{paddingLeft:15,paddingBottom:15, flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  <Image
                styleName="small"
                style={{    }}
                source={{ uri: 'https://pro.faktodeks.com//uploads/cekOn/'+val.foto}}
                />
          </TouchableOpacity>
      )
  })
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
    const { params } = this.props.navigation.state;
    return (

        
        <Container >
       
        <ImageBackground source={
       this.state.talepler == '' ?    require('../images/bs3.png') : require('../images/Background.png')
          
          }  style={{width: '100%', height: '100%'}}>
     
        <Menu yer='İşlem Detay'/>
        <Content style={{backgroundColor:'#F5F5F5'}}>
          <Row style={{height:HEIGHT/5, width:WIDTH/1}}>
                              
                              <View  style={{ borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', flexDirection:'column',justifyContent:'center',alignItems:'center', height:HEIGHT/5,width:WIDTH/1}}>   
                                <Row style={{backgroundColor:'#FFFFFF',paddingTop:5, borderBottomWidth:0.5,borderBottomColor:'#D1D1D1',paddingHorizontal:WIDTH/35}}>
                                  <Col style={{flex:1}}>
                                  <Text style={{color:'black'}}>{this.state.eklenme}</Text>
                                  </Col>
                                  <Col style={{flex:1}}>
                                  <Text style={{color:'black',textAlign:'center'}}>{this.state.talepler.anaKategoriText}</Text>
                                  </Col>
                                  <Col style={{flex:1}}>
                                  <Text style={{color:'black'}}>{this.state.talepler.altKategoriText}</Text>
                                  </Col>
                                </Row>
                                <Row style={{backgroundColor:'#fff',padding:10}}>
                                  <Col>
                                      <Image
                                        style={{width:WIDTH/4,height:50,resizeMode:'contain'   }}
                                        source={
                                          {uri : 'https://pro.faktodeks.com//uploads/bankalar/'+this.state.talepler.logo}
                                          } 
                                    />
                                  </Col>
                                  <Col style={{flexDirection:'column'}}>
                                    <Text  style={{textAlign:'right'}}>Çek No</Text>
                                  <Text style={{textAlign:'right',color:'black',fontWeight:'bold'}}>{this.state.talepler.cek_no}</Text>
                                  </Col>
                                  <Col style={{flexDirection:'column'}}>
                                    <Text style={{textAlign:'right'}}>Çek Tarihi</Text>
                                  <Text style={{textAlign:'right',color:'black',fontWeight:'bold'}}>{this.state.talepler.tarih}</Text>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:'#ffffffff',height:HEIGHT/14}}>
                                    <Col> 
                                    {this.state.talepler.toplam_teklif == 0 ? 
                                      <Button style={{backgroundColor:'#00FFF5', width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#042264',fontSize:WIDTH/30,textAlign:'center'}}>HENÜZ TEKLİF YOK</Text>
                                      </Button>
                                      :
                                      <Button style={{backgroundColor:'#FF8900', width:'100%',height:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                      <Text style={{color:'white',fontSize:WIDTH/30,textAlign:'center'}}>İŞLEM OLDU</Text>
                                    </Button>
                                     }
                                    </Col>
                                     <Col style={{backgroundColor:'#F5F5F5',justifyContent:'center'}}>
                                       <Text style={{fontSize:25,color:'black',fontWeight:'bold',textAlign:'right',paddingRight:10}}>{this.state.talepler.miktar} {this.state.talepler.para_birim}</Text>
                                    </Col>
                                  </Row>
                           </View>
                       
                    </Row>
                 <View style={{height:HEIGHT/1.5,borderTopLeftRadius:25,borderTopRightRadius:25,backgroundColor:'#ffffff',flexDirection:'column',marginTop:10}}>
                   
                 <Row style={{height:HEIGHT/10 ,width:WIDTH/1,backgroundColor:'#fff',borderTopRightRadius:20,borderTopLeftRadius:20}}>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <Image
                                          style={{width:WIDTH/4,height:50,resizeMode:'contain'   }}
                                          source={
                                            {uri : 'https://pro.faktodeks.com/faktoringler/'+this.state.banka_logo}
                                            } 
                                      />
                        </Col>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#8E8D8D'}}>
                                TEKLİF TARİHİ
                              </Text>
                              <Text style={{color:'#1B1C20',fontWeight:'bold'}}>
                              {this.state.eklenme_tarihi}
                              </Text>
                        </Col>
                      </Row>
                     
                      <Row style={{height:HEIGHT/10 ,width:WIDTH/1,backgroundColor:'#FFBA00'}}>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#FFFFFF'}}>
                               VADE FARKI
                              </Text>
                              <Text style={{color:'#FFFFFF',fontWeight:'bold'}}>
                              {this.state.talepler.miktar-this.state.fiyat} {this.state.talepler.para_birim}
                              </Text>
                        </Col>
                   
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#FFFFFF'}}>
                                TEKLİF
                              </Text>
                              <Text style={{color:'#FFFFFF',fontWeight:'bold'}}>
                              {this.state.fiyat} {this.state.talepler.para_birim}
                              </Text>
                        </Col>
                      </Row>
                     
                      <Row style={{height:HEIGHT/10 ,width:WIDTH/1,backgroundColor:'#F3EEEE'}}>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#8E8D8D'}}>
                                KEŞİDECİ VKN
                              </Text>
                              <Text style={{color:'#1B1C20',fontWeight:'bold'}}>
                              {this.state.vkn}
                              </Text>
                        </Col>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#8E8D8D'}}>
                                YÜKLEME TARİHİ
                              </Text>
                              <Text style={{color:'#1B1C20',fontWeight:'bold'}}>
                              {this.state.eklenme}
                              </Text>
                        </Col>
                      </Row>
                      <Row style={{height:HEIGHT/5 ,width:WIDTH/1,backgroundColor:'#fff'}}>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#8E8D8D',fontWeight:'bold'}}>
                               ÇEK ÖNYÜZÜ
                              </Text>
                              <Image
                                  styleName="medium"
                                  style={{   }}
                                  source={ {uri : 'https://pro.faktodeks.com//uploads/cekOn/'+this.state.onyuz}}
                                />
                           
                        </Col>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#8E8D8D',fontWeight:'bold'}}>
                                ÇEK ARKA YÜZÜ
                              </Text>
                              <Image
                                  styleName="medium"
                                  style={{   }}
                                  source={ {uri : 'https://pro.faktodeks.com//uploads/cekOn/'+this.state.arkayuz}}
                                />
                        </Col>
                      </Row>
                      <View style={{height:30 ,width:WIDTH/1,paddingLeft:20,paddingTop:10, backgroundColor:'#F3EEEE'}}>
                        <Text style={{color:'black',fontWeight:'bold'}}>FATURALAR</Text>
                      </View>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{backgroundColor:'#F3EEEE'}}>
                        {this.faturalarGetir()}
                    </ScrollView>
                 </View>
        </Content>
              
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(islemDetay);
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
card:{
   width:WIDTH/3.5,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    marginLeft:10,
   },
   imageCard:{
       borderRadius:20,
      
       resizeMode:'contain'
   },
   
  modalView: {
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
   hr:{
    borderTopWidth:0.5,
    borderTopColor:'#e7e7e7',
    paddingTop:10
   },

   kategori:{
    flexDirection:'column',
    height:HEIGHT/4,
    justifyContent:'center',
    alignItems:'center',
},

});