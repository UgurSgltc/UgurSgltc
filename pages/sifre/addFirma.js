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
  import { Container,  Button, Header,Col,Row, Left, Body,Icon,Grid, Right, Content,Item,Input,Picker, Label,List,ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import { Checkbox } from 'react-native-paper';
import {
  TextInputMask
} from 'react-native-masked-text';
import {   TextInput } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';

import KVKKSozlesme from '../sozlesme/kvkk';
import FaktodeksSozlesme from '../sozlesme/faktodeks';
import IconAnt from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class addFirma extends Component {
    constructor(props) {
        super(props);
        this.state = {
          iller:[],
          ilName:'',
          ilceler:[],
          ilceName:'',
          semtler:[],
          semtName:'',
          sektor : '',
          firma_vkn : '',
          firma_unvan : '',
          vergi_dairesi :'',
          firma_tel : '',
          email : '',
          hataEmail:0,
          hataTckn:0,
          website : '',
          il : '',
          ilce : '',
          semt : '',
          cadde : '',
          kapi_no : '',
          daire_no : '',
          yetkili_tckn : '',
          yetkili_ad : '',
          yetkili_tel : '',
          yetkili_mail : '',
          yetkili_unvan : '',
          modalLoading:false,
          modalSuccess:false,
          modalIller:false,
          modalVisible2:false,
          modalVisible:false,
          modalIlceler:false,
          modalSemtler:false,
        }
         
      }
      
setModalVisible(visible) {
  this.setState({modalVisible: visible});
  }
setModalVisible2(visible) {
this.setState({modalVisible2: visible});
}
setModalLoading(visible) {
    this.setState({modalLoading: visible});
    }
setModalSuccess(visible) {
    this.setState({modalSuccess: visible});
    }
 componentDidMount() {
  const { navigation } = this.props;
  navigation.addListener('willFocus', () => {
    this.checkToken()
    this.iller()
      });
}
checkToken = async () =>{
  this.setModalLoading(true);
  const { params } = this.props.navigation.state;
  if (params.token) {
    try {
      let response = await fetch(`https://pro.faktodeks.com//api/getFirma/${params.token}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      });
      if (response.status == '200' || response.status == '201') {
        let responseJson = await response.json();
        console.log('ham veri: ', responseJson);
        this.setModalLoading(false);
        if(responseJson[0] != null){
          this.setState({
              sektor : responseJson[0].sektor,
              firma_vkn : responseJson[0].firma_vkn,
              firma_unvan : responseJson[0].firma_unvan,
              vergi_dairesi : responseJson[0].vergi_dairesi,
              firma_tel : responseJson[0].firma_tel,
              email : responseJson[0].email,
              website : responseJson[0].website,
              ilName : responseJson[0].il,
              ilceName : responseJson[0].ilce,
              semtName : responseJson[0].semt,
              cadde : responseJson[0].cadde,
              kapi_no : responseJson[0].kapi_no,
              daire_no : responseJson[0].daire_no,
              yetkili_tckn : responseJson[0].yetkili_tckn,
              yetkili_ad : responseJson[0].yetkili_ad,
              yetkili_tel : responseJson[0].yetkili_tel,
              yetkili_mail : responseJson[0].yetkili_mail,
              yetkili_unvan : responseJson[0].yetkili_unvan,
          })
        }else{
         
        }
      } else {
        alert("olmad??")
      }
  } catch (error) {
      console.error(error);
  }
  } else {
  }
}  

async tcKontrol(tcKontrol) {
  const tcno = String(tcKontrol);
  if (tcno.substring(0, 1) === '0') {
      console.log(tcKontrol)
      console.log("Tckn not correct");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 1})
  }else{
      
      console.log("Tckn do??ru");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 0})
      }
  if (tcno.length !== 11) {
      console.log("Tckn not correct");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 1})
  }else{
      
      console.log("Tckn do??ru");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 0})
      }
  var ilkon_array = tcno.substr(0, 10).split('');
  var ilkon_total = hane_tek = hane_cift = 0;

  for (var i = j = 0; i < 9; ++i) {
    j = parseInt(ilkon_array[i], 10);
    if (i & 1) { // tek ise, tcnin ??ift haneleri toplanmal??!
        hane_cift  += j;
    } else {
        hane_tek += j;
    }
    ilkon_total += j;
  }

  if ( (hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno.substr(-2, 1), 10)) {
      console.log("Tckn not correct");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 1})
  }else{
      
      console.log("Tckn do??ru");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 0})
      }

  ilkon_total += parseInt(ilkon_array[9], 10); 
  if (ilkon_total % 10 !== parseInt(tcno.substr(-1), 10)) {
      console.log("Tckn not correct");
      this.setState({yetkili_tckn:tcKontrol,hataTckn : 1})
  }else{
      
  console.log("Tckn do??ru");
  this.setState({yetkili_tckn:tcKontrol,hataTckn : 0})
  }

  }
  
async insertFirma(){
if(this.state.sektor == ''||  this.state.firma_vkn == ''  || this.state.firma_unvan == ''  || this.state.vergi_dairesi == ''  || this.state.firma_tel == ''
|| this.state.email == ''|| this.state.ilName == ''|| this.state.ilceName == ''|| this.state.semtName == ''|| this.state.cadde == ''|| this.state.kapi_no == ''
){
      Alert.alert(
          '',
           'T??m Alanlar?? Eksiksiz Doldurunuz.',
          [
              { text: 'Anlad??m' },
          ],
          { cancelable: false },
      );
    } 
    else if(this.state.hataTckn == 1){
      this.setModalLoading(false);
      Alert.alert(
          '',
             'Tckn yanl????',
          [
              { text: 'OK' },
          ],
          { cancelable: false },
      );
    }
    else if(this.state.hataEmail == 1){
      this.setModalLoading(false);
      Alert.alert(
          '',
             'Email Adres yanl????',
          [
              { text: 'OK' },
          ],
          { cancelable: false },
      );
    }
    else if(this.state.firma_vkn.length < 10 ){
      Alert.alert(
        '',
         'VKN numaran??z??n en az karakter say??s?? 10 olmal??d??r.',
        [
            { text: 'Anlad??m' },
        ],
        { cancelable: false },
    );
    }
    else{
        try{
          this.setModalLoading(true);
          const { params } = this.props.navigation.state;
           const token = params.token;
          let response = await fetch(`https://pro.faktodeks.com//api/insertFirma`, {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                token:token,
                sektor : this.state.sektor,
                firma_vkn : this.state.firma_vkn,
                firma_unvan : this.state.firma_unvan,
                vergi_dairesi : this.state.vergi_dairesi,
                firma_tel : this.state.firma_tel,
                email : this.state.email,
                website : this.state.website,
                il : this.state.ilName,
                ilce : this.state.ilceName,
                semt : this.state.semtName,
                cadde : this.state.cadde,
                kapi_no : this.state.kapi_no,
                daire_no : this.state.daire_no,
                yetkili_tckn : this.state.yetkili_tckn,
                yetkili_ad : this.state.yetkili_ad,
                yetkili_tel : this.state.yetkili_tel,
                yetkili_mail : this.state.yetkili_mail,
                yetkili_unvan : this.state.yetkili_unvan,
              }),
          });
          if (response.status == '200' || response.status == '201') {
              this.setModalLoading(false);
              let responseJson = await response.json();
              await AsyncStorage.setItem('@myStores:access_token', params.token);
              this.props.navigation.navigate('Anasayfa');
          } else {
              this.setModalLoading(false);
            this.setState({ hata: '1'})
          }

        }
        catch(error){

        }
    }
} 

setmodalIller(visible) {
  this.setState({modalIller: visible});
  }
  setmodalIlceler(visible) {
    this.setState({modalIlceler: visible});
    }

    setmodalSemtler(visible) {
      this.setState({modalSemtler: visible});
      }
async iller() {
  try {
      let response = await fetch(`https://pro.faktodeks.com//api/iller`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });
      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          const arrayObje = [];
          console.log('ham veri: ', responseJson);
        
          this.setState({ iller: responseJson, reflesh: false });
      } else {
          Alert.alert(
              '',
              'bankalar ??u anda g??sterilemiyor',
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

async ilAra(name) {
  this.setState({ilName:name})
  if(this.state.ilName != ''){
  try {
      let response = await fetch(`https://pro.faktodeks.com//api/ilAra/${name}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });
      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          const arrayObje = [];
          console.log('ham veri: ', responseJson);
          this.setState({ iller: responseJson, reflesh: false });
      } else {
      }
  } catch (error) {
      console.error(error);
  }
}
}
async ilceler(il_id) {
  try {
      let response = await fetch(`https://pro.faktodeks.com//api/ilceler/${il_id}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });
      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          const arrayObje = [];
          console.log('ham veri: ', responseJson);
        
          this.setState({ ilceler: responseJson, reflesh: false });
      } else {
          Alert.alert(
              '',
              'bankalar ??u anda g??sterilemiyor',
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
async ilceAra(name) {
  this.setState({ilceName:name})
  if(this.state.ilceName != ''){
  try {
      let response = await fetch(`https://pro.faktodeks.com//api/ilceAra/${name}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });
      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          const arrayObje = [];
          console.log('ham veri: ', responseJson);
          this.setState({ ilceler: responseJson, reflesh: false });
      } else {
      }
  } catch (error) {
      console.error(error);
  }
}
}
async semtler(ilce_id) {
  try {
      let response = await fetch(`https://pro.faktodeks.com//api/semtler/${ilce_id}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });
      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          const arrayObje = [];
          console.log('ham veri: ', responseJson);
        
          this.setState({ semtler: responseJson, reflesh: false });
      } else {
          Alert.alert(
              '',
              'bankalar ??u anda g??sterilemiyor',
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
async semtAra(name) {
  this.setState({semtName:name})
  if(this.state.semtName != ''){
  try {
      let response = await fetch(`https://pro.faktodeks.com//api/semtAra/${name}`, {
          method: 'get',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          }
      });
      if (response.status == '200' || response.status == '201') {
          let responseJson = await response.json();
          const arrayObje = [];
          console.log('ham veri: ', responseJson);
          this.setState({ semtler: responseJson, reflesh: false });
      } else {
      }
  } catch (error) {
      console.error(error);
  }
}
}
validate = (text) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(reg.test(text) === false)
  {
  console.log("Email is Not Correct");
  this.setState({email:text,hataEmail : 1})
  return false;
    }
  else {
      this.setState({email:text,hataEmail : 0})
      console.log("Email is Correct");
      }
  }
  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior="padding">
        <Container >
              <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
                <Menu />
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  
                  <Content style={{padding:20,height:HEIGHT/1.5,backgroundColor:'#f3f3f3'}}>
                      <FaktodeksSozlesme name={this.state.name} tckn={this.state.tckn} tel={this.state.tel} email={this.state.email}/>
                      <Row style={{ justifyContent:'center'  }}>
                          <TouchableOpacity   onPress={() => { this.setState({ fakto: true ,modalVisible:false}); }}>
                        <Image
                                style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                                source={require('../images/kaydet.png')} 
                            />
                            </TouchableOpacity>
                        </Row>
                      <Row style={{height:50}}>

                      </Row>
                    </Content>
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible2}
                  onRequestClose={() => {
                    this.setModalVisible2(!this.state.modalVisible2);
                  }}>
                  
                  <Content style={{padding:20,height:HEIGHT/1.5,backgroundColor:'#f3f3f3'}}>
                      <KVKKSozlesme  name={this.state.name} tckn={this.state.tckn} tel={this.state.tel} email={this.state.email}/>
                      <Row style={{ justifyContent:'center'  }}>
                          <TouchableOpacity   onPress={() => { this.setState({ kvkk: true,modalVisible2:false }); }}>
                                <Image
                                        style={{width:WIDTH/2,resizeMode:'contain', padding:20}}
                                        source={require('../images/kaydet.png')} 
                                    />
                            </TouchableOpacity>
                        </Row>
                      <Row style={{height:50}}>

                      </Row>
                    </Content>
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalIller}
                  onRequestClose={() => {
                    this.setmodalIller(!this.state.modalIller);
                  }}>
                    <Header androidStatusBarColor='#8E8D8D' style={{backgroundColor:'#F9F9F9',borderBottomColor:'#a0a0a0',borderBottomWidth:0.7}}>
                        <Body>
                          <Text style={{color:'#4a4a4a'}}>??l Se??iniz </Text>
                        </Body>
                        <Right>
                        <TouchableOpacity hasText transparent onPress={() => {
                          this.setmodalIller(!this.state.modalIller);
                        }}>   
                            <Text>??ptal</Text>
                        </TouchableOpacity>
                        </Right>
                        </Header>

                  <Content>
                  <Item style={{backgroundColor:'#f2f2f2'}}>
                  <EvilIcons  name='search' style={{color:'#4a4a4a',fontSize:WIDTH/20,paddingLeft:20}} />
                        <Input placeholder='??l Ara'
                        placeholderTextColor='#8E8D8D'
                          value = {
                            this.state.ilName
                        }
                        style={{color:'#8E8D8D',backgroundColor:'#f2f2f2'}}
                        onChangeText={(ilName) => this.ilAra(ilName)}
                        />
                    </Item>
                  <List>
                  <FlatList
                        numColumns={1}
                        horizontal={false}
                        data={this.state.iller}
                      keyExtractor={(item, index) => (item + index).toString()}
                      ListHeaderComponent={
                        this.state.iller == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                              <Text style={{ fontSize: 19 }} >  </Text>
                          </View> : null
                      }
                      refreshControl={
                        <RefreshControl
                            refreshing={this.state.reflesh}
                            tintColor={'#313131'}
                            title={'Y??kleniyor'}
                            titleColor={'#313131'} />
                    }
                      renderItem={({ item }) => (
                      <ListItem onPress={()=> {
                      this.setState({ modalIller: false,ilName:item.ad})
                      this.ilceler(item.id)
                    }
                      }>
                      <Body>
                      <Text>{item.ad}</Text>
                        </Body>
                            <Right>
                            </Right>
                      </ListItem>
                      )} />
                    
                      
                      
                      </List>
            
                </Content>
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalIlceler}
                  onRequestClose={() => {
                    this.setmodalIlceler(!this.state.modalIlceler);
                  }}>
                    <Header androidStatusBarColor='#8E8D8D' style={{backgroundColor:'#F9F9F9',borderBottomColor:'#a0a0a0',borderBottomWidth:0.7}}>
                        <Body>
                          <Text style={{color:'#4a4a4a'}}>??l??e Se??iniz </Text>
                        </Body>
                        <Right>
                        <TouchableOpacity hasText transparent onPress={() => {
                          this.setmodalIlceler(!this.state.modalIlceler);
                        }}>   
                            <Text>??ptal</Text>
                        </TouchableOpacity>
                        </Right>
                        </Header>

                  <Content>
                  <Item style={{backgroundColor:'#f2f2f2'}}>
                  <EvilIcons  name='search' style={{color:'#4a4a4a',fontSize:WIDTH/20,paddingLeft:20}} />
                        <Input placeholder='??l??e Ara'
                        placeholderTextColor='#8E8D8D'
                          value = {
                            this.state.ilceName
                        }
                        style={{color:'#8E8D8D',backgroundColor:'#f2f2f2'}}
                        onChangeText={(ilceName) => this.ilceAra(ilceName)}
                        />
                    </Item>
                  <List>
                  <FlatList
                        numColumns={1}
                        horizontal={false}
                        data={this.state.ilceler}
                      keyExtractor={(item, index) => (item + index).toString()}
                      ListHeaderComponent={
                        this.state.ilceler == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                              <Text style={{ fontSize: 19 }} >  </Text>
                          </View> : null
                      }
                      refreshControl={
                        <RefreshControl
                            refreshing={this.state.reflesh}
                            tintColor={'#313131'}
                            title={'Y??kleniyor'}
                            titleColor={'#313131'} />
                    }
                      renderItem={({ item }) => (
                      <ListItem onPress={()=> 
                      {
                      this.setState({ modalIlceler: false,ilceName:item.ad})
                      this.semtler(item.id)
                    }
                      }>
                      <Body>
                      <Text>{item.ad}</Text>
                        </Body>
                            <Right>
                            </Right>
                      </ListItem>
                      )} />
                    
                      
                      
                      </List>
            
                </Content>
                </Modal>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalSemtler}
                onRequestClose={() => {
                  this.setmodalSemtler(!this.state.modalSemtler);
                }}>
                  <Header androidStatusBarColor='#8E8D8D' style={{backgroundColor:'#F9F9F9',borderBottomColor:'#a0a0a0',borderBottomWidth:0.7}}>
                      <Body>
                        <Text style={{color:'#4a4a4a'}}>Semt Se??iniz </Text>
                      </Body>
                      <Right>
                      <TouchableOpacity hasText transparent onPress={() => {
                        this.setmodalSemtler(!this.state.modalSemtler);
                      }}>   
                          <Text>??ptal</Text>
                      </TouchableOpacity>
                      </Right>
                      </Header>

                <Content>
                <Item style={{backgroundColor:'#f2f2f2'}}>
                <EvilIcons  name='search' style={{color:'#4a4a4a',fontSize:WIDTH/20,paddingLeft:20}} />
                      <Input placeholder='Semt Ara'
                      placeholderTextColor='#8E8D8D'
                        value = {
                          this.state.semtName
                      }
                      style={{color:'#8E8D8D',backgroundColor:'#f2f2f2'}}
                      onChangeText={(semtName) => this.semtAra(semtName)}
                      />
                  </Item>
                <List>
                <FlatList
                      numColumns={1}
                      horizontal={false}
                      data={this.state.semtler}
                    keyExtractor={(item, index) => (item + index).toString()}
                    ListHeaderComponent={
                      this.state.semtler == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                            <Text style={{ fontSize: 19 }} >  </Text>
                        </View> : null
                    }
                    refreshControl={
                      <RefreshControl
                          refreshing={this.state.reflesh}
                          tintColor={'#313131'}
                          title={'Y??kleniyor'}
                          titleColor={'#313131'} />
                  }
                    renderItem={({ item }) => (
                    <ListItem onPress={()=> this.setState({ modalSemtler: false,semtName:item.semt})}>
                    <Body>
                    <Text>{item.semt}</Text>
                      </Body>
                          <Right>
                          </Right>
                    </ListItem>
                    )} />
                  
                    
                    
                    </List>
          
              </Content>
              </Modal>
                <Content style={{backgroundColor:'#F5F5F5'}}>
                        <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30,height:70,flexDirection:'column'}}>
                                  <Text style={{fontSize:25,fontWeight:'bold',color:'#8E8D8D'}}>Firma bilgilerinizi girin!</Text>
                                  <Text style={{fontSize:15,fontWeight:'bold',color:'#8E8D8D'}}>Bir defaya mahsus firma bilgilerinizi girin.</Text>
                        </Row>
                        <View style={{marginHorizontal:20}}>
                        <Item stackedLabel style={{marginTop:15}}>
                          <Label  style={{color:'#8E8D8D'}}>SEKT??R</Label>
                                  <Input 
                                    style={{color:'#042264'}}
                                  value = {
                                      this.state.sektor
                                  }
                                  onChangeText = {(value) => this.setState({sektor: value})}
                                  placeholderTextColor='#8E8D8D'
                                  />
                              </Item>
                        <Item stackedLabel style={{marginTop:15}}>
                          <Label  style={{color:'#8E8D8D'}}>F??RMA VKN </Label>
                                  <Input 
                                    style={{color:'#042264'}}
                                    maxLength={11}
                                  value = {
                                      this.state.firma_vkn
                                  }
                                  keyboardType='numeric'
                                  onChangeText = {(value) => this.setState({firma_vkn: value})}
                                  placeholderTextColor='#8E8D8D'
                                  />
                              </Item>
                              
                        <Item stackedLabel style={{marginTop:15}}>
                          <Label  style={{color:'#8E8D8D'}}>F??RMA ??NVANI </Label>
                                  <Input 
                                    style={{color:'#042264'}}
                                  value = {
                                      this.state.firma_unvan
                                  }
                                  onChangeText = {(value) => this.setState({firma_unvan: value})}
                                  placeholderTextColor='#8E8D8D'
                                  />
                              </Item>
                        <Item stackedLabel style={{marginTop:15}}>
                          <Label  style={{color:'#8E8D8D'}}>VERG?? DA??RES?? </Label>
                                  <Input 
                                    style={{color:'#042264'}}
                                  value = {
                                      this.state.vergi_dairesi
                                  }
                                  onChangeText = {(value) => this.setState({vergi_dairesi: value})}
                                  placeholderTextColor='#8E8D8D'
                                  />
                              </Item>
                            <View style={{flexDirection:'row'}}>
                              <Item style={{flex:1}}>
                                  <Input placeholder='+90'
                                  disabled
                                  placeholderTextColor='#8E8D8D'
                                  style={{color:'#8E8D8D'}}
                                  
                                  />
                              </Item>
                              <Item style={{flex:4,marginLeft:10}}>
                                  <Input placeholder='Tel'
                                  placeholderTextColor='#8E8D8D'
                                  keyboardType='numeric'
                                  style={{color:'#8E8D8D'}}
                                  maxLength={10}
                                  value = {
                                      this.state.firma_tel
                                  }
                                  onChangeText = {(value) => this.setState({firma_tel: value})}
                                  />
                              </Item>
                              </View>
                              {this.state.hataEmail == 1 ? 
                              <Item stackedLabel error  style={{marginTop:10}}>
                                <Label  style={{color:'#8E8D8D'}}>E POSTA ADRES??</Label>

                                    <Input 
                                    style={{color:'#8E8D8D'}}
                                    keyboardType="email-address"
                                    autoCapitalize = 'none'
                                    value = {
                                        this.state.email
                                    }
                                    onChangeText={(text) => this.validate(text)}
                                    />
                                    
                                    </Item>
                                    :
                                    <Item stackedLabel  style={{marginTop:10}}>
                                      <Label  style={{color:'#8E8D8D'}}>E POSTA ADRES??</Label>
                                    <Input
                                    autoCapitalize = 'none'
                                    keyboardType="email-address"
                                    style={{color:'#8E8D8D'}}
                                    
                                    value = {
                                        this.state.email
                                    }
                                    onChangeText={(text) => this.validate(text)}
                                    />
                                </Item>}
                        <Item stackedLabel style={{marginTop:15}}>
                          <Label  style={{color:'#8E8D8D'}}>WEBS??TE</Label>
                                  <Input 
                                  autoCapitalize = 'none'
                                    style={{color:'#8E8D8D'}}
                                  value = {
                                      this.state.website
                                  }
                                  onChangeText = {(value) => this.setState({website: value})}
                                  placeholderTextColor='#8E8D8D'
                                  />
                              </Item>
                            
                            
                          <Label  style={{color:'#8E8D8D',fontWeight:'bold',marginTop:25}}>Firma Adres:</Label>
                          
                          <ListItem style={{  borderBottomWidth:1,borderBottomColor:'#8E8D8D',marginTop:15,width:'95%',marginBottom:25,marginRight:20}} icon onPress={() => {
                              this.setmodalIller(true);
                            }}>
                                <Body>
                                <Label style={{color:'#8E8D8D'}}> 
                                {this.state.ilName == '' ? '??L' : this.state.ilName}
                                
                                </Label>
                                </Body>
                                <Right>
                                  <IconAnt name="caretdown" style={{color:'#8E8D8D'}}/>
                                </Right>
                            </ListItem>
                            <ListItem style={{  borderBottomWidth:1,borderBottomColor:'#8E8D8D',marginTop:15,width:'95%',marginBottom:25,marginRight:20}} icon onPress={() => {
                              this.setmodalIlceler(true);
                            }}>
                                <Body>
                                <Label style={{color:'#8E8D8D'}}> 
                                {this.state.ilceName == '' ? '??L??E' : this.state.ilceName}
                                
                                </Label>
                                </Body>
                                <Right>
                                  <IconAnt name="caretdown" style={{color:'#8E8D8D'}}/>
                                </Right>
                            </ListItem>
                        
                            <ListItem style={{  borderBottomWidth:1,borderBottomColor:'#8E8D8D',marginTop:15,width:'95%',marginBottom:25,marginRight:20}} icon onPress={() => {
                              this.setmodalSemtler(true);
                            }}>
                                <Body>
                                <Label style={{color:'#8E8D8D'}}> 
                                {this.state.semtName == '' ? 'SEMT/MAHALLE' : this.state.semtName}
                                
                                </Label>
                                </Body>
                                <Right>
                                  <IconAnt name="caretdown" style={{color:'#8E8D8D'}}/>
                                </Right>
                            </ListItem>
                            
                        <Item stackedLabel style={{marginTop:15}}>
                          <Label  style={{color:'#8E8D8D'}}>CADDE/SOKAK</Label>
                                  <Input 
                                    style={{color:'#042264'}}
                                  value = {
                                      this.state.cadde
                                  }
                                  onChangeText = {(value) => this.setState({cadde: value})}
                                  placeholderTextColor='#8E8D8D'
                                  />
                              </Item>
                        <Item stackedLabel style={{marginTop:15}}>
                          <Label  style={{color:'#8E8D8D'}}>KAPI NO</Label>
                                  <Input 
                                    style={{color:'#042264'}}
                                  value = {
                                      this.state.kapi_no
                                  }
                                  onChangeText = {(value) => this.setState({kapi_no: value})}
                                  placeholderTextColor='#8E8D8D'
                                  />
                              </Item>
                        <Item stackedLabel style={{marginTop:15}}>
                          <Label  style={{color:'#8E8D8D'}}>DA??RE NO</Label>
                                  <Input 
                                    style={{color:'#042264'}}
                                  value = {
                                      this.state.daire_no
                                  }
                                  onChangeText = {(value) => this.setState({daire_no: value})}
                                  placeholderTextColor='#8E8D8D'
                                  />
                              </Item>
                              <Label  style={{color:'#8E8D8D',fontWeight:'bold',marginTop:25}}>Firma Yetkilisi:</Label>
                                {this.state.hataTckn == 1 ? 
                                <Item error stackedLabel style={{marginTop:15}}>
                                  <Label  style={{color:'#8E8D8D'}}> TCKN</Label>
                                  <Input
                                  maxLength={11}
                                  keyboardType='numeric'
                                  value = {
                                      this.state.yetkili_tckn
                                  }
                                  placeholderTextColor='#8E8D8D'
                                  style={{color:'#8E8D8D'}}
                                  onChangeText={(yetkili_tckn) => this.tcKontrol(yetkili_tckn)}
                                  />
                              </Item>
                              :  <Item stackedLabel  style={{marginTop:15}}>
                                  <Label  style={{color:'#8E8D8D'}}> TCKN</Label>
                              <Input 
                              maxLength={11}
                              keyboardType='numeric'
                              value = {
                                  this.state.yetkili_tckn
                              }
                              placeholderTextColor='#8E8D8D'
                              style={{color:'#8E8D8D'}}
                              onChangeText={(yetkili_tckn) => this.tcKontrol(yetkili_tckn)}
                              />
                          </Item> }
                              <Item stackedLabel style={{marginTop:15}}>
                              <Label  style={{color:'#8E8D8D'}}>AD-SOYAD</Label>
                                    <Input 
                                    value = {
                                        this.state.yetkili_ad
                                    }
                                    style={{color:'#8E8D8D'}}
                                    onChangeText = {(value) => this.setState({yetkili_ad: value})}
                                    />
                                </Item>
                            <View style={{flexDirection:'row'}}>
                              <Item style={{flex:1}}>
                                  <Input placeholder='+90'
                                  disabled
                                  placeholderTextColor='#8E8D8D'
                                  style={{color:'#8E8D8D'}}
                                  
                                  />
                              </Item>
                              <Item style={{flex:4,marginLeft:10}}>
                                  <Input placeholder='Tel'
                                  placeholderTextColor='#8E8D8D'
                                  keyboardType='numeric'
                                  style={{color:'#8E8D8D'}}
                                  maxLength={10}
                                  value = {
                                      this.state.yetkili_tel
                                  }
                                  onChangeText = {(value) => this.setState({yetkili_tel: value})}
                                  />
                              </Item>
                              </View>
                              <Item stackedLabel style={{marginTop:15}}>
                              <Label  style={{color:'#8E8D8D'}}>E-POSTA</Label>
                                    <Input 
                                    value = {
                                        this.state.yetkili_mail
                                    }
                                    autoCapitalize = 'none'
                                    style={{color:'#8E8D8D'}}
                                    onChangeText = {(value) => this.setState({yetkili_mail: value})}
                                    />
                                </Item>
                              <Item stackedLabel style={{marginTop:15}}>
                              <Label  style={{color:'#8E8D8D'}}>??NVAN</Label>
                                    <Input 
                                    value = {
                                        this.state.yetkili_unvan
                                    }
                                    style={{color:'#8E8D8D'}}
                                    onChangeText = {(value) => this.setState({yetkili_unvan: value})}
                                    />
                                </Item>
                                      
                                      <Row style={{ justifyContent:'center' ,marginTop:20, marginBottom:20, paddingHorizontal:20 }}>
                                    <Button block transparent onPress={this.insertFirma.bind(this)} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                                      <Text style={{color:'#011153'}}>KAYDET</Text>
                                    </Button>
                                </Row>
                                  
                              </View>
                      </Content>
                      <Modal
                              animationType="fade"
                              transparent={true}
                              visible={this.state.modalLoading}
                              onRequestClose={() => {
                                  this.setState({ modalLoading: false })
                              }}>
                              <View style={{ flex: 1, borderRadius: 10, backgroundColor: 'rgba(135, 135, 135, 0.35)', justifyContent: 'center', alignItems: 'center' }} >
                                  <View style={styles.modalViewLoading} >

                                      <View style={styles.modalUst} >
                                    <ActivityIndicator size="large" color="#FFBA00"/>
                                      </View>

                                  </View>
                              </View>
                          </Modal>
          </ImageBackground>
        </Container>
        </KeyboardAvoidingView>
       );

}
}
export default withNavigation(addFirma);
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }, 
  
  modalViewLoading: {
    height: HEIGHT / 2,
    width: WIDTH / 1.5,
    justifyContent: 'space-around',
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
  exit: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    top:15,
    width: 25,
    height: 25,
    borderRadius: 25,
    zIndex:1
},  modalView: {
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
 guncelle: {
  width: '100%',
  height: '100%',
  backgroundColor: "rgba(90,170,2,1)",
  textAlign: 'center',
  justifyContent: 'center'
},
sag: {
  flex: 2,
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingLeft: 30
},
modalUst: {
width:WIDTH/1.5,
height:HEIGHT/2,
  justifyContent: 'space-around',
  paddingHorizontal: 30,
  paddingTop: 20
},
modalAlt: {
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#c8c8c8'
},
mUstSatir: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  flex: 1,
},
mAltSatir: {
  flex: 1,
  alignItems: 'center'
},
minput: {
  height: 40,
  width: '60%',
  borderRadius: 15,
  backgroundColor: '#393939',
  justifyContent:'center'
}, 
  modalView: {
    height: HEIGHT / 2,
    width: WIDTH / 1.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
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

});