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
    Text,
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import {Image, Subtitle,} from '@shoutem/ui';
import { withNavigation } from 'react-navigation';
import {Col,Row, Footer, FooterTab, Button,Grid} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Modal, {
  ModalTitle,
  ModalContent,
 
} from 'react-native-modals';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class Altbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

          menuAktif:false
    }
     
  }
  
  render() {
    return (
      
      <Footer style={{backgroundColor: 'transparent',zIndex:9999,}}>
          <FooterTab style={{zIndex:9999,borderTopWidth:1,borderTopColor:'#707070', backgroundColor:'#F0EFEF',height:HEIGHT/12}}>
            <Button transparent onPress={() => this.props.navigation.navigate('Anasayfa')}>
                <Image
                  style={{width:WIDTH/8,resizeMode:'contain'}}
                  source={this.props.anasayfa == 'a' ? require('../assets/anasayfa.png') : require('../assets/anasayfa-disable.png') }
                  />
                  <Text style={{color:'#011153'}}>Anasayfa</Text>
            </Button>
            {this.props.cancel == 'a' ? 
             <Button transparent style={{zIndex:9999,bottom:15,width:WIDTH/2,height:HEIGHT/8,  shadowColor: 'transparent',
             shadowOpacity: 0.1,
             shadowOffset: {x: 2, y: 2},
             shadowRadius: 2,
             shadowOpacity: 5.0,}}
             onPress={() =>this.props.navigation.navigate('Anasayfa')}>
              <Image
              style={{width:WIDTH/4,zIndex:9999, resizeMode:'contain'}}
              source={require('../assets/xbutton.png')}
              style={{height:60,width:60}}
              />
        </Button> :
              <Button transparent style={{zIndex:9999,bottom:15,width:WIDTH/2,height:HEIGHT/8,  shadowColor: 'transparent',
              shadowOpacity: 0.1,
              shadowOffset: {x: 2, y: 2},
              shadowRadius: 2,
              shadowOpacity: 5.0,}}
              onPress={() =>  this.props.disable == 'a' ? null: this.props.navigation.navigate('Choose')} >
               <Image
               style={{width:WIDTH/4,zIndex:9999, resizeMode:'contain'}}
               source={require('../assets/plusbutton.png')}
               //source={require('../images/plus.png')}
               style={{height:60,width:60}}
               />
         </Button>
         
          }
             
            <Button transparent onPress={() => this.props.navigation.navigate('BizeYazin')}>
            <Image
                  style={{width:WIDTH/8,resizeMode:'contain'}}
                  source={require('../assets/yardim.png')}
                  />
                    <Text style={{color:'#011153'}}>Yardım</Text>
            </Button>
          </FooterTab>
        
        </Footer>
       
      );


}
}
export default withNavigation(Altbar);
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
    height: HEIGHT / 1,
    justifyContent: 'center',
    flexDirection:'column',
    alignItems: 'center',
    width: WIDTH / 1,
    borderRadius: 10,

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

main: {
  backgroundColor: 'rgba(0,0,0,0.9)',
  width: WIDTH/1,
  height: HEIGHT/1,
  flex: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 'auto',
  alignItems:'center'

},
});