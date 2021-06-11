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
  import { Container,  Button, Header,Col,Row, Left, Body, Right,ListItem,List, Content, Grid } from 'native-base';
  import {Image, Subtitle} from '@shoutem/ui';
  import ImagePicker from 'react-native-image-crop-picker';
  import Menu from '../inc/header';
  import RNFetchBlob from 'rn-fetch-blob';
  import Altbar from '../inc/footer';
  import Modal, {
    ModalTitle,
    ModalContent,
   
  } from 'react-native-modals';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
import { Avatar } from 'react-native-elements';

export default class choose extends Component {
    constructor(props) {
        super(props);
        this.state = {
     
    }

  }
  
  render() {
    return (



    
    
        <Container >
       
        <ImageBackground source={  require('../images/Background.png')   }  style={{width: '100%', height: '100%'}}>
     
        <Menu backNo="a" yer='' profil="" bildirim='a' borderNo='a'/>
       <Content style={{backgroundColor:'transparent',}} >
 

       <Image
   source={require('../assets/modal-logo.png')}
  style={{ width: 90, height: 100  ,top:HEIGHT/7 ,left:WIDTH/2-45}}
/>




          <TouchableOpacity  style={{width:WIDTH/1,height:HEIGHT/2}} onPress={()=>  this.props.navigation.navigate('Anasayfa')}>
           
          </TouchableOpacity>
       </Content>
       
       <Row style={{flexDirection:'column',backgroundColor:'#fff',marginLeft:40 ,marginRight:40, height:HEIGHT/2.5}}>
         <TouchableOpacity style={styles.modalRow} onPress={() =>{
           this.setState({ menuAktif:false})
           this.props.navigation.navigate('Barcode',{anaKategoriId:1,anaKategoriText:'Faktoring',altKategoriId:1,altKategoriText:'Yurtiçi Faktoring'}) }}>
                 <Image  style={styles.icon}
                 source={require('../assets/yurtici.png')} 
             />
           <Text style={[styles.textFont,{textAlign:'center',color:'#FF7A00',fontWeight:'bold',marginTop:5}]}>YURTİÇİ FAKTORİNG</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.modalRow} onPress={() =>{
           this.setState({ menuAktif:false})
           this.props.navigation.navigate('Proforma',{anaKategoriId:1,anaKategoriText:'İHRACAT FAKTORİNG',altKategoriId:2,altKategoriText:'İhracat Faktoring'}) }}>
                 <Image  style={styles.icon}
                 source={require('../assets/ihracat.png')} 
             />
           <Text style={[styles.textFont,{textAlign:'center',color:'#042264',fontWeight:'bold',marginTop:5}]}>İHRACAT FAKTORİNG</Text>
         </TouchableOpacity>
          
         <TouchableOpacity style={styles.modalRow} onPress={() =>{
           this.setState({ menuAktif:false})
           this.props.navigation.navigate('Temlik',{anaKategoriId:1,anaKategoriText:'Bildirimli Faktoring',altKategoriId:3,altKategoriText:'Bildirimli Faktoring'}) }}>
                 <Image  style={styles.icon}
                 source={require('../assets/temlik.png')} 
             />
           <Text style={[styles.textFont,{textAlign:'center',color:'#16AAE8',fontWeight:'bold',marginTop:5}]}>BİLDİRİMLİ TEMLİK</Text>
         </TouchableOpacity>    
      </Row>
         
    <Altbar anasayfa='a' ileriQR='' cancel="a"/>          
    </ImageBackground>
  </Container>
       );

}
}
const styles = StyleSheet.create({
  textFont:{
    fontSize:WIDTH/30
  },
  icon:{width:WIDTH/4,resizeMode:'contain'   },
  modalRow:{
    justifyContent:'center',alignItems:'center',flexDirection:'row',
    borderBottomWidth:0.5,
    borderBottomColor:'#D1D1D1',
    height:HEIGHT/9
  },
});