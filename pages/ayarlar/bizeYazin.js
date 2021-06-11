import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  
    Stack,
    View,
    Dimensions,
    StyleSheet,Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Modal,
    ScrollView,Keyboard,
ActivityIndicator,
    KeyboardAvoidingView,
    Text,
    FlatList,
    RefreshControl,
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import { Container, Grid, Button,Form, Header,Col,Row, Left, Body,Icon,Textarea, Right, Content,Item,Input,Picker, Label,List,ListItem, Title } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import {
  TextInputMask
} from 'react-native-masked-text';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class bizeYazin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          konu:'',
        mesaj:''
        }
      }
async bizeYazin(){
  if(this.state.konu == '' ||  this.state.aciklama == '' ){
      Alert.alert(
          '',
           'Tüm Alanları Eksiksiz Doldurunuz.',
          [
              { text: 'Anladım' },
          ],
          { cancelable: false },
      );
    }
      else{
        try{
          const myToken = await AsyncStorage.getItem('@myStores:access_token');
          let response = await fetch(`https://pro.faktodeks.com//api/bizeYazin`, {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  konu: this.state.konu,
                  aciklama: this.state.aciklama,
                  token:myToken,
              }),
          });
          console.log(response);
          if (response.status == '200' || response.status == '201') {
              let responseJson = await response.json();
              this.props.navigation.navigate('Taleplerim')
              Alert.alert(
                '',
                'Mesajınız Bize Ulaştı',
                [
                    {
                        text: 'OK', onPress: () => this.props.navigation.navigate('Anasayfa')
  
                    }
  
                ],
                { cancelable: false },
            );
              
          } else if(response.status == '404'){
            this.setModalSifre(true);
          }else{
            alert("Bir hata oluştu. Bir süre bekleyip tekrar")
          }
        }
        catch(error){
        }
    }
} 
  render() {
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
          <Menu yer='Bize Yazın' />
          <Content style={{backgroundColor:'#F5F5F5'}} >
                  <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,height:70,flexDirection:'column',marginTop:30}}>
                            <Text style={{fontSize:18,color:'#042264',textAlign:'center'}}>Görüş ve önerilerinizi bize yazın.</Text>
                  </Row>
                  
                    <View  style={{paddingHorizontal:20,marginTop:30}}>   
                    <Item inlineLabel style={styles.item}>
                        <Label style={{color:'#042264'}}>Konu :</Label>
                        <Input 
                        style={{color:'#042264'}}
                          value = {
                            this.state.konu
                              }
                          onChangeText = {(value) => this.setState({konu: value})}
                        />
                      </Item>
                      <Textarea style={styles.item} rowSpan={10}
                      value = {
                        this.state.aciklama
                          }
                        
                      onChangeText = {(value) => this.setState({aciklama: value})}
                      bordered placeholder="Mesajınız"
                      placeholderTextColor="#042264" />
       
                        </View>
                        <Row style={{ justifyContent:'center' ,marginTop:15,paddingHorizontal:20 }}>
                                  <Button block transparent onPress={this.bizeYazin.bind(this)} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                                    <Text style={{color:'#011153'}}>GÖNDER</Text>
                                  </Button>
                                   
                            </Row>
                        
                </Content>
               
              
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(bizeYazin);
const styles = StyleSheet.create({
  item:{
    width:'100%', 
    backgroundColor:'#fff',
    borderRadius:10,
    borderColor:'#fff',
    borderWidth:1,
    marginTop:20
},
  main: {
     backgroundColor: 'rgba(0,0,0,0.9)',
     width: WIDTH/1,
     height: HEIGHT/1,
     alignItems: 'center',
     justifyContent:'center',
     flex: 0,
     marginLeft: 'auto',
     marginRight: 'auto',
     marginBottom: 'auto'
  
  },
});