import React, { Component } from 'react';
import { NavigationActions, DrawerItems, SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  View,ImageBackground, StyleSheet,Alert, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Container, Header, Content, Button,List, ListItem, Text,  Left, Body, Right, Switch } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
const {width:WIDTH, height: HEIGHT } = Dimensions.get('window');
export default class customDraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alt: 'kapa',
            bol: false,
            durum:'',
            restorantKodu:null,
            language:'',
            token:''
        }
    }
    
  async removeKey() {
    Alert.alert(
        '',
        'Çıkış Yapmak İstediğinize Emin miniz?' ,
        [
            {
                text:'Hayır',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Evet', onPress: async () => {
                  await AsyncStorage.removeItem('@myStores:access_token');
                    this.props.navigation.navigate('Register');
                },

            },
        ],
        { cancelable: false },
    );
}
    navigateToScreen = (route, gelen) => (
        () => {
            const navigateAction = NavigationActions.navigate({
                routeName: route,
                params: { gelen: gelen },
            });
            this.props.navigation.dispatch(navigateAction);
        })
      
    render() {
        return (
            <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.headerContainer} >
                    <Image source={require('../assets/fakto-logo-side.png')} style={styles.image} />
                </View>
                <View style={styles.screenContainer} >
                        <List>
                        <ListItem icon  onPress={()=>this.props.navigation.navigate('YeniSifre')}>
                            <Left>
                            </Left>
                            <Body>
                            <Text style={{color:'#042264',fontSize:WIDTH/20}}>Şifre Değiştir</Text>
                            </Body>
                            <Right>
                                <Icon name="angle-right" style={{color:'#042264',fontSize:WIDTH/20}}/>
                            </Right>
                        </ListItem>
                        </List>
                    </View>
                <View style={styles.screenLast} >
                <TouchableOpacity   onPress={() => {
                            this.removeKey();
                                }}  >
                            
                               <Image source={require('../assets/cikis.png')} style={{width:WIDTH/2,resizeMode:'contain'}} />
                            </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        color:'white',
        fontSize:14
    },
    headerContainer: {
       flex:2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        opacity:1,
        backgroundColor:'white'
    },
    image: {
        marginTop:20,
        resizeMode: 'contain',
        width:WIDTH/2,
    },
    imageIcon: {
       width:20,
       height:20,
        resizeMode: 'contain',

        opacity:1,
    },
    headerText: {
        width: '100%',
        height: 40,
        alignItems: 'center',
    },
    screenContainer: {
        width:'100%',
        flex: 7,
        marginTop:20,
        backgroundColor:'#D1D1D1',

    },
    screenLast: {
        width:'100%',
        flex: 1,
        backgroundColor:'#D1D1D1',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20
    },
    screenContainerGizle: {
        width: 0,
        height: 0,
        zIndex: -1,
        overflow: 'hidden',


    },
    screenStyle: {
        justifyContent: 'flex-start',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        position: 'relative',
        opacity:1,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
        marginTop: 10,
        marginHorizontal: 5,
    },
    screenStyleLast: {
        height: 60,
        flexDirection: 'row',
        position: 'relative',
        opacity:1,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
        marginTop: 10,
        marginHorizontal: 5,
    },
    screenTextStyle: {
        fontSize: 18,
        fontFamily: 'Muli-Regular',
        color: 'black'
    },
    altMenu: {
        justifyContent: 'flex-start',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#063048',
        position: 'relative',
        paddingLeft: 30,
        overflow: 'visible'
    },
    altMenuKap: {
        height: 0,
        overflow: 'hidden'
    },
    drawerDetay: {
        width: '100%',
        height: 500,
        zIndex: 1,
        overflow: 'visible',
    },
    drawerDetayGizle: {
        width: 0,
        height: 0,
        zIndex: -1,
        overflow: 'hidden',

    }
});
