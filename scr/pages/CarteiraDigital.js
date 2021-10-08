import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  Alert,
} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { back } from 'react-native/Libraries/Animated/Easing';
import { version } from 'react';
 


 
 const CarteiraDigital =()=> {
  const [accessToken, setAccessToken] = useState('');
  const [lastOrderId, setLastOrderId] = useState('');

  const [selectedProvider, setSelecteProvider] = useState('shipay');
  const [selectedWallet, setSelectedWallet] = useState('shipay-pagador');
  const [valor, setValor] = useState('10,00');

  const [image64, setImage64] = useState('');
  const [dataResponse, setDataResponse] = useState('');
  const [statusResponse, setStatusResponse] = useState('');
  const [walletResponse, setWalletResponse] = useState('');

  const [digitalWalletOptions, setDigitalWalletOptions] = useState([]);

  const actionButton = [
    {textButton: 'ENVIAR TRANSAÇÃO',},
    {textButton: 'CANCELAR TRANSAÇÃO', },
  ];

  const walletProviders = [
    {
      id: 'shipay',
      textButton: 'Shipay',
      onPress: () => setSelecteProvider('shipay'),
    },
  ];
 
return (
  <View style={styles.mainView}>
      <Header textTitle = "CARTEIRA DIGITAL" /> 
      <View style={styles.inputView}>
        <View style={styles.walletButtonOptionView}>
          {walletProviders.map(({id, textButton, onPress}, index) => (
            <TouchableOpacity
              style={[
              styles.walletOptionButton,
              {borderColor: id === selectedProvider ? '#23F600' : 'black'},
              ]}
            key={index}
            onPress={onPress}>
            <Text style={[styles.buttonText, {fontSize: 14}]}>
              {textButton}
            </Text>
          </TouchableOpacity>
          ))}
        </View>
        <View style={styles.walletButtonOptionView}>
          {digitalWalletOptions.map(({id, textButton, onPress}, index) => (
            <TouchableOpacity
              style={[
                styles.walletOptionButton,
                {borderColor: id === selectedWallet ? '#23F600' : 'black'},
              ]}
              key={index}
              onPress={onPress}>
              <Text style={[styles.buttonText, {fontSize: 14}]}>
                {textButton}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.inputValueView}>
          <Text style={styles.labelText}>VALOR: </Text>
          <TextInput
            placeholder={'000'}
            style={styles.inputValueStyle}
            keyboardType="numeric"
            onChangeText={setValor}
            value={valor}
          />
        </View>
        <View style={styles.actionButtonsView}>
          {actionButton.map(({textButton, onPress}, index) => (
            <TouchableOpacity
              style={styles.actionButtonStyle}
              key={index}
              onPress={onPress}>
              <Text style={styles.textButton}>{textButton}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sellButtonView}>
            <TouchableOpacity style={styles.sellButtonStyle}>
              <Text style={styles.textButton}>STATUS DA VENDA </Text>
            </TouchableOpacity>
        </View>
    </View>
  </View>
  );
 };
 
const styles = StyleSheet.create({
  mainView: {
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    padding:10,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  walletView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: '80%',
    justifyContent: 'space-between',
  },
  inputView: {
    width: '90%',
    height: '85%',
    padding: 1,
    
  },
  returnView: {
    width: '50%',
    height: '100%',
    padding: 15,
    borderWidth: 3,
    borderRadius: 7,
    borderColor: 'black',
    flexDirection: 'column',
  },
  walletButtonOptionView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  walletOptionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    minWidth: 100,
    height: 35,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  inputValueView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputValueStyle: {
    flexDirection: 'row',
    width: '70%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    textAlignVertical: 'bottom',
    padding: 0,
    fontSize: 17,
  },
  actionButtonsView: {
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    marginBottom:5,

  },
  actionButtonStyle: {
    width: '48%',
    height: 40,
    backgroundColor: '#0069A5',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  sellButtonView:{

  },
  sellButtonStyle:{
    width: '100%',
    height: 40,
    backgroundColor: '#0069A5',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',

  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
 
 export default CarteiraDigital;