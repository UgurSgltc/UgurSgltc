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
    Modal,
    Text,
    Alert,
    StatusBar,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import {Image, Subtitle,} from '@shoutem/ui';
import { withNavigation } from 'react-navigation';
import {Col,Row} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name:'',
        giris:1,
        register:0,
        kvkk:false,
        fakto: false,
        sifre:1,
        sifreTekrar:1,
        modalVisible2:false,
        modalVisible:false
    }
     
  }
  
setModalVisible(visible) {
    this.setState({modalVisible: visible});
    }
setModalVisible2(visible) {
this.setState({modalVisible2: visible});
}
  render() {
    return (
      <View
      style={{
        flex: 0.3,
        flexDirection: 'column',
      }}>
        
{this.props.checkInfo == 'a' ?
<TouchableOpacity
          style={{
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: 'grey',
            width: 70,
            height: 70,
            borderRadius: 35,
            bottom: 35,
            zIndex: 9999,
          }}
             onPress={()=> 
              {
               this.props.navigation.navigate(this.props.yolla)
              }
              
              }>
            <View  style={[styles.button, styles.actionBtn]}>
               <Image
               style={{width: 60, height: 60}}
               resizeMode="contain"
               source={require('../images/ileri.png')}
              
             />
            </View>
          </TouchableOpacity>
    : 
          <TouchableOpacity
          style={{
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: 'grey',
            width: 70,
            height: 70,
            borderRadius: 35,
            bottom: 35,
            zIndex: 9999,
          }}
             onPress={()=> 
              {
               
                this.props.ileriQR != '' ? this.setModalVisible(true) : this.props.navigation.navigate('Karekod')
              } }>
            <View  style={[styles.button, styles.actionBtn]}>
              {this.props.ileri != '' ? 
               <Image
               style={{width: 60, height: 60}}
               resizeMode="contain"
               source={require('../images/ileri.png')}
              
             />
             :
             <Image
             style={{width: 60, height: 60}}
             resizeMode="contain"
             source={require('../images/plus.png')}
            
           />
            }
            
            </View>
          </TouchableOpacity>
        }
        <View
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: 'absolute',
            backgroundColor: 'white',
            border: 2,
            radius: 3,
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: {
              height: 3,
              width: 3,
            },
            x: 0,
            y: 0,
            style: {marginVertical: 5},
            bottom: 0,
            width: '100%',
            height: 70,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 55,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Taleplerim')}>
              <Image
                style={{width:70,height:70,resizeMode:'contain'}}
                source={require('../images/taleplerim.png')}
                onPress={() => {
                  Alert.alert('');
                }}></Image>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity  >
              <Image
                source={require('../images/yardim.png')}
                style={{width:70,height:50,resizeMode:'contain'}}
                containerStyle={{marginHorizontal: 0}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setState({ modalVisible: false })
                }}>
                <View style={{ flex: 1,backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' }} >
                  
                    <View style={styles.modalView} >
                    <TouchableOpacity onPress={() => this.setModalVisible(false)} style={styles.exit} >
                            <Image source={require('../images/iptal.png')} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                    <Row></Row>
                    <Row style={{justifyContent:'center',alignItems:'center',paddingHorizontal:30}}>
                   <Image
                        style={{width:WIDTH/1.5,resizeMode:'contain'   }}
                        source={require('../images/oklar.png')} 
                      />
                    </Row>
                    <Row style={{justifyContent:'center',alignItems:'center',}}>
                      <Col>
                      <TouchableOpacity onPress={() => 
                      {
                        this.setState({ modalVisible: false })
                        this.props.navigation.navigate('Barcode')
                      }
                         
                         }>
                            <Image
                              style={{width:WIDTH/3,resizeMode:'contain',marginLeft:WIDTH/10   }}
                              source={require('../images/kamera.png')} 
                          />
                       </TouchableOpacity>
                      </Col>
                      <Col>
                      <TouchableOpacity onPress={() =>   {
                        this.setState({ modalVisible: false })
                        this.props.navigation.navigate('Barcode')
                      }}>
                            <Image
                              style={{width:WIDTH/3,resizeMode:'contain'   }}
                              source={require('../images/galeri.png')} 
                          />
                    </TouchableOpacity>
                      </Col>
                   
                    </Row>
                    <Row></Row>
                    </View>
                </View>
            </Modal>
        </View>
       );

}
}
export default withNavigation(Footer);
const styles = StyleSheet.create({
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

});