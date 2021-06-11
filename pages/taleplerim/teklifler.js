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
    FlatList,
    Text,
    Alert,
    StatusBar,
    Switch,
    ImageBackground,
    SafeAreaView,
    RefreshControl
  } from 'react-native';
  import { Container,  Button, Header,Col,Row,SwipeRow, Left,Icon, Body, Right, Content ,Footer,FooterTab} from 'native-base';
  import {Image, Subtitle} from '@shoutem/ui';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';
import Pusher from 'pusher-js/react-native';
Pusher.logToConsole = true;

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class teklifler extends Component {
    constructor(props) {
        super(props);
        this.state = {
        teklifler:[],
        toplam:'',
        cek_id:'',
        refreshing:true
    }
    this.pusher = new Pusher('f133b70effe845679984', {
      cluster: 'eu',
      forceTLS: true
  });
  this.chatChannel = this.pusher.subscribe('my-channel');
  this.chatChannel.bind('my-event', (data) => {
    this.tekliflerim()
    
  });
  }
  _onRefresh() {
    this.tekliflerim();
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.tekliflerim()
      this.talepID()
        });
  }
  async talepID(){
    const { params } = this.props.navigation.state;
    this.setState({cek_id : params.cek_id})
  }
async tekliflerim() {
  const { params } = this.props.navigation.state;
  try {
    const myToken = await AsyncStorage.getItem('@myStores:access_token');
      let response = await fetch(`https://pro.faktodeks.com//api/getTeklifler/${myToken}/${params.cek_id}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });

      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          this.setState({ teklifler: responseJson, refreshing:false })
        
      } else {
        console.log("Gelmedi")
        this.setState({ refreshing:false })

      }
  } catch (error) {
      console.error(error);
  }
}

async teklifKapat(cekid){
  try{
    let response = await fetch(`https://pro.faktodeks.com//api/teklifKapat`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cek_id : cekid,
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
        let responseJson = await response.json();
        this.tekliflerim()
    } else {
        this.setModalLoading(false);
      this.setState({ hata: '1'})
    }

  }
  catch(error){

  }
}
async teklifAc(cekid){
  try{
    let response = await fetch(`https://pro.faktodeks.com//api/teklifAc`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cek_id : cekid,
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
          this.tekliflerim()
    } else {
        this.setModalLoading(false);
      this.setState({ hata: '1'})
    }

  }
  catch(error){

  }
}

async teklifOnayla(teklif_id,cek_id){
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
       this.tekliflerim()
   } else {
       alert("hata")
     this.setState({ hata: '1'})
   }
 }
 catch(error){
 }
}
  render() {
    const { params } = this.props.navigation.state;
    return (

        
        <Container >
       
        <ImageBackground source={ require('../images/Background.png') }  style={{width: '100%', height: '100%'}}>
     
        <Menu yer="Teklifler"/>
        <Content style={{backgroundColor:'#fff'}}>
                    <FlatList
                    numColumns={1}
                    data={this.state.teklifler}
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
                  ListHeaderComponent={
                    this.state.teklifler == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20,padding:20 }} >
                          <Text style={{ fontSize: 16,textAlign:'center',color:'white' }} >{this.state.refreshing == false ? 'Henüz Teklif Yok' : null}  </Text>
                      </View> : null
                  }
                    renderItem={({ item }) => (
                      item.son_durum != 3 ?
                      <View>
                        {item.durum == 3 ? 
                            
                            <TouchableOpacity  style={{borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', width:WIDTH/1,height:HEIGHT/6, justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
                            <Row style={{backgroundColor:'#F7F7F7',padding:10,height:HEIGHT/20}}>
                                       
                                       <Col style={{flexDirection:'row'}}>
                                         <Text  style={{textAlign:'right',color:'#8E8D8D'}}>TEKLİF TARİHİ</Text>
                                       <Text style={{textAlign:'right',color:'black',fontWeight:'bold',paddingLeft:20}}>{item.eklenme}</Text>
                                       </Col>
                                     </Row>
                            <Row style={{backgroundColor:'#f5f5f5',padding:10,height:HEIGHT/8}}>
                             <Col>
                                 <Image
                                   style={{width:WIDTH/2.5,height:HEIGHT/15,resizeMode:'contain'   }}
                                   source={
                                     {uri : 'https://pro.faktodeks.com//faktoringler/'+item.logo}
                                     } 
                               />
                             </Col>
                             <Col style={{flexDirection:'column'}}>
                            
                                 <Text style={{fontSize:WIDTH/15,color:'black',fontWeight:'bold',textAlign:'right'}}>{item.fiyat} {item.para_birim}</Text>
                                 <View style={{backgroundColor:'#707070',width:WIDTH/2.5,
                            
                                  
                                    marginTop:10,
                                    marginLeft:10,
                                    padding:15}}>
                               <Text style={{fontSize:WIDTH/35,color:'#fff',fontWeight:'bold'}}>{this.state.toplam}ONAY BEKLİYOR   <Icon active name="arrow-forward" style={{color:'white',paddingLeft:10,fontSize:WIDTH/27}}/></Text>
                            </View>
                             </Col>
                            </Row>
                         
                            </TouchableOpacity>
                        :null }
                          {item.durum == 2 ? 
                          <TouchableOpacity  style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',paddingHorizontal:20,borderRadius:20,marginTop:20 }}>
                          <Row style={{backgroundColor:'#707070',borderTopLeftRadius:20,borderTopRightRadius:20,padding:10,width:'100%'}}>
                          
                          </Row>
                          <Row style={{backgroundColor:'#f5f5f5',padding:10}}>
                          <Col>
                              <Image
                                style={{width:WIDTH/2.5,height:HEIGHT/10,resizeMode:'contain'   }}
                                source={
                                  {uri : 'https://pro.faktodeks.com//faktoringler/'+item.logo}
                                  } 
                            />
                          </Col>
                          <Col style={{flexDirection:'column'}}>
                              <Text  style={{textAlign:'right'}}>TEKLİF TARİHİ</Text>
                          <Text style={{textAlign:'right',color:'black',fontWeight:'bold'}}>{item.eklenme}</Text>
                          </Col>
                          </Row>
                          <Row style={{backgroundColor:'#ffffffff',padding:10,
                          borderBottomRightRadius:10,
                          borderBottomLeftRadius:25,
                          paddingBottom:30
                          }}>
                          <Col style={{flexDirection:'column'}}>
                          <Text style={{fontSize:WIDTH/25,color:'black',fontWeight:'bold'}}>{item.fiyat} {item.para_birim}</Text>
                          </Col>
                          <Col style={{right:0,position:'absolute',backgroundColor:'#707070',width:WIDTH/2.5,
                          
                          borderBottomRightRadius:30,
                          zIndex:9999,
                          marginBottom:10,
                          borderTopLeftRadius:25,
                          marginTop:10,
                          padding:15}}>
                          <TouchableOpacity >
                            <Text style={{fontSize:17,color:'#fff',fontWeight:'bold'}}>{this.state.toplam} KABUL ET <Icon active name="arrow-forward" style={{color:'white',paddingLeft:10,fontSize:WIDTH/27}}/></Text>
                          </TouchableOpacity>
                          </Col>
                          </Row>
                          </TouchableOpacity>
                        :null}
                          {item.durum ==4 ? 
                          

                          <TouchableOpacity  style={{borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', width:WIDTH/1,height:HEIGHT/6, justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
                          <Row style={{backgroundColor:'#F7F7F7',padding:10,height:HEIGHT/20}}>
                                     
                                     <Col style={{flexDirection:'row'}}>
                                       <Text  style={{textAlign:'right',color:'#8E8D8D'}}>TEKLİF TARİHİ</Text>
                                     <Text style={{textAlign:'right',color:'black',fontWeight:'bold',paddingLeft:20}}>{item.eklenme}</Text>
                                     </Col>
                                   </Row>
                          <Row style={{backgroundColor:'#f5f5f5',padding:10,height:HEIGHT/8}}>
                           <Col>
                               <Image
                                 style={{width:WIDTH/2.5,height:HEIGHT/15,resizeMode:'contain'   }}
                                 source={
                                   {uri : 'https://pro.faktodeks.com//faktoringler/'+item.logo}
                                   } 
                             />
                           </Col>
                           <Col style={{flexDirection:'column'}}>
                          
                               <Text style={{fontSize:WIDTH/15,color:'black',fontWeight:'bold',textAlign:'right'}}>{item.fiyat} {item.para_birim}</Text>
                               <View style={{backgroundColor:'#f58787',width:WIDTH/2.5,
                          
                                  marginTop:10,
                                  marginLeft:10,
                                  padding:15}}>
                             <Text style={{fontSize:WIDTH/35,color:'#fff',fontWeight:'bold'}}>{this.state.toplam}ONAY BEKLİYOR   <Icon active name="arrow-forward" style={{color:'white',paddingLeft:10,fontSize:WIDTH/27}}/></Text>
                          </View>
                           </Col>
                          </Row>
                       
                          </TouchableOpacity>
                        :null }
                        {item.durum == 1 ? 
                          
                          <SwipeRow
                          style={{ height:HEIGHT/6, }}
                          rightOpenValue={-WIDTH/4}
                          body={
                              <View  style={{ borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', flexDirection:'column',justifyContent:'center',borderRightWidth:10,borderRightColor:'#FF8900',alignItems:'center', height:HEIGHT/6,width:WIDTH/1}}>   
                                <Row style={{backgroundColor:'#F7F7F7',padding:10}}>
                                   
                                      <Col style={{flexDirection:'row'}}>
                                        <Text  style={{textAlign:'right',color:'#8E8D8D'}}>TEKLİF TARİHİ</Text>
                                      <Text style={{textAlign:'right',color:'black',fontWeight:'bold',paddingLeft:20}}>{item.eklenme}</Text>
                                      </Col>
                                    </Row>
                                    <Row style={{backgroundColor:'#ffffffff',padding:10,
                                          borderBottomRightRadius:10,
                                          borderBottomLeftRadius:25,
                                          paddingBottom:30
                                          }}>
                                               <Col>
                                                    <Image
                                                      style={{width:WIDTH/2.5,height:HEIGHT/15,resizeMode:'contain'   }}
                                                      source={
                                                        {uri : 'https://pro.faktodeks.com//faktoringler/'+item.logo}
                                                        } 
                                                  />
                                                </Col>
                                            <Col style={{flexDirection:'column'}}>
                                          <Text style={{fontSize:WIDTH/15,color:'black',fontWeight:'bold'}}>{item.fiyat} {item.para_birim}</Text>
                                            </Col>
                                            
                                    </Row>
                           </View>
                          }
                          right={
                            <View style={{flexDirection:'row'}}>
                              <Button style={{ height:HEIGHT/6,backgroundColor:'#FF8900',flexDirection:'column',justifyContent:'center',alignItems :'center'}}
                               onPress={() => this.teklifOnayla(item.id,item.bekleyen_cek_id)}>
                               <Text style={{color:'white',textAlign:'center'}}>TEKLİF </Text>
                               <Text style={{color:'white',textAlign:'center'}}> ONAYLA</Text>
                            </Button>
                          
                            </View>
                            
                          }
                        />   :null }
                      </View>
                      :
                      <View>
                        {item.durum == 3 ? 
                        
                        <TouchableOpacity  style={{borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', width:WIDTH/1,height:HEIGHT/6, justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
                        <Row style={{backgroundColor:'#F7F7F7',padding:10,height:HEIGHT/20}}>
                                   
                                   <Col style={{flexDirection:'row'}}>
                                     <Text  style={{textAlign:'right',color:'#8E8D8D'}}>TEKLİF TARİHİ</Text>
                                   <Text style={{textAlign:'right',color:'black',fontWeight:'bold',paddingLeft:20}}>{item.eklenme}</Text>
                                   </Col>
                                 </Row>
                        <Row style={{backgroundColor:'#f5f5f5',padding:10,height:HEIGHT/8}}>
                         <Col>
                             <Image
                               style={{width:WIDTH/2.5,height:HEIGHT/15,resizeMode:'contain'   }}
                               source={
                                 {uri : 'https://pro.faktodeks.com//faktoringler/'+item.logo}
                                 } 
                           />
                         </Col>
                         <Col style={{flexDirection:'column'}}>
                        
                             <Text style={{fontSize:WIDTH/15,color:'black',fontWeight:'bold',textAlign:'right'}}>{item.fiyat} {item.para_birim}</Text>
                             <View style={{backgroundColor:'#707070',width:WIDTH/2.5,
                        
                                
                                marginTop:10,
                                marginLeft:10,
                                padding:15}}>
                           <Text style={{fontSize:WIDTH/35,color:'#fff',fontWeight:'bold'}}>{this.state.toplam}ONAY BEKLİYOR   <Icon active name="arrow-forward" style={{color:'white',paddingLeft:10,fontSize:WIDTH/27}}/></Text>
                        </View>
                         </Col>
                        </Row>
                     
                        </TouchableOpacity>
                        :null }
                          {item.durum == 2 ? 
                          <TouchableOpacity  style={{ justifyContent:'center',alignItems:'center',flexDirection:'column',paddingHorizontal:20,borderRadius:20,marginTop:20 }}>
                          <Row style={{backgroundColor:'#707070',borderTopLeftRadius:20,borderTopRightRadius:20,padding:10,width:'100%'}}>
                          
                          </Row>
                          <Row style={{backgroundColor:'#f5f5f5',padding:10}}>
                          <Col>
                              <Image
                                style={{width:WIDTH/2.5,height:HEIGHT/10,resizeMode:'contain'   }}
                                source={
                                  {uri : 'https://pro.faktodeks.com//faktoringler/'+item.logo}
                                  } 
                            />
                          </Col>
                          <Col style={{flexDirection:'column'}}>
                              <Text  style={{textAlign:'right'}}>TEKLİF TARİHİ</Text>
                          <Text style={{textAlign:'right',color:'black',fontWeight:'bold'}}>{item.eklenme}</Text>
                          </Col>
                          </Row>
                          <Row style={{backgroundColor:'#ffffffff',padding:10,
                          borderBottomRightRadius:10,
                          borderBottomLeftRadius:25,
                          paddingBottom:30
                          }}>
                          <Col style={{flexDirection:'column'}}>
                          <Text style={{fontSize:WIDTH/25,color:'black',fontWeight:'bold'}}>{item.fiyat} {item.para_birim}</Text>
                          </Col>
                          <Col style={{right:0,position:'absolute',backgroundColor:'#707070',width:WIDTH/2.5,
                          
                          borderBottomRightRadius:30,
                          zIndex:9999,
                          marginBottom:10,
                          borderTopLeftRadius:25,
                          marginTop:10,
                          padding:15}}>
                          <TouchableOpacity >
                            <Text style={{fontSize:17,color:'#fff',fontWeight:'bold'}}>{this.state.toplam} KABUL ET <Icon active name="arrow-forward" style={{color:'white',paddingLeft:10,fontSize:WIDTH/27}}/></Text>
                          </TouchableOpacity>
                          </Col>
                          </Row>
                          </TouchableOpacity>
                        :null }
                          {item.durum ==4 ? 
                     
                     <TouchableOpacity  style={{borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', width:WIDTH/1,height:HEIGHT/6, justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
                     <Row style={{backgroundColor:'#F7F7F7',padding:10,height:HEIGHT/18}}>
                                
                                <Col style={{flexDirection:'row'}}>
                                  <Text  style={{textAlign:'right',color:'#8E8D8D'}}>TEKLİF TARİHİ</Text>
                                <Text style={{textAlign:'right',color:'black',fontWeight:'bold',paddingLeft:20}}>{item.eklenme}</Text>
                                </Col>
                              </Row>
                     <Row style={{backgroundColor:'#f5f5f5',padding:10,height:HEIGHT/8}}>
                      <Col>
                          <Image
                            style={{width:WIDTH/2.5,height:HEIGHT/15,resizeMode:'contain'   }}
                            source={
                              {uri : 'https://pro.faktodeks.com//faktoringler/'+item.logo}
                              } 
                        />
                      </Col>
                      <Col style={{flexDirection:'column'}}>
                     
                          <Text style={{fontSize:WIDTH/15,color:'black',fontWeight:'bold',textAlign:'right'}}>{item.fiyat} {item.para_birim}</Text>
                          <View style={{backgroundColor:'#f58787',width:WIDTH/2.5,
                     
                             marginTop:5,
                             marginLeft:5,
                             padding:15}}>
                        <Text style={{fontSize:WIDTH/35,color:'#fff',fontWeight:'bold'}}>{this.state.toplam}ONAY BEKLİYOR   <Icon active name="arrow-forward" style={{color:'white',paddingLeft:10,fontSize:WIDTH/27}}/></Text>
                     </View>
                      </Col>
                     </Row>
                  
                     </TouchableOpacity>

                        :null  }
                        {item.durum == 1 ? 
                   
                   <SwipeRow
                   style={{ height:HEIGHT/6, }}
                   rightOpenValue={-WIDTH/4}
                   body={
                       <View  style={{ borderBottomWidth:0.5,borderBottomColor:'#D1D1D1', flexDirection:'column',justifyContent:'center',borderRightWidth:10,borderRightColor:'#FF8900',alignItems:'center', height:HEIGHT/6,width:WIDTH/1}}>   
                         <Row style={{backgroundColor:'#F7F7F7',padding:10}}>
                            
                               <Col style={{flexDirection:'row'}}>
                                 <Text  style={{textAlign:'right',color:'#8E8D8D'}}>TEKLİF TARİHİ</Text>
                               <Text style={{textAlign:'right',color:'black',fontWeight:'bold',paddingLeft:20}}>{item.eklenme}</Text>
                               </Col>
                             </Row>
                             <Row style={{backgroundColor:'#ffffffff',padding:10,
                                   borderBottomRightRadius:10,
                                   borderBottomLeftRadius:25,
                                   paddingBottom:30
                                   }}>
                                        <Col>
                                             <Image
                                               style={{width:WIDTH/2.5,height:HEIGHT/15,resizeMode:'contain'   }}
                                               source={
                                                 {uri : 'https://pro.faktodeks.com//faktoringler/'+item.logo}
                                                 } 
                                           />
                                         </Col>
                                     <Col style={{flexDirection:'column'}}>
                                   <Text style={{fontSize:WIDTH/15,color:'black',fontWeight:'bold'}}>{item.fiyat} {item.para_birim}</Text>
                                     </Col>
                                     
                             </Row>
                    </View>
                   }
                   right={
                     <View style={{flexDirection:'row'}}>
                       <Button style={{ height:HEIGHT/6,backgroundColor:'#FF8900',flexDirection:'column',justifyContent:'center',alignItems :'center'}}
                        onPress={() => this.teklifOnayla(item.id,item.bekleyen_cek_id)}>
                        <Text style={{color:'white',textAlign:'center'}}>TEKLİF </Text>
                        <Text style={{color:'white',textAlign:'center'}}> ONAYLA</Text>
                     </Button>
                   
                     </View>
                     
                   }
                 />
                   :null }
                      </View>
                 )} /> 
        </Content>
              
         
    
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(teklifler);
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