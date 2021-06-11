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
  
  import CountDown from 'react-native-countdown-component';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class talepOnayla extends Component {
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
        fatura:[],
        durum : 1,
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
      this.startTimer()
        });
  }
async taleplerim() {
  try {
    const { params } = this.props.navigation.state;
      let response = await fetch(`https://pro.faktodeks.com//api/getTaleplerDetay/${params.bekleyen_cek_id}`, {
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
      let response = await fetch(`https://pro.faktodeks.com//api/getTekliflerDetay/${myToken}/${params.bekleyen_cek_id}/${params.id}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });

      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          this.setState({ detay: responseJson[0], refreshing:false })
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
 
decrementClock = () => {  
  if(this.state.timer === 0) clearInterval(this.clockCall)
  this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
 };
 
 componentWillUnmount() {
  clearInterval(this.clockCall);
 }
 async teklifOnayla(){
   const { params } = this.props.navigation.state;
const teklif_id= params.id;
const cek_id = params.bekleyen_cek_id;

  try{
     const token = await AsyncStorage.getItem('@myStores:access_token');
    let response = await fetch(`https://pro.faktodeks.com//api/teklifOnayla`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token:token,
          teklif_id : teklif_id,
          cek_id : cek_id,
        }),
    });
    if (response.status == '200' || response.status == '201') {
        this.props.navigation.navigate('Taleplerim2')
    } else {
        alert("hata")
      this.setState({ hata: '1'})
    }
  }
  catch(error){
  }
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
     
        <Menu />
          <Content>
          <Row style={{height:HEIGHT/4, width:WIDTH/1}}>
                                  <View style={{ width:WIDTH/1,justifyContent:'center',alignItems:'center',flexDirection:'column',paddingHorizontal:20,borderRadius:20,marginTop:20 }}>
                                  <Row style={{backgroundColor:'#14B1E9',borderTopLeftRadius:20,borderTopRightRadius:20,padding:10,height:20,width:'100%'}}>
                                  
                                  </Row>
                                  <Row style={{backgroundColor:'#f5f5f5',padding:10}}>
                                 
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
                                  <Row style={{backgroundColor:'#ffffffff',padding:10}}>
                                    <Col style={{flex:2}}><Text style={{fontSize:WIDTH/25,color:'black',fontWeight:'bold'}}>{this.state.talepler.miktar} TL</Text></Col>
                                    <Col style={{flex:1}}><Text style={{fontSize:WIDTH/40}}>İŞLEM TİPİ :</Text></Col>
                                    <Col style={{flex:1}}><Text style={{fontWeight:'bold', color:'black',fontSize:WIDTH/40}}>FAKTORİNG</Text></Col>
                                    <Col style={{flex:1}}><Text style={{fontSize:WIDTH/40}}>YURTİÇİ</Text></Col>
                                  </Row>
                              
                                  <Row style={{backgroundColor:'#14B1E9',padding:10,borderBottomRightRadius:20,borderBottomLeftRadius:20,height:40}}>
                                  <Col><Text style={{fontSize:WIDTH/30,color:'white',fontWeight:'bold'}}>TEKLİFLERE AÇIK</Text></Col>
                                  </Row>
                                </View>
                 
                 </Row>
                 <Row style={{alignItems:'center', paddingHorizontal:30,height:HEIGHT/8,flexDirection:'row',}}>
                   <Text style={{color:'#00FFF5'}}>Kalan süre :</Text>
                   <CountDown
                      size={15}
                      until={params.guncellenme}
                      onFinish={() => console.log("bitti")}
                      digitStyle={{backgroundColor: 'transparent',}}
                      digitTxtStyle={{color: '#00FFF5'}}
                      timeLabelStyle={{color: '#00FFF5', fontWeight: 'bold',fontSize:WIDTH/35}}
                      separatorStyle={{color: '#00FFF5'}}
                      timeToShow={['D','H', 'M', 'S']}
                      timeLabels={{d: 'gün',h: 'saat',m: 'dakika', s: 'saniye'}}
                      showSeparator
                    />
                  </Row>
                 <View style={
                     this.state.durum > 1 ? 
                   {flexDirection:'column',backgroundColor:'white'}: {flexDirection:'column',}
                   }>
                   <Row style={{width:WIDTH/1,height:50,borderTopLeftRadius:25,borderTopRightRadius:25,backgroundColor:'#FFBA00',}}></Row>
                      <Row style={{height:HEIGHT/10 ,width:WIDTH/1,backgroundColor:'#F3EEEE'}}>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Image
                              style={{width:WIDTH/3,height:50,resizeMode:'contain'   }}
                              source={
                                {uri : 'https://pro.faktodeks.com//faktoringler/'+this.state.detay.logo}
                                } 
                          />
                        </Col>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                           <Text style={{color:'#8E8D8D',fontWeight:'bold'}}>
                              TEKLİF
                              </Text>
                        <Text style={{fontSize:25,color:'black',fontWeight:'bold'}}>{this.state.detay.fiyat} {this.state.talepler.para_birim}</Text>
                        </Col>
                      </Row>
                      {
                        this.state.durum == 1 ? 
                        <Row style={{height:HEIGHT/4 ,width:WIDTH/1,backgroundColor:'#fff'}}>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#8E8D8D',fontWeight:'bold'}}>
                             VADE FARKI GİDERİ
                              </Text>
                              <Text style={{fontSize:25,color:'black',fontWeight:'bold'}}>{(this.state.talepler.miktar-this.state.detay.fiyat).toFixed(2)} {this.state.talepler.para_birim}</Text>
                             
                        </Col>
                       
                      </Row>
                      :
                     null
                      }
                    
                    {
                        this.state.durum == 2 ? 
                        <Row style={{height:HEIGHT/4 ,width:WIDTH/1,backgroundColor:'#FFBA00',borderTopLeftRadius:25,borderTopRightRadius:25,}}>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{fontSize:20, color:'#F5F5F5',fontWeight:'bold'}}>
                              Önemli!
                              </Text>
                              <Text style={{color:'#F5F5F5',textAlign:'center', fontSize:17}}>Gelebilecek Daha iyi teklifleri beklemek istemediğinize emin misiniz?
                                    </Text>
                        </Col>
                      </Row>
                      :
                     null
                      }
                       {
                        this.state.durum == 3 ? 
                        <Row style={{height:HEIGHT/4 ,width:WIDTH/1,backgroundColor:'#FFBA00',borderTopLeftRadius:25,borderTopRightRadius:25,}}>
                        <Col style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{fontSize:20, color:'#F5F5F5',fontWeight:'bold'}}>
                              Teklifi Kabul Et!
                              </Text>
                              <Text style={{color:'#F5F5F5',textAlign:'center', fontSize:17}}>Teklifi kabul ettiğiniz andan itibaren talebiniz tüm işlemlere kapatılacak, iletişim bilgileriniz teklif sahibiyle paylaşılıp, ardından istihbarat süreci başlayacaktır.
                                    </Text>
                        </Col>
                      </Row>
                      :
                     null
                      }
                    
                 </View>
        </Content>
              
        <Footer style={
          this.state.durum >1?
          { backgroundColor: '#FFBA00', height:HEIGHT/9}
          :
          { backgroundColor: 'white', height:HEIGHT/9}
          }>
          <FooterTab style={{borderTopLeftRadius:30,borderTopRightRadius:30,backgroundColor:'#FFBA00',paddingHorizontal:20}}>
          <Button  bordered light style={{marginTop:10,padding:10,borderRadius:25,justifyContent:'center',alignItems:'center'}}
                  onPress={() =>  this.props.navigation.navigate('Teklifler',{cek_id:this.state.detay.bekleyen_cek_id,guncellenme:params.guncellenme})}>
                      <Text style={{textAlign:'center',color:'white'}}>Tekliflere Dön</Text>
                    </Button>
            <Button transparent bordered light  
          
            onPress={() =>
              {
               this.state.durum == 1 ? 
              this.setState({durum:2})
              :null
              this.state.durum == 2 ? 
              this.setState({durum:3})
              :null
              this.state.durum == 3 ? 
             this.teklifOnayla(this.state.detay.id,this.state.detay.bekleyen_cek_id)
              :null
            }
            } 
            
            
            style={{marginTop:10,padding:10,marginLeft:15, backgroundColor:'#ff7a00ff',borderRadius:25,justifyContent:'center',alignItems:'center'}}>
           { this.state.durum >1?   <Text style={{textAlign:'center',color:'white'}}>Devam</Text>:<Text style={{textAlign:'center',color:'white'}}>Kabul Et</Text>}
            </Button>
          </FooterTab>
          
        </Footer>       
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(talepOnayla);
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