import React, { Component } from 'react';
import {
    Platform,
  
    Stack,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Image,
    FlatList,
    ActivityIndicator,
    Text,
    Alert,
    StatusBar,
    Switch,
    ImageBackground,
    SafeAreaView,
    BackHandler,
    RefreshControl
  } from 'react-native';
  import { Container,  Button, Header,Col,Row, Item,Input, Content, Grid, Right, Left } from 'native-base';
  import Altbar from '../inc/footer';
  import {
    BarChart,
  } from 'react-native-chart-kit'
  import Menu from '../inc/header';
import { values } from 'mobx';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default class lehtar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vkn :''
        }
  }

  render() {
    const { params } = this.props.navigation.state;
    const barData = {
        labels: params.month,
        datasets: [
          {
            data:params.price,
            vkn:this.state.vkn
            
          },
        ],
      };
      var sss = params.score
      console.log('asdasdasasd')
      console.log(sss)
      console.log('deneden dene')
    
    return (

        
        <Container style={{backgroundColor:'#f5f5f5'}} >
       
       
            <Menu  yer='Deks' bildirim='a' borderNo='a'/>
            <Content style={{backgroundColor:'#f5f5f5'}}>
                <Row style={[styles.center,{ height:HEIGHT/5,flexDirection:'column',paddingHorizontal:20,backgroundColor:'white'}]}>
                <View style={[{flexDirection:'row'},styles.mt20]}>
                   <View style={{flex:1}}>
                    {/* <Text style={{color:'#707070',fontWeight:'300'}}>GÜNCELLENME TARİHİ</Text> */}
                   </View>
                   <View style={{flex:1}}>
                    {/* <Text style={{textAlign:'right',color:'#707070',fontWeight:'700'}}>{params.son_tarih}</Text> */}
                   </View>
                 </View>
                 <View style={[{flexDirection:'row',top:25},styles.mt20]}>
                   <View style={{flex:1}}>
                    <Text style={{color:'#707070',fontWeight:'900',marginTop:25}}>Lehtar Skoring</Text>
                   </View>
                   <View style={{flex:1}}>
                       
                    <Text style={{textAlign:'right',color:'#707070',fontWeight:'700',fontSize:WIDTH/10}}>{params.score+1000}</Text>
                   </View>
                 </View>

                 <View style={{top:30}} > 
                    
                  <Image source={require('../assets/gradient.png')} style={{resizeMode:'contain',width:320,}} />

                  <Image source={require('../assets/Vscroll.png')} style={{resizeMode:'contain',height:40,top:-40,width:WIDTH/22,left:320*params.score/100}} />
                  </View>



                 
                  <View style={{flex:1,marginTop:10,marginBottom:110}}>

                            { params.score < 25 ? <Text style={{color:'#707070',fontWeight:'300',fontSize:12}}>{sss}-VKN Numaralı LEHTAR’ın DEKS bünyesinde bulunan finans kurumları tarafından  {params.son_tarih} tarihine
                     kadar yapılan Piyasa Analizinde Çek Finansmanına uygunluğu <Text style={{color:'red'}}>RİSKLİ</Text> görülmüştür.</Text> : null }


                           { params.score > 25  && params.score < 49 ?<Text style={{color:'#707070',fontWeight:'300',fontSize:12}}>{}-VKN Numaralı LEHTAR’ın DEKS bünyesinde bulunan finans kurumları tarafından  {params.son_tarih} tarihine
                     kadar yapılan Piyasa Analizinde Çek Finansmanına uygunluğu <Text style={{color:'orange'}}>ORTA RİSKLİ</Text> görülmüştür.</Text> : null }  

                     { params.score > 49  && params.score < 69 ?<Text style={{color:'#707070',fontWeight:'300',fontSize:12}}>{}-VKN Numaralı LEHTAR’ın DEKS bünyesinde bulunan finans kurumları tarafından  {params.son_tarih} tarihine
                     kadar yapılan Piyasa Analizinde Çek Finansmanına uygunluğu <Text style={{color:'yellow'}}>AZ RİSKLİ</Text> görülmüştür.</Text> : null }                                        
                      
                     { params.score > 69  && params.score < 100 ?<Text style={{color:'#707070',fontWeight:'300',fontSize:12}}>{}-VKN Numaralı LEHTAR’ın DEKS bünyesinde bulunan finans kurumları tarafından  {params.son_tarih} tarihine
                     kadar yapılan Piyasa Analizinde Çek Finansmanına uygunluğu <Text style={{color:'green'}}>RİSKSİZ</Text> görülmüştür.</Text> : null } 


                     


                    {/* <Text style={{color:'#707070',fontWeight:'300',fontSize:12}}>{}-VKN Numaralı LEHTAR’ın DEKS bünyesinde bulunan finans kurumları tarafından  {params.son_tarih} tarihine
                     kadar yapılan Piyasa Analizinde Çek Finansmanına uygunluğu <Text style={{color:'red'}}>RİSKLİ</Text> görülmüştür.</Text> */}


                   </View>

               

                </Row>

               
                <Row style={[styles.center,styles.mt20,{marginTop:60, flexDirection:'column',paddingHorizontal:20,backgroundColor:'white'}]}>
                     <BarChart
                            data={barData}
                            width={WIDTH}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#ff7a00',
                                backgroundGradientFrom: '#f5f5f5',
                                backgroundGradientTo: '#f5f5f5',
                              
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `#ff7a00`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                  borderRadius: 16,
                                  paddingLeft:20
                                },
                                fillShadowGradient: '#ff7a00', // THIS
                                fillShadowGradientOpacity: 1, // THIS
                              }}
                          
                        />
                       <View style={[styles.box]}>
                            <View style={styles.bgWhite}>
                                <Text style={styles.p10}>Talep Edilmiş Çek Adeti</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={styles.p10}>{params.toplam_talep}</Text>
                            </View>
                            <View style={styles.bgWhite}>
                                <Text style={styles.p10}>Talep Edilmiş Çek Tutar Ortalaması</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={styles.p10}>{params.talep_tutar_ort} TL</Text>
                        </View>
                    </View>
                </Row>

















                <Row>

                <View style={styles.subBox}>
                            <View style={styles.bgWhite}>
                                <Text style={styles.p10}>İşlem Görmüş Çek Adedi</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={styles.p10}>{params.toplam_teklif}</Text>
                            </View>
                            <View style={styles.bgWhite}>
                                <Text style={styles.p10}>İşleme Alınmış Son Çek Tarihi</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={styles.p10}>{params.son_tarih}</Text>
                            </View>
                            <View style={styles.bgWhite}>
                                <Text style={styles.p10}>İşleme Alınmış Son Çek Tutarı</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={styles.p10}>{params.son_tutar} TL</Text>
                            </View>
                            <View style={styles.bgWhite}>
                                <Text style={styles.p10}>İşleme Talep Eden Müşteri Sayısı</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={styles.p10}>{params.toplam_talep}</Text>
                            </View>
                        </View>
             
                </Row>
                
            </Content>   
    <Altbar anasayfa='a' ileriQR=''/>          
          
    </Container>

       );

}
}
const styles = StyleSheet.create({
    p10:{
        padding:10
    },
    bgBlack:{
        backgroundColor:'#f7f7f7',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    bgWhite:{
        backgroundColor:'#fff',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        marginBottom:20,
        marginTop:20,
        shadowColor: "#000",
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        width:'100%',
        borderRadius:20
    },
    subBox:{
        marginBottom:20,
        width:'100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
      },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    mt20:{
        marginTop:20
    },
    textColor:{
        color:'#042264',
        textAlign:'center',
        fontSize:WIDTH/27
    },
    item:{
        width:'100%', 
        backgroundColor:'#fff',
        borderRadius:10,
        borderColor:'transparent',
        borderWidth:1,
        marginTop:20
    },
});