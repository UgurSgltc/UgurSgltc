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
    Image,
    ImageBackground,
    SafeAreaView,
    RefreshControl
  } from 'react-native';
  import { Container,  Button, Header,Col,Row, Left, Body, Right, Content,FooterTab,Footer } from 'native-base';
  import { Subtitle} from '@shoutem/ui';
  import CountDown from 'react-native-countdown-component';
import { withNavigation } from 'react-navigation';
import Altbar from '../inc/footer';
import Menu from '../inc/header';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class cekDetay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        talepler:'',
        toplam:'',
        detay:'',
        refreshing:true,
        vkn:'',
        toplam_fatura:'',
        eklenme:'',
        onyuz:'',
        diff:'',
        arkayuz:'',
        fatura:[],
        value:'',
        setValue:'',
        kalan_sure:'',
        fark:0,
    }
     
  }
  
  _onRefresh() {
    this.taleplerim();
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.taleplerim()
      this.cekDetay()
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
          this.setState({ vkn: responseJson.cekDetay[0].vkn,
              eklenme:responseJson.cekDetay[0].eklenme,
              onyuz:responseJson.cekDetay[0].cekOn,
              arkayuz:responseJson.cekDetay[0].cekArka,
              fatura:responseJson.faturalar,
              toplam_fatura: responseJson.toplam[0].toplam,
              refreshing:false })
    
      } else {
        console.log("gelmedi")
  
      }
  } catch (error) {
      console.error(error);
  }
}

async talepKapat(){
  const { params } = this.props.navigation.state;
  try{
    let response = await fetch(`https://pro.faktodeks.com//api/talepKapat`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cek_id : params.cek_id,
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
          this.props.navigation.navigate('')
          //normalde burada 'Talepler' Taleplere navigate ediyor 
         //  çek detayına girer girmez geri çıkıyor bu yüzden o kaldırıldı '' bu şekilde kaldı.!
    } else {
        this.setModalLoading(false);
      this.setState({ hata: '1'})
    }

  }
  catch(error){

  }
}
faturalarGetir() {
  return this.state.fatura.map((val, key) => {
      return (
      
          <TouchableOpacity key={key} 
             style={{paddingLeft:15,paddingBottom:15, flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
                  <Image
                styleName="small"
                style={{  borderWidth:1,borderColor:'black',borderRadius:10  }}
                source={{ uri: 'https://pro.faktodeks.com//uploads/cekOn/'+val.foto}}
                />
          </TouchableOpacity>
      )
  })
}
  render() {
    const { params } = this.props.navigation.state;
     return (

        
        <Container >
       
        <ImageBackground source={
       this.state.talepler == '' ?    require('../images/bs3.png') : require('../images/Background.png')
          
          }  style={{width: '100%', height: '100%'}}>
     
        <Menu yer='Çek Detay' />
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
                                    <Text style={{color:'white',fontSize:WIDTH/30,textAlign:'center'}}>{this.state.talepler.toplam_teklif} TEKLİF VAR</Text>
                                  </Button>
                                   }
                                  </Col>
                                   <Col style={{backgroundColor:'#F5F5F5',justifyContent:'center'}}>
                                     <Text style={{fontSize:25,color:'black',fontWeight:'bold',textAlign:'right',paddingRight:10}}>{this.state.talepler.miktar} {this.state.talepler.para_birim}</Text>
                                  </Col>
                                </Row>
                         </View>
                     
                  </Row>
                 <View style={{height:HEIGHT/14,backgroundColor:'transparent',flexDirection:'column',paddingHorizontal:20,marginTop:15}}>
                 <Row style={{alignItems:'center', justifyContent:'center', paddingHorizontal:30,height:HEIGHT/14,flexDirection:'row',backgroundColor:'white'}}>
                   <Text style={{color:'#16AAE8'}}>Kalan süre :</Text>
                   <CountDown
                      size={15}
                      until={params.guncellenme}
                      onFinish={() => this.talepKapat()}
                      digitStyle={{backgroundColor: 'transparent',}}
                      digitTxtStyle={{color: '#16AAE8'}}
                      timeLabelStyle={{color: '#16AAE8', fontWeight: 'bold',fontSize:WIDTH/35}}
                      separatorStyle={{color: '#16AAE8'}}
                      timeToShow={['D','H', 'M', 'S']}
                      timeLabels={{d: null,h:null,m: null, s: null}}
                      showSeparator
                    />
                  </Row>
                </View>
                 <View style={{backgroundColor:'transparent',flexDirection:'column',paddingHorizontal:20,marginTop:15}}>
                      <Row style={{height:HEIGHT/13 ,backgroundColor:'#fff'}}>
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
                      <Row style={{backgroundColor:'#fff',marginTop:15}}>
                        <Col style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#1B1C20',fontWeight:'bold',textAlign:'left'}}>
                               ÇEK ÖNYÜZÜ
                              </Text>
                          </Col>
                          <Col style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingVertical:10}}>

                            <Image
                                  style={{marginTop:5,width:WIDTH/2.5,resizeMode:'contain' ,height:HEIGHT/13,  }}
                                  source={ {uri : 'https://pro.faktodeks.com//uploads/cekOn/'+this.state.onyuz}}
                                />
                          
                          </Col>
                          </Row> 
                      <Row style={{backgroundColor:'#fff',marginTop:15}}>
                        <Col style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'#1B1C20',fontWeight:'bold',textAlign:'right'}}>
                                ÇEK ARKA YÜZÜ
                              </Text>
                        </Col>
                        <Col style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            
                              <Image
                                 
                                 style={{marginTop:5,width:WIDTH/2.5,resizeMode:'contain' ,height:HEIGHT/13,  }}

                                  source={ {uri : 'https://pro.faktodeks.com//uploads/cekOn/'+this.state.arkayuz}}
                                />
                        </Col>
                      </Row>
                      <View style={{marginTop:15, backgroundColor:'transparent'}}>
                        <Row style={{backgroundColor:'white',width:'100%',padding:20}}>
                        <Col style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                          <Text style={{color:'#8E8D8D',textAlign:'left'}}>TOPLAM FATURA TUTARI:</Text>
                          </Col>
                          <Col style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                          <Text style={{color:'#1B1C20',fontWeight:'bold',textAlign:'right'}}>{this.state.toplam_fatura} TL</Text>
                        </Col>
                       </Row>
                      </View>
                      <Row style={{ justifyContent:'center' ,marginTop:20,marginBottom:20 }}>
                      {this.state.talepler.toplam_teklif != 0 ? 
                        <Button block transparent onPress={() => this.props.navigation.navigate('Teklifler',{cek_id:params.cek_id})} style={{backgroundColor:'#FF8900',width:'100%',borderRadius:10}} >
                        <Text style={{color:'#fff'}}>TEKLİFLERİ GÖR</Text>
                      </Button>
                      :null}
                    </Row>
                 </View>
        </Content>
              
       <Altbar />       
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(cekDetay);
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