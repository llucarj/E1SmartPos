import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  DeviceEventEmitter,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import Logo from '../../icons/ElginDeveloperCommunity.png';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import PrinterService from '../../services/service_printer';

const PrinterImage = ({route}) => {
  var printerService = new PrinterService();
  // Variáveis de Entrada
  const [isCutPaperActive, setIsCutPaperActive] = useState(false);
  const [image, setImage] = useState('');
  const [pathImage, setPathImage] = useState('');

  //Abre o picker de imagem
  const chooseImage = () => {
    printerService.choosePrinterImage();

    let actualEvent = DeviceEventEmitter.addListener(
      'eventChoosePrinterImage',
      path => {
        var finalPath = 'content://media' + path;
        setPathImage(finalPath);
        setImage({uri: finalPath});
        console.log('RETURN: ', finalPath);
      },
    );

    setTimeout(() => {
      actualEvent.remove();
    }, 2000);
  };

  function doPrinterImage() {
    //REALIZA A LIMPEZA DO URI PADRÃO REMOVENDO A PARTE INICIAL
    var newPathImage = pathImage.split('file://')[1];

    //SE NENHUMA IMAGEM FOI SELECIONADA NO DISPOSITIVO
    //ENVIA INFORMAÇÃO PARA IMPRIMIR IMAGEM PADRÃO DO APP - elgin.jpg
    if (pathImage === '') {
      printerService.sendPrinterImage('elgin', false);
    } else {
      printerService.sendPrinterImage(newPathImage, false);
    }

    printerService.jumpLine(10);
    if (isCutPaperActive) {
      printerService.cutPaper(10);
    }
  }

  return (
    <View style={styles.mainView}>
      <Header textTitle="IMPRESSORA" />
      <View style={styles.titleView}>
        <Text style={styles.titleText}>IMPRESSÃO DE IMAGEM</Text>
        <Text style={styles.subTitleText}>PRÉ-VISUALIZAÇÃO</Text>
      </View>

      <View style={styles.uploadedImageView}>
        {image ? (
          <Image
            style={styles.imageZone}
            width={250}
            height={250}
            resizeMode="contain"
            source={image}
          />
        ) : (
          <Image style={styles.imageZone} resizeMode="contain" source={Logo} />
        )}
      </View>

      <View style={styles.imageStyleSettingsView}>
        <View style={styles.imageStyleOptionsView}>
          <View style={styles.checkBoxStyleView}>
            <CheckBox
              disabled={route.params.conectionType === 'intern' ? true : false}
              value={isCutPaperActive}
              onValueChange={newValue => setIsCutPaperActive(newValue)}
            />
            <Text style={styles.optionText}>CUT PAPER</Text>
          </View>
        </View>
      </View>
      <View style={styles.submitButtonsView}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => chooseImage('photo')}>
          <Text style={styles.textButton}>SELECIONAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => doPrinterImage()}>
          <Text style={styles.textButton}>IMPRIMIR</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitleText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  optionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
  },
  titleView: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  uploadedImageView: {
    alignItems: 'center',
    height: 180,
    justifyContent: 'center',
    marginVertical: 15,
  },
  imageZone: {
    width: 300,
    height: 300,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#0069A5',
    backgroundColor: '#0069A5',
    height: 50,
    width: '100%',
    marginVertical: 5,
  },
  imageStyleSettingsView: {
    flexDirection: 'column',
  },
  imageStyleOptionsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageTypePicker: {
    width: 150,
    height: 50,
  },
  imageStylePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxStyleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonsView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 40,
  },
});

export default PrinterImage;
