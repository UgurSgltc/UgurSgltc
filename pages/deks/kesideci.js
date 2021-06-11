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
  import { Container,  Button, Header,Col,Row, Item,Input, Content, Grid, Right } from 'native-base';
  import Altbar from '../inc/footer';
  import {
    BarChart,
  } from 'react-native-chart-kit'
  import Menu from '../inc/header';
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
          },
        ],
      };
    return (

        
        <Container style={{backgroundColor:'#f5f5f5'}} >
       
     
            <Menu  yer='Deks' bildirim='a' borderNo='a'/>
            <Content style={{backgroundColor:'#fff'}}>
                <Row style={[styles.center,{ height:HEIGHT/5,flexDirection:'column',paddingHorizontal:20,backgroundColor:'white'}]}>
                <View style={[{flexDirection:'row'},styles.mt20]}>
                   {/* <View style={{flex:1}}>
                    <Text style={{color:'#707070',fontWeight:'300'}}>GÜNCELLENME TARİHİ</Text>
                   </View>
                   <View style={{flex:1}}>
                        <Text style={{textAlign:'right',color:'#707070',fontWeight:'700'}}>{params.son_tarih}</Text>
                   </View> */}
                 </View>
                 <View style={[{flexDirection:'row'},styles.mt20]}>
                   <View style={{flex:1}}>
                    <Text style={{color:'#707070',fontWeight:'900'}}>Keşideci Skoring</Text>
                   </View>
                   <View style={{flex:1}}>
                    <Text
                    
                    style={{ textAlign:'right',color:'#707070',fontWeight:'700',fontSize:WIDTH/20}}>{params.score+1000}</Text>
                   </View>
                 </View>
                  <Image source={require('../assets/gradient.png')} style={{resizeMode:'contain',width:WIDTH/1,marginTop:20}} />
              
               
                 
                  <View style={{flex:1,marginTop:10,marginBottom:110}}>

                            { params.score < 25 ? <Text style={{color:'#707070',fontWeight:'300',fontSize:12}}>{}-VKN Numaralı LEHTAR’ın DEKS bünyesinde bulunan finans kurumları tarafından  {params.son_tarih} tarihine
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
                <Row style={[styles.center,styles.mt20,{flexDirection:'column',backgroundColor:'white'}]}>
                       <View style={[styles.subBox]}>
                            <View style={styles.bgWhite}>
                                <Text style={[styles.p10,styles.key]}>Vadesi Gelmemiş Çek Adedi</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={[styles.p10,styles.value]}>{params.toplam_talep}</Text>
                            </View>
                            <View style={styles.bgWhite}>
                                <Text style={[styles.p10,styles.key]}>Vadesi Gelmemiş Çek Tutar Ortalaması </Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={[styles.p10,styles.value]}>{params.talep_tutar_ort} TL</Text>
                            </View>
                            <View style={styles.bgWhite}>
                                <Text style={styles.p10}></Text>
                            </View>

                         
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
                            <View style={styles.bgWhite}>
                                <Text style={[styles.p10,styles.key]}>Çalıştığı Banka Sayısı</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={[styles.p10,styles.value]}>{params.bankTotal}</Text>
                            </View>
                            <View style={styles.bgWhite}>
                                <Text style={[styles.p10,styles.key]}>Çalıştığı Bankalar </Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={[styles.p10,styles.value]}>{params.bankList}</Text>
                            </View>
                    </View>
                </Row>
                <Row style={[styles.center,{flexDirection:'column',paddingHorizontal:20,backgroundColor:'white'}]}>
                       <View style={[styles.box]}>
                            <View style={styles.bgWhite}>
                                <Text style={[styles.p10,styles.key]}>Talep Edilmiş Çek Adeti</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={[styles.p10,styles.value]}>{params.toplam_talep}</Text>
                            </View>
                            <View style={styles.bgWhite}>
                                <Text style={[styles.p10,styles.key]}>Talep Edilmiş Çek Tutar Ortalaması</Text>
                            </View>
                            <View style={styles.bgBlack}>
                                <Text style={[styles.p10,styles.value]}>{params.talep_tutar_ort} TL</Text>
                        </View>
                    </View>
                </Row>
                <Row style={[styles.center,{flexDirection:'column',backgroundColor:'white'}]}>
                       <View style={[styles.subBox]}>
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
                                <Text style={styles.p10}>İşleme Talep Eden Müşteri Sayısı </Text>
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
    key:{
        color:'#707070',
        fontWeight:'300'
    },
    value:{
        color:'#707070',
        fontWeight:'700'
    },
    p10:{
        padding:5,
        textAlign:'center'
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
        width:'100%',
        backgroundColor:'white'
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