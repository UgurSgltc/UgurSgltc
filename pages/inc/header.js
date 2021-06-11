import React, { Component } from 'react';
import { Container, Header, Title,  Button, Left, Right, Body, Icon, Text } from 'native-base';
import {StatusBar,Dimensions,TouchableOpacity,Image,StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { withNavigation } from 'react-navigation';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class Menu extends Component {
  render() {
    return (
        <Header androidStatusBarColor='white'  style={
          this.props.borderNo!='a' ? 
          {backgroundColor:'#14a0de',borderBottomColor:'white',borderBottomWidth:1}:
        {backgroundColor:'#14a0de',elevation: 0, shadowOffset: {height: 0, width: 0},shadowOpacity: 0}
        }>  
        <StatusBar backgroundColor="#14a0de" barStyle="light-content" />

        <Left>
          {this.props.backNo == "a" ?null :
            <Button transparent  onPress={() => this.props.navigation.goBack()}>
             <AntDesign  name='left' style={{color:'white',fontSize:25}}/>
            </Button>
           }
           {this.props.profil != null ?
            <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
            <AntDesign  name='user' style={{color:'white',fontSize:25}}/>
                </Button>
          : null 
           
            }
            {this.props.backtoTalepler == "a" ? <Button transparent  onPress={() =>this.props.navigation.navigate('Taleplerim')}>
             <AntDesign  name='left' style={{color:'white',fontSize:25}}/>
            </Button>:
            null
            
           }
            </Left>
            {this.props.yer != '' ? 
            <Body style={{ textAlign:'center',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                width:WIDTH/2,
               }}>
                
                <Text style={{color:'white',fontSize:WIDTH/25,fontWeight:'bold',textAlign:'center'}}>{this.props.yer}</Text>  
                {this.props.alt !=null? 
                 <Text style={{color:'white',fontSize:WIDTH/35,textAlign:'center'}}>
                      {this.props.alt}
                 </Text>  
              :null}
               
              
            </Body>
                        :

                    <Body style={{ textAlign:'center',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                    width:WIDTH/10,
                    }}>
                    <Image
                    style={{width:WIDTH/4,resizeMode:'contain',left:WIDTH/10}}
                    source={require('../assets/fakto-logo.png')} 
                    />
                    </Body>
                }
            <Right >
            {this.props.bildirim == "a" ?
             <Button transparent  onPress ={() =>  this.props.navigation.navigate('Bildirimler')}>
             <Image
                 style={{width:25,resizeMode:'contain'}}
             source={require('../assets/bildirim.png')} 
         />
                 </Button>
           : null 
           
                }
            </Right>
          </Header>
    );
  }
}


export default withNavigation(Menu);
const styles = StyleSheet.create({
icon : {
  color:'black'
},
yer:{
textAlign:'center',
justifyContent:'center',
alignItems:'center',
},
settingImage2:{
  width:30,
  height:30,
  resizeMode: 'contain'
},
});