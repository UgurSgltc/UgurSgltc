import React, { Component } from 'react';
import { Container, Row, Grid, View } from 'native-base';
import { Text, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';

 class FaturaModal extends Component {
  state = {
    modalFatura: false,
  };

  setModalFatura(visible) {
    this.setState({ modalFatura: visible });
  }
  render() {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalFatura}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <Grid style={styles.main}>
          <Image
                source={require('../images/logo-beyaz-modal.png')}
                style={{marginTop:-20,position:'absolute'}}
              />
            <Row >
             
              <Text style={styles.text}>Fatura Çek Tutarından Düşük</Text>
            </Row>
            <Row >
             
              <Text style={styles.text}>Toplam fatura tutarınız, çek tutarına
                eşit ya da fazla olmalıdır.
                </Text>
            </Row>
            <Row style={styles.secondrow}>
              <Grid style={styles.main2}>

                <Row style={styles.row1}>
                  <TouchableOpacity style={styles.button1}>
                    <Text style={styles.button1text}> YENİDEN DENE </Text>
                    <Image
                      source={require('../images/reactangle-modal.png')}

                    />
                  </TouchableOpacity>
                </Row>
                <Row style={styles.row2}>
                  <TouchableOpacity style={styles.button2}>
                    <Text style={styles.button2text}> YENİ ŞİFRE AL </Text>
                    <Image
                      source={require('../images/reactangle-modal.png')}

                    />
                  </TouchableOpacity>
                </Row>
              </Grid>
            </Row>
          </Grid>

        </Modal>
    );
  }
}


export default withNavigation(FaturaModal);
const styles = {
  cont: {
    width: 414,
    height: 736,
    backgroundColor: "rgba(1, 16, 49, 0.87)"
  },
  main: {
    width: 288,
    height: 252,
    alignItems: 'center',
    backgroundColor: "#c63131", //c63131
    flex: 0,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'

  },
  main2: {
    alignItems: 'center',
  },
  secondrow: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  text: {
    width: 190,
    height: 24,
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
   marginTop: 60

  },
  button1: {
    width: 234,
    // height: 36,
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#c63131"
  },
  button1text: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 35,
    letterSpacing: 0.42,
    textAlign: "center",
    color: "#c63131"
  },
  button2: {
    width: 234,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#c63131",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#c63131"
  },
  button3: {
    width: 100,
  },
  button2text: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 35,
    letterSpacing: 0.42,
    textAlign: "center",
    color: "#ffffff"
  },
  row1: {
    width: 234,
    height: 36,
    marginBottom: 24,
    marginTop: 15,
  },
  row2: {
    width: 234,
    height: 36,
  }
};