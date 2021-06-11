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
  import { Container,  Button, Textarea, Header,Col,Row,Grid, Footer,FooterTab, Left, Body,Icon, Right, Content,Item,Input,Picker, Label,List,ListItem } from 'native-base';
  import {Image, Subtitle,} from '@shoutem/ui';
  
import {
  TextInputMask
} from 'react-native-masked-text';
import Moment from 'moment/min/moment-with-locales';
import CalendarPicker from 'react-native-calendar-picker';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';
import Altbar from '../inc/footer';
import IconAnt from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class cekInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fatura_vkn:'',
          fatura_notu:'',
          fatura_tutari:'',
          bankaKodu:'',
          vgkn:'',
          tarih:'',
          cekNo:'',
          birim:'',
          bankName:'',
          bankAra:'',
          bottomHeight: 0,
          miktar:'',
          bankalar:[],
          modalLoading:false,
          modalSuccess:false,
          modalBanka:false,
          modalTarih:false,
          modalBirim:false,
          selectedStartDate: null,
          showFooter:true,
          showFaturaBig:true,
          loading:false
        }
    this.onDateChange = this.onDateChange.bind(this);

  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      modalTarih:false,
    });
  }
setModalLoading(visible) {
    this.setState({modalLoading: visible});
    }
    setmodalTarih(visible) {
      this.setState({modalTarih: visible});
    }
    setModalSuccess(visible) {
      this.setState({modalSuccess: visible});
      }
setmodalBanka(visible) {
    this.setState({modalBanka: visible});
    }
    setmodalBirim(visible) {
        this.setState({modalBirim: visible});
        }
 async checkProps(){
  const { params } = this.props.navigation.state;
  if(params.cekNo || params.bankaKodu || params.vgkn || params.bankName){
    this.setState({
      cekNo:params.cekNo,
      bankaKodu:params.bankaKodu,
      vgkn:params.vgkn,
      bankName:params.bankName,
    })
  }
 
 }
 
 componentDidMount() {
  const { navigation } = this.props;
  navigation.addListener('willFocus', () => {
    this.checkProps()
    this.bankalar()
      });
}

_keyboardDidShow () {
  this.setState({showFooter: false});
}

_keyboardDidHide () {
  this.setState({showFooter: true});
}   
componentWillMount() {
  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
 
}
componentWillUnmount () {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
}

async bankalar() {
  try {
      let response = await fetch(`https://pro.faktodeks.com//api/bankalar`, {
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
        
          this.setState({ bankalar: responseJson, reflesh: false });
      } else {
          Alert.alert(
              '',
              'bankalar Şu anda gösterilemiyor',
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

async bankAra(name) {
  this.setState({bankName:name})
  if(this.state.bankName != ''){
  try {
      let response = await fetch(`https://pro.faktodeks.com//api/bankaAra/${name}`, {
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
          this.setState({ bankalar: responseJson, reflesh: false });
      } else {
      }
  } catch (error) {
      console.error(error);
  }
}
}
async insertCek(){
  const { params } = this.props.navigation.state;
  const { selectedStartDate } = this.state;
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  Moment.locale('tr');
  var dt = startDate;
  const a =Moment(dt).format('DD/MM/YYYY') 
 if(this.state.bankaKodu == ''){
      Alert.alert(
        '',
        'Lütfen Banka Seçiniz',
        [
            { text: 'Anladım' },
        ],
        { cancelable: false },
    );
 }else if(this.state.vgkn == ''){
      Alert.alert(
        '',
        'Lütfen VKN No Giriniz',
        [
            { text: 'Anladım' },
        ],
        { cancelable: false },
    );
 }else if(this.state.selectedStartDate == null){
    Alert.alert(
      '',
      'Lütfen Tarih Seçiniz',
      [
          { text: 'Anladım' },
      ],
      { cancelable: false },
  );
}else if(this.state.cekNo == ''){
  Alert.alert(
    '',
    'Lütfen Çek No Giriniz',
    [
        { text: 'Anladım' },
    ],
    { cancelable: false },
);
}else if(this.state.birim == ''){
  Alert.alert(
    '',
    'Lütfen Para Birimi Seçiniz',
    [
        { text: 'Anladım' },
    ],
    { cancelable: false },
);
}else if(this.state.miktar == ''){
  Alert.alert(
    '',
    'Lütfen Çek tutarını Giriniz',
    [
        { text: 'Anladım' },
    ],
    { cancelable: false },
);
}else if(this.state.fatura_tutari == ''){
  Alert.alert(
    '',
    'Lütfen Fatura Tutarı Giriniz',
    [
        { text: 'Anladım' },
    ],
    { cancelable: false },
);
}else if(this.state.fatura_vkn == ''){
  Alert.alert(
    '',
    'Lütfen Fatura VKN Giriniz',
    [
        { text: 'Anladım' },
    ],
    { cancelable: false },
);
}else if(this.state.vgkn.length < 10 ){
      Alert.alert(
        '',
         'VKN numaranızın en az karakter sayısı 10 olmalıdır.',
        [
            { text: 'Anladım' },
        ],
        { cancelable: false },
    );
    } else{
        try{
          let str =this.state.miktar;
          var lastTree = str.substr(str.length - 3); 
          if(lastTree == ',00'){
            str = str.substring(0, str.length - 3);
            str = str.replace(".", "");
          }else{
            str = str.replace(",", ".");
          }

          let fatura =this.state.fatura_tutari;
          var faturaTree = str.substr(fatura.length - 3); 
          if(faturaTree == ',00'){
            fatura = fatura.substring(0, fatura.length - 3);
            fatura = fatura.replace(".", "");
          }else{
            fatura = fatura.replace(",", ".");
          }
       console.log(str)
       console.log(fatura)
           const token = await AsyncStorage.getItem('@myStores:access_token');
          let response = await fetch(`https://pro.faktodeks.com//api/insertCekToplam`, {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                cek_id: params.cekid,
                token:token,
                  tarih: a,
                  miktar: str,
                  vkn:this.state.vgkn,
                  para_birim: this.state.birim,
                  banka_kodu: this.state.bankaKodu,
                  cek_no: this.state.cekNo,
                  fatura_notu:this.state.fatura_notu,
                  fatura_vkn:this.state.fatura_vkn,
                  fatura_tutari:fatura
              }),
          });
          console.log(response);
          if (response.status == '200' || response.status == '201') {
            let responseJson = await response.json();
            if(responseJson.firma == 1){
            this.setState({loading:false});

              this.setState({modalSuccess:true});
            }else{
            this.setState({loading:false});
              Alert.alert(
                'Firma Bilgilerinizi Girin',
                'Tekliflere açabilmeniz için firma bilgilerini  girmeniz gerekmektedir.',
                [
                    { text: 'Şimdi Doldur',onPress: () =>  this.props.navigation.navigate('CekFirma',{cekid:params.cekid})},
                    // { text: 'E-Posta Gönder',onPress: () => this.mailGonder(responseJson.cek_id)},
                ],
                { cancelable: false },
             );
            }
          } else if(response.status == '404') {
            this.setState({loading:false});
              Alert.alert(
                'Fatura, çek tutarından düşük!',
                'Toplam fatura tutarınız, çek tutarına eşit ya da fazla olmalıdır.',
                [
                    { text: 'Yeni Fatura Ekle',onPress: () => this.props.navigation.navigate('Faturalar',{cekid:params.cekid})},
                ],
                { cancelable: false },
            );
            this.setState({ hata: '1'})
          }else{
            this.setState({loading:false});
            alert("hata.")
          }

        }
        catch(error){

        }
     
    }
  
} 
async mailGonder(cek_id){
  this.props.navigation.navigate('Talepler')
  /*
  const token = await AsyncStorage.getItem('@myStores:access_token');
  try{
    let response = await fetch(`https://pro.faktodeks.com//api/firmaMail`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cek_id :cek_id,
          token :token,
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
        Alert.alert(
          '',
          'Mail Başarıyla Gönderildi Lütfen Kontrol Ediniz',
          [
              {
                  text: 'OK', onPress: () => console.log('presed')

              }

          ],
          { cancelable: false },
      );
      this.props.navigation.navigate('Talepler')
    } else {
        alert("hata 2")
    }

  }
  catch(error){

  }
  */
}
async teklifAc(){
  const { params } = this.props.navigation.state;

  try{
    let response = await fetch(`https://pro.faktodeks.com//api/forBanka`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cek_id : params.cekid,
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
 this.setState({ modalSuccess:false})

      this.props.navigation.navigate('Talepler')
    } else {
        alert("hata 2")
    }

  }
  catch(error){

  }
}
async forFakto(){
  const { params } = this.props.navigation.state;

  try{
    let response = await fetch(`https://pro.faktodeks.com//api/forFakto`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cek_id : params.cekid,
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
 this.setState({ modalSuccess:false})

      this.props.navigation.navigate('Talepler')
    } else {
        alert("hata 2")
    }

  }
  catch(error){

  }
}
  render() {
    const { params } = this.props.navigation.state;
    const today = Moment().format("YYYY-MM-DD");
    const hour = Moment().format("H:mm");
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    Moment.locale('tr');
    var dt = startDate;
    const a =Moment(dt).format('DD/MM/YYYY') 
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
        <Menu borderNo="a" yer="Talep Ekle"  alt={params.altKategoriText}/>

          <Content style={{backgroundColor:'#F5F5F5'}}>
                    <View  style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30}}>
                    <Item style={styles.item}>
                        <Input placeholder='FATURA BORÇLUSU VKN'
                        placeholderTextColor='#042264' 
                        keyboardType='phone-pad'
                        maxLength={11}
                        style={{color:'#042264'}}
                        value = {
                            this.state.fatura_vkn
                        }
                        onChangeText = {(value) => this.setState({fatura_vkn: value})}
                        />
                    </Item>
                    <Item style={styles.item}>
                        <Input placeholder='FATURA TUTARI'
                        placeholderTextColor='#042264'
                        keyboardType='phone-pad'
                        style={{color:'#042264'}}
                        value = {
                            this.state.fatura_tutari
                        }
                        
                        onChangeText = {(value) => this.setState({fatura_tutari: value})}
                        />
                    </Item>
                    <Item style={styles.item}>
                    <Textarea 
                      
                    placeholder="Faturaya konu olan ticaretin içeriğini yazınız."
                                placeholderTextColor='#042264'
                                style={{color:'#042264'}}
                                maxLength={140}
                           value = {
                            this.state.fatura_notu
                        }
                        onChangeText = {(value) => this.setState({fatura_notu: value})}
                          rowSpan={4}  />
                    </Item>
                    
                    <Item  style={styles.item}>
                            <Input 
                               style={{color:'#042264'}}
                               keyboardType='phone-pad'
                               maxLength={20}
                             value = {
                                this.state.miktar
                            }
                            editable={this.state.showFaturaBig}
                            onChangeText = {(value) => this.setState({miktar: value})}
                            placeholderTextColor='#042264'
                            placeholder='ÇEK TUTARI'
                            />
                        </Item>
                   
                        <Row style={{marginTop:20, }}>
                          <Button  block transparent  onPress={() => {
                            this.setmodalTarih(true);
                                }} style={{backgroundColor:'#fff',width:'100%',borderRadius:10}} >
                              <Text style={{color:'#042264',textAlign:'left',position:'absolute',left:5, fontSize:WIDTH/25}}>
                                {this.state.selectedStartDate == null ? 'ÇEK TARİHİ' : a}</Text>
                            </Button>
                        </Row>


{/* 
let date=to.getDate() + "/"+ parseInt(to.getMonth()+1) +"/"+to.getFullYear();

console.log(date) */}


                      {/* <Row style={{marginTop:20, }}>
                          <Input 
                          style={{color:'#042264'}}
                          keyboardType='phone-pad'
                          maxLength={11}
                          value = {
                             this.state.tarih
                         }
                         editable={this.state.showFaturaBig}
                         onChangeText = {(value) => this.setState({tarih: value})}
                       placeholderTextColor='#042264'
                       placeholder='ÇEK TAARRİİHHH'
                          onPress={() => {
                            // this.setmodalTarih(true);

                            var date = new Date().getDate(); //Current Date
                            var month = new Date().getMonth() + 1; //Current Month
                            var year = new Date().getFullYear(); //Current Year
                            const trh =date+'/'+month+'/'+year ;
                            console.log(trh)

                                }}  >
                              
                              
                            </Input>
                        </Row>  */}


                        <Item  style={styles.item}>
                            <Input 
                               style={{color:'#042264'}}
                               keyboardType='phone-pad'
                               maxLength={11}
                               value = {
                                  this.state.vgkn
                              }
                              editable={this.state.showFaturaBig}
                              onChangeText = {(value) => this.setState({vgkn: value})}
                            placeholderTextColor='#042264'
                            placeholder='ÇEK VKN'
                            />
                        </Item>


                        <Row style={{marginTop:20, }}>
                          <Button iconRight block transparent  onPress={() => {
                            this.setmodalBirim(true);
                                }} style={{backgroundColor:'#fff',width:'100%',borderRadius:10}} >
                              <Text style={{color:'#042264',textAlign:'left',position:'absolute',left:5, fontSize:WIDTH/25}}>
                              {this.state.birim == '' ? 'ÇEK PARA BİRİMİ' : this.state.birim}</Text>
                              <IconAnt name="down" style={{color:'#042264', position:'absolute',right:5}}/>
                            </Button>
                        </Row>
                   
                        <Row style={{marginTop:20, }}>
                          <Button iconRight block transparent  onPress={() => {
                            this.setmodalBanka(true);
                                }} style={{backgroundColor:'#fff',width:'100%',borderRadius:10}} >
                              <Text style={{color:'#042264',textAlign:'left',position:'absolute',left:5, fontSize:WIDTH/25}}>
                              {this.state.bankName == '' ? 'BANKA' : this.state.bankName}</Text>
                              <IconAnt name="down" style={{color:'#042264', position:'absolute',right:5}}/>
                            </Button>
                        </Row>
                    
                        <Item  style={styles.item}>
                            <Input 
                               style={{color:'#042264'}}
                               keyboardType='phone-pad'
                                 maxLength={11}
                             value = {
                                this.state.cekNo
                            }
                            editable={this.state.showFaturaBig}
                            onChangeText = {(value) => this.setState({cekNo: value})}
                            placeholderTextColor='#042264'
                            placeholder="ÇEK NUMARASI"
                            />
                        </Item>
                        </View>
                        <Row style={{ justifyContent:'center' ,marginTop:20, marginBottom:20, paddingHorizontal:20 }}>
                          <Button block transparent onPress={this.insertCek.bind(this)} style={{backgroundColor:'#00FFF5',width:'100%',borderRadius:10}} >
                             <Text style={{color:'#011153'}}>DEVAM</Text>
                          </Button>
                       </Row>
                </Content>
                
      <Modal
      onTouchOutside={() => this.setState({ modalSuccess: false })}
      onSwipeOut={() => this.setState({ modalSuccess: false })}
                            animationType="slide"
                            transparent={true}
                          visible={this.state.modalSuccess}
                        onRequestClose={() => {
                          this.setModalSuccess(!this.state.modalSuccess);
                        }}>
                        <Grid  style={styles.main}>
                        <View style={{width:WIDTH/1.3,height:HEIGHT/2,borderRadius:20}}>
                          
                        <Row style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',flexDirection:'column',borderTopLeftRadius:20,borderTopRightRadius:20,marginTop:10}}>
                        <Image
                                    style={{width:WIDTH/4,resizeMode:'contain',padding:20,}}
                                    source={require('../assets/modal-logo.png')} 
                                />
                          <Text style={{textAlign:'center',color:'#042264', fontSize:WIDTH/25}}>Talebiniz Oluşturuldu.</Text>
                          <Text style={{textAlign:'center',color:'#042264'}}>Talebinize bankalardan da</Text>
                          <Text  style={{textAlign:'center',color:'#042264', fontSize:18}}>teklif gelmesini ister misiniz?</Text>
                        </Row>
                        <Row style={{backgroundColor:'#fff',flexDirection:'column',paddingHorizontal:20,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                        <TouchableOpacity   onPress={this.forFakto.bind(this)} style={{marginTop:20,padding:10,width:'100%',backgroundColor:'#00FFF5',borderColor:'#042264',borderWidth:1, borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                           <Text style={{textAlign:'center',color:'#042264'}}>SADECE FAKTORİNG</Text>
                        </TouchableOpacity>
                        <Button   onPress={this.teklifAc.bind(this)}  bordered light style={{marginTop:20,padding:10,width:'100%', borderRadius:25,justifyContent:'center',alignItems:'center',borderColor:'#042264',borderWidth:1}}>
                          <Text style={{textAlign:'center',color:'#042264'}}>BANKA VE FAKTORİNG</Text>
                        </Button>
                        </Row>
                        </View>
                        </Grid>

                      </Modal>
          
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalTarih}
          onRequestClose={() => {
            this.setmodalTarih(!this.state.modalTarih);
          }}>
            <Header androidStatusBarColor='white' style={{backgroundColor:'#F9F9F9',borderBottomColor:'#a0a0a0',borderBottomWidth:0.7}}>
                <Body>
                   <Text style={{color:'#4a4a4a'}}>Tarih Seçiniz </Text>
                </Body>
                <Right>
                <TouchableOpacity hasText transparent onPress={() => {
                  this.setmodalTarih(!this.state.modalTarih);
                }}>   
                    <Text>İptal</Text>
                </TouchableOpacity>
                </Right>
                </Header>
          <Content>
          <List>
                <CalendarPicker
                minDate={today}
                startFromMonday={true}
                 weekdays={['Pzt', 'Sal', 'Çar', 'Per', 'Cu', 'Cmt', 'Pz']}
                 months={['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']}
                 previousTitle="Geri"
                 nextTitle="İleri"
                onDateChange={this.onDateChange}
              />
          </List>
        </Content>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalBanka}
          onRequestClose={() => {
            this.setmodalBanka(!this.state.modalBanka);
          }}>
            <Header androidStatusBarColor='white' style={{backgroundColor:'#F9F9F9',borderBottomColor:'#a0a0a0',borderBottomWidth:0.7}}>
                <Body>
                   <Text style={{color:'#4a4a4a'}}>Banka Seçiniz </Text>
                </Body>
                <Right>
                <TouchableOpacity hasText transparent onPress={() => {
                  this.setmodalBanka(!this.state.modalBanka);
                }}>   
                    <Text>İptal</Text>
                </TouchableOpacity>
                </Right>
                </Header>

          <Content>
          <Item style={{backgroundColor:'#f2f2f2'}}>
          <EvilIcons  name='search' style={{color:'#4a4a4a',fontSize:WIDTH/20,paddingLeft:20}} />
                <Input placeholder='Banka Ara'
                placeholderTextColor='#8E8D8D'
                  value = {
                    this.state.bankName
                }
                style={{color:'#8E8D8D',backgroundColor:'#f2f2f2'}}
                onChangeText={(bankName) => this.bankAra(bankName)}
                />
            </Item>
          <List>
          <FlatList
                numColumns={1}
                horizontal={false}
                data={this.state.bankalar}
              keyExtractor={(item, index) => (item + index).toString()}
              ListHeaderComponent={
                this.state.bankalar == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                      <Text style={{ fontSize: 19 }} >  </Text>
                  </View> : null
              }
              refreshControl={
                <RefreshControl
                    refreshing={this.state.reflesh}
                    tintColor={'#313131'}
                    title={'Yükleniyor'}
                    titleColor={'#313131'} />
            }
              renderItem={({ item }) => (
              <ListItem onPress={()=> this.setState({ modalBanka: false,bankName:item.name,bankaKodu:item.code })}>
              <Body>
              <Text>{item.name}</Text>
                </Body>
                    <Right>
                    </Right>
              </ListItem>
              )} />
            
              
              
               </List>
    
        </Content>
        </Modal>
        <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.loading}
                        onRequestClose={() => {
                            this.setState({ loading: false })
                        }}>
                        <View style={{ flex: 1, borderRadius: 10, backgroundColor: 'rgba(135, 135, 135, 0.35)', justifyContent: 'center', alignItems: 'center' }} >
                            <View style={styles.modalViewLoading} >

                                <View style={styles.modalUst} >
                               <ActivityIndicator size="large" color="#011153"/>
                                </View>

                            </View>
                        </View>
                    </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalBirim}
          onRequestClose={() => {
            this.setmodalBirim(!this.state.modalBirim);
          }}>
            <Header androidStatusBarColor='white' style={{backgroundColor:'#F9F9F9',borderBottomColor:'#a0a0a0',borderBottomWidth:0.7}}>
                <Body>
                   <Text style={{color:'#4a4a4a'}}>Birim Seçiniz </Text>
                </Body>
                <Right>
                <TouchableOpacity hasText transparent onPress={() => {
                  this.setmodalBirim(!this.state.modalBirim);
                }}>   
                    <Text>İptal</Text>
                </TouchableOpacity>
                </Right>
                </Header>
          <Content>
          <List>
       
              <ListItem onPress={()=> this.setState({ modalBirim: false,birim:'TL' })}>
              <Body>
              <Text>TL</Text>
                </Body>
                    <Right>
                    </Right>
              </ListItem>
              <ListItem onPress={()=> this.setState({ modalBirim: false,birim:'EUR' })}>
              <Body>
              <Text>EUR</Text>
                </Body>
                    <Right>
                    </Right>
              </ListItem>
              <ListItem onPress={()=> this.setState({ modalBirim: false,birim:'USD'})}>
              <Body>
              <Text>USD</Text>
                </Body>
                    <Right>
                    </Right>
              </ListItem>
               </List>
    
        </Content>
        </Modal>
        {this.state.showFooter == true ?       
         <Altbar  disable="a"/>
      :null}
                    
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
       );

}
}
export default withNavigation(cekInfo);
const styles = StyleSheet.create({
  
  modalViewLoading: {
    height: HEIGHT / 2,
    width: WIDTH / 1.5,
    justifyContent: 'space-around',
},
  item:{
    width:'100%', 
    backgroundColor:'#fff',borderRadius:10,
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
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
  modalViewLoading: {
    height: HEIGHT / 2,
    width: WIDTH / 1.5,
    justifyContent: 'space-around',
},

});