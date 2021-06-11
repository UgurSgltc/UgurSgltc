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
    Image,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import { Container, Grid, Button,Form, Header,Col,Row,SwipeRow, Left,Thumbnail, Body,Icon,Textarea, Right, Content,Item,Input,Picker, Label,List,ListItem } from 'native-base';
  import { Subtitle,} from '@shoutem/ui';
  
import {
  TextInputMask
} from 'react-native-masked-text';
import { withNavigation } from 'react-navigation';
import Menu from '../inc/header';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
class bildirimler extends Component {
    constructor(props) {
        super(props);
        this.state = {
          refreshing:true,
          bildirimler:[]
        }
      }
      _onRefresh() {
        this.bildirimler();
      }
      componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => {
          this.bildirimler()
            });
      }
      
async bildirimKapat(id){
  try{
    let response = await fetch(`https://pro.faktodeks.com//api/bildirimKapat`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id : id,
        }),
    });
    console.log(response);
    if (response.status == '200' || response.status == '201') {
        let responseJson = await response.json();
        this.bildirimler()
    } else {
        this.setModalLoading(false);
      this.setState({ hata: '1'})
    }

  }
  catch(error){

  }
}
      async bildirimler() {
        try {
          const myToken = await AsyncStorage.getItem('@myStores:access_token');
            let response = await fetch(`https://pro.faktodeks.com//api/getBildirimler/${myToken}`, {
                method: 'get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
      
            if (response.status == '200' || response.status == '201') {
                let responseJson = await response.json();
                this.setState({ bildirimler: responseJson, refreshing:false })
            } else {
                Alert.alert(
                    '',
                    'Kategoriler Getirilemedi!',
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
      
  render() {
    return (
        <Container >
        <ImageBackground source={require('../images/Background.png')}  style={{width: '100%', height: '100%'}}>
          <Menu yer="Bildirimler"/>
          <Content >
                  <FlatList
                    numColumns={1}
                    data={this.state.bildirimler}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => (item + index).toString()}
                    refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          tintColor={'#313131'}
                          title={'Yükleniyor'}
                          titleColor={'#313131'}
                          onRefresh={this._onRefresh.bind(this)}
                      />
                  }
                  ListHeaderComponent={
                    this.state.bildirimler == '' ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20,padding:20 }} >
                          <Text style={{ fontSize: 16,textAlign:'center',color:'white' }} >{this.state.refreshing == false ? 'Henüz Bildiriminiz Bulunmamaktadır' : null}  </Text>
                      </View> : null
                  }
                    renderItem={({ item }) => (
                  <List  >
                  <ListItem itemDivider style={{backgroundColor:'transparent'}}>
                    <Text style={{color:'#00FFF5',paddingLeft:10}}>{item.tarih_son}</Text>
                    </ListItem>   
                   
                  <SwipeRow
                 
                      rightOpenValue={-75}
                      body={
                        item.which == 1 ?
                        <TouchableOpacity style={{backgroundColor:'white',width:'100%',flexDirection:'row',alignItems:'center'}}

                      
                          //  onPress={() =>  this.props.navigation.navigate('Teklifler',{cek_id:item.id,guncellenme:item.fark})}>
                           
                        onPress={() =>  this.props.navigation.navigate('Talepler')}>  
                                                                                  
                          <View style={{flex:1}}>
                            <Image square small source={require('../assets/modal-logo.png')} style={{resizeMode:'contain',width:WIDTH/6}}/>
                          </View>
                          <View style={{flex:4}}>
                           <Text style={{textAlign:'left',color:'black'}}>{item.title}</Text>
                          </View>
                        
                        </TouchableOpacity>
                        :    <TouchableOpacity style={{backgroundColor:'white',width:'100%',flexDirection:'row',alignItems:'center'}}

                        onPress={() =>  this.props.navigation.navigate('Talepler')}>
                    
                          <View style={{flex:1}}>
                            <Image square small source={require('../assets/modal-logo.png')} style={{resizeMode:'contain',width:WIDTH/6}}/>
                          </View>
                          <View style={{flex:4}}>
                           <Text style={{textAlign:'left',color:'black'}}>{item.title}</Text>
                          </View>
                  
                        </TouchableOpacity>
                      }
                      right={
                        <Button style={{backgroundColor:'red',flexDirection:'row'}} onPress={() => this.bildirimKapat(item.id)}>
                            <Image square small source={require('../images/ic-actions-trash.png')} style={{resizeMode:'contain',width:WIDTH/9}}/>
                          <Text style={{color:'white',marginRight:5}}>Sil</Text>
                        </Button>
                      }
                    />
                  
                  </List>

                      )} /> 

                 </Content>
            
              
    </ImageBackground>
  </Container>
       );

}
}
export default withNavigation(bildirimler);
const styles = StyleSheet.create({
 
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