import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {TextInput} from 'react-native-gesture-handler';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {back} from 'react-native/Libraries/Animated/Easing';
import {version} from 'react';

const ACCESS_KEY = 'HV8R8xc28hQbX4fq_jaK1A';
const SECRET_KEY =
  'ZBD0yR5ybNuHPKqvH0YEiL-hXzfsd4mbot5NuZQ75ZqpMFVuTN__mkFnbl7E6QbXYhVlohnBQ7GQaoLckrrmAA';
const CLIENT_ID =
  '8HMB1egUeKI-h9s4I3gU_w1R6kYifrUfZRrauhvjvX9y2bVoBdpoH7vVm3FZOfFejKB-rEIRjVHBEQxrW93iE40ljPwcVEgfZnKN5SvObHxHvXrgfg87A7aUOeWroajczHNt6KUOwB4-YH90RidhzIJhQ0GEjKwpQt93XJeC1XE';

const CarteiraDigital = () => {
  const [accessToken, setAccessToken] = useState('');
  const [lastOrderId, setLastOrderId] = useState('');

  const [selectedProvider, setSelecteProvider] = useState('shipay');
  const [selectedWallet, setSelectedWallet] = useState('shipay-pagador');
  const [valor, setValor] = useState('10,00');

  const [image64, setImage64] = useState('');
  const [dataResponse, setDataResponse] = useState('');
  const [statusResponse, setStatusResponse] = useState('');

  const [orderResponse, setOrderResponse] = useState({});
  const [showBtnPixDeepLink, setShowBtnPixDeepLink] = useState(false);

  useEffect(() => {
    authenticate();
  }, []);

  const walletProviders = [
    {
      id: 'shipay',
      textButton: 'Shipay',
      onPress: () => setSelecteProvider('shipay'),
    },
  ];

  const [digitalWalletOptions, setDigitalWalletOptions] = useState([]);

  const actionButton = [
    {textButton: 'ENVIAR TRANSAÇÃO', onPress: () => sendTransition()},
    {textButton: 'CANCELAR TRANSAÇÃO', onPress: () => sendCancelTransition()},
    {textButton: 'STATUS DA VENDA', onPress: () => sendStatusVenda()},
  ];

  async function authenticate() {
    const body = {
      access_key: ACCESS_KEY,
      secret_key: SECRET_KEY,
      client_id: CLIENT_ID,
    };
    try {
      const res = await fetch('https://api-staging.shipay.com.br/pdvauth', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
      });
      console.log('AUTENTICAÇÃO');
      const json = await res.json();
      setAccessToken(json.access_token);
      getWallets(json.access_token);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWallets(token) {
    try {
      const res = await fetch('https://api-staging.shipay.com.br/wallets', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method: 'GET',
      });
      const json = await res.json();
      console.log('GET WALLETS');
      const wallets = [
        ...json.wallets.map(wallet => ({
          id: wallet.name,
          textButton: wallet.name,
          onPress: () => setSelectedWallet(wallet.name),
        })),
      ];
      setDigitalWalletOptions(wallets);
    } catch (err) {
      console.error(err);
    }
  }

  async function sendTransition() {
    const valorAsFloat = parseFloat(valor.replace(',', '.'));
    const body = {
      order_ref: 'shipaypag-stg-005',
      wallet: selectedWallet,
      total: valorAsFloat,
      items: [
        {
          item_title: 'Produto Teste',
          unit_price: valorAsFloat,
          quantity: 1,
        },
      ],
      buyer: {
        first_name: 'Shipay',
        last_name: 'PDV',
        cpf: '000.000.000-00',
        email: 'shipaypagador@shipay.com.br',
        phone: '+55 11 99999-9999',
      },
    };
    const res = await fetch('https://api-staging.shipay.com.br/order', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    const json = await res.json();
    console.log('PEDIDO DE COMPRA');
    setImage64(json.qr_code);

    const date = new Date();
    const formattedDate =
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' ' +
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':' +
      date.getSeconds().toString().padStart(2, '0');

    setLastOrderId(json.order_id);
    setDataResponse(formattedDate);
    setStatusResponse(json.status);
    setOrderResponse(json);

    if (json.wallet == 'pix' || json.wallet == 'mercadopago') {
      setShowBtnPixDeepLink(true);
    } else {
      setShowBtnPixDeepLink(false);
    }
  }

  function sendCancelTransition() {
    Alert.alert(
      'CANCELAMENTO DE TRANSAÇÃO',
      'Deseja cancelar sua última venda?',
      [
        {
          text: 'Sim',
          onPress: () => doCancelTransition(),
        },
        {
          text: 'Não',
        },
      ],
    );
  }

  async function doCancelTransition() {
    const res = await fetch(
      `https://api-staging.shipay.com.br/order/${lastOrderId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        method: 'DELETE',
      },
    );
    const json = await res.json();
    console.log('VENDA CANCELADA');
    setStatusResponse(json.status);
  }

  async function sendStatusVenda() {
    const res = await fetch(
      `https://api-staging.shipay.com.br/order/${lastOrderId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        method: 'GET',
      },
    );
    const json = await res.json();
    console.log('STATUS VENDA');
    setStatusResponse(json.status);
  }

  async function onPressBtnPixDeepLink() {
    if (orderResponse.wallet === 'pix') {
      Clipboard.setString(orderResponse.qrCodeText);
      ToastAndroid.show('PIX COPIADO!', ToastAndroid.SHORT);
    } else if (orderResponse.wallet === 'mercadopago') {
      Linking.openURL(orderResponse.deep_link);
    }
  }

  function formattedStatus() {
    if (statusResponse === '') {
      return 'Desconhecido';
    }
    const traducoes = {
      approved: 'Aprovado',
      expired: 'Expirado',
      cancelled: 'Cancelado',
      refunded: 'Devolvido',
      pending: 'Pendente',
      refund_pending: 'Estorno Pendente',
    };
    return traducoes[statusResponse];
  }

  return (
    <View style={styles.mainView}>
      <Header textTitle="CARTEIRA DIGITAL" />
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
              <Text style={[styles.buttonText, {fontSize: 14,marginStart:textButton=="shipay-pagador"?10:0}]}>
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

        <View style={styles.returnView}>
          {lastOrderId !== '' && (
            <>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={{uri: image64}}
              />
              <View>
                <Text style={styles.labelText}>
                  Data da Venda: {dataResponse}
                </Text>
                <Text style={styles.labelText}>Valor: R$ {valor}</Text>
                <Text style={styles.labelText}>
                  Status: {formattedStatus()}
                </Text>
                <Text style={styles.labelText}>
                  Carteira: {orderResponse.wallet}
                </Text>
              </View>
            </>
          )}
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
          {showBtnPixDeepLink && (
            <TouchableOpacity
              style={styles.actionButtonStyle}
              onPress={onPressBtnPixDeepLink}>
              <Text style={styles.textButton}>
                {orderResponse.wallet == 'mercadopago'
                  ? 'ABRIR MERCADO PAGO'
                  : 'COPIAR PIX'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
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
    height: '88%',
    padding: 1,

  },
  returnView: {
    width: '100%',
    height: '63%',
    padding: 15,
    borderWidth: 3,
    borderRadius: 7,
    borderColor: 'black',
    flexDirection: 'column',
    marginBottom: 1,
  },
  walletButtonOptionView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  walletOptionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    width: '33%',
    height: 40,
    marginRight:1, 
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    
  },
  inputValueView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
   
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  actionButtonStyle: {
    width: '48%',
    height: 35,
    backgroundColor: '#0069A5',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 3,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default CarteiraDigital;
