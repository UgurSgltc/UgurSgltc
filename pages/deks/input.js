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
  import { Container,  Button, Header,Col,Row, Item,Input, Content, Grid } from 'native-base';
 
  import Menu from '../inc/header';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
import { Avatar } from 'react-native-elements';

export default class input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vkn :''
        }
  }
  async addNewDeks() {
      if(this.state.vkn == '' ){
        Alert.alert(
            '',
            'Lütfen Vkn giriniz!',
            [
                {
                    text: 'OK', onPress: () => console.log('presed')

                }

            ],
            { cancelable: false },
        );
        return false;
      }
    try {
        //  let response = await fetch(`https://pro.faktodeks.com/api/get/deks/data`, {
              let response = await fetch(`https://pro.faktodeks.com/api/deks/resultData`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vkn: this.state.vkn,
                            }),
        });
        
        let responseJson = await response.json();
        if (response.status == '200' || response.status == '201') {
            if(responseJson.status == 1){
                this.props.navigation.navigate('Lehtar',{toplam_talep:responseJson.toplam_talep,talep_tutar_ort:responseJson.talep_tutar_ort,vkn:responseJson.vkn,
                    son_tutar:responseJson.son_tutar,   son_tarih:responseJson.son_tarih, toplam_teklif:responseJson.toplam_teklif,score:responseJson.data[0].score,
                    month:responseJson.month,price:responseJson.price
                });
            }else{
                this.props.navigation.navigate('Kesideci',
               { toplam_talep:responseJson.toplam_talep,talep_tutar_ort:responseJson.talep_tutar_ort, vkn:responseJson.vkn,
                    son_tutar:responseJson.son_tutar,   son_tarih:responseJson.son_tarih, toplam_teklif:responseJson.toplam_teklif,score:responseJson.data[0].score
                    , bankList:responseJson.bankList, bankTotal:responseJson.bankTotal,month:responseJson.month,price:responseJson.price
                }
                )
            }
        } else {
            console.log(response.status)
            console.log('deneme')
            Alert.alert(
                '',
                responseJson.message,
                [
                    {
                        text: 'OKK', onPress: () => console.log('presed')
             
                    }
  
                ],
                { cancelable: false },
            );
        }
    } catch (error) {
        console.error(error);
    }
  }
  render() {
    return (

        
        <Container style={{backgroundColor:'#f5f5f5'}} >
       
     
            <Menu  yer='Deks' bildirim='a' borderNo='a'/>
            <Content style={{backgroundColor:'#f5f5f5'}}>
                <Row style={[styles.center,{ height:HEIGHT/3,flexDirection:'column'}]}>
                    <View >
                        <Text style={[styles.textColor,{color:'#042264',fontSize:WIDTH/25,fontWeight:'bold'}]}> TEK TIKLA FİNANSAL ANALİZ</Text>
                    </View>
                    <View style={[styles.center,styles.mt20,{flexDirection:'column'}]}>
                        <Text style={styles.textColor}> DEKS, finansal bilgilerin kontrol ve analiz edilmesi için</Text>
                        <Text style={styles.textColor}> tek ekran üzerinden erişim sağlanan bir hizmettir.</Text>
                        <View style={styles.mt20}>
                            <Text style={[styles.textColor]}>Gelişmiş bir algoritma üzerinden</Text>
                            <Text style={[styles.textColor]}> hesaplama yaparak çalışan</Text>
                            <Text style={[styles.textColor]}> DEKS, tüm finansal değişkenlerden etkilenerek</Text>
                            <Text style={[styles.textColor]}>  gerçeğe yakın sonuçlar çıkarır.</Text>
                        </View>
                    </View>
                </Row>
                <Row style={[styles.center,styles.mt20,{flexDirection:'column',paddingHorizontal:20}]}>
                    <Text style={styles.textColor}>Lütfen aramak istediğiniz <Text style={[styles.textColor,{fontWeight:'bold'}]}>TCKN/VKN</Text>'yi girin</Text>
                    <Item style={[styles.item,styles.mt20]}>
                        <Input 
                         maxLength={11}
                        keyboardType='numeric'
                        returnKeyType='done'
                         value = {
                            this.state.vkn
                        }
                        placeholderTextColor='#042264'
                        style={{color:'#042264'}}
                        onChangeText={(value) => {this.setState({vkn:value})}}
                        />
                    </Item>
                </Row>
                
            </Content>   
            <View style={[styles.center,{paddingHorizontal:20,marginBottom:40}]}>
                    <TouchableOpacity onPress={() => this.addNewDeks()} style={[styles.center,{backgroundColor:'#00fff5',width:'100%',height:HEIGHT/20,borderRadius:10}]}>
                                <Text style={styles.textColor}>
                                    SORGULA
                                </Text>
                    </TouchableOpacity>
                </View> 
    </Container>
       );

}
}
const styles = StyleSheet.create({
  
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