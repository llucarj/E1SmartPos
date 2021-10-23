import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import Logo from '../icons/ElginDeveloperCommunity.png'
import Header from '../components/Header';

import PrinterService from '../services/service_printer';

const Printer =({navigation})=> {
  var printerService = new PrinterService();
  

  const [checked, setChecked] = useState('SMARTPOS');
  const [ipConection,setIpConection]=useState('192.168.0.31:9100');
  const [ isUsingPrinterExtern, setIsUsingPrinterExtern ] = useState(false);
  const [printerConectionType,setPrinterConectionType] = useState('intern');

  const buttonsPrinter = [
    {id:'TEXT', icon: require('../icons/printerText.png'), textButton: 'IMPRESSÃO DE TEXTO',onPress:()=> navigation.navigate('PrinterText',{conectionType:printerConectionType})},
    {id:'BARCODE', icon: require('../icons/printerBarCode.png'), textButton: 'IMPRESSÃO DE\nCÓDIGO DE BARRAS',onPress:()=> navigation.navigate('PrinterBarCode',{conectionType:printerConectionType})},
    {id:'IMAGE', icon: require('../icons/printerImage.png'), textButton: 'IMPRESSÃO\nDE IMAGEM',onPress:()=>navigation.navigate('PrinterImage',{conectionType:printerConectionType})},
  ];
  const functionButtons = [
    {id:'STATUS', icon: require('../icons/status.png'), textButton: 'STATUS IMPRESSORA',onPress:()=>actualStatusPrinter()},
    {id:'GAVETA', icon: require('../icons/status.png'), textButton: 'STATUS GAVETA',onPress:()=>actualStatusGaveta()},
    
  ];

  useEffect(() => {
    startConnectPrinterIntern();
  },[]);

  function actualStatusPrinter(){
    printerService.getStatusPrinter();

    let actualEvent = DeviceEventEmitter.addListener('eventStatusPrinter', event => {
        var actualReturn = event.statusPrinter;

        if(actualReturn === '5'){
            Alert.alert("Retorno", "Papel está presente e não está próximo!");
        }else if(actualReturn === '6'){
            Alert.alert("Retorno", "Papel está próximo do fim!");
        }else if(actualReturn === '7'){
            Alert.alert("Retorno", "Papel ausente!");
        }else{
            Alert.alert("Retorno", "Status Desconhecido");
        }
    });

    setTimeout(() => {
        actualEvent.remove();
    }, 2000)        
  };

  function actualStatusGaveta(){
    printerService.getStatusGaveta();

    let actualEvent = DeviceEventEmitter.addListener('eventStatusGaveta', event => {
        var actualReturn = event.statusGaveta;

        if(actualReturn === '1'){
            Alert.alert("Retorno", "Gaveta aberta!");
        }else if(actualReturn === '2'){
            Alert.alert("Retorno", "Gaveta fechada!");
        }else{
            Alert.alert("Retorno", "Status Desconhecido");
        }
    });

    setTimeout(() => {
        actualEvent.remove();
    }, 2000)        
  };

  function sendAbrirGaveta(){
    printerService.sendOpenGaveta();
  }

  function changePrinterChoose(value){
    if(value === "I9"){
        setIsUsingPrinterExtern(true);
        startConnectPrinterExtern();
    }else{
        setIsUsingPrinterExtern(false);
        startConnectPrinterIntern();
    }        
  };
  

  function startConnectPrinterIntern(){
    setChecked("SMARTPOS");
    setPrinterConectionType('intern');
    result = printerService.sendStartConnectionPrinterIntern();
  };

  function startConnectPrinterExtern(){
    if(ipConection !== ''){
        var ip = ipConection.split(":")[0];
        var port = ipConection.split(":")[1];

        if(isIpAdressValid()){
            printerService.sendStartConnectionPrinterExtern(
                ip,
                parseInt(port),
            );
            Alert.alert("Retorno","Impressora Externa Conectar");
            setChecked("I9");
            setPrinterConectionType('extern');
        }else{
            Alert.alert("Alert", "Digíte um endereço e porta IP válido!");
        }   
    }else{
        Alert.alert("Alert", "Digíte um endereço e porta IP válido!");
    }
  };

  function isIpAdressValid(){
    let ipValid = false;

    if((/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?[0-9][0-9])$/.test(ipConection))){
        ipValid = true;
        return ipValid;
    }else{
        ipValid = false;
        return ipValid;
    };
  };

  return (

  <View style={styles.mainView}>
    <Header textTitle = "IMPRESSORA" />
    <View style={styles.contentView}> 
      <View style={styles.printerOptionView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>                            
          <RadioButton
            value="SMARTPOS"
            color="#0069A5"
            status={ checked === 'SMARTPOS' ? 'checked' : 'unchecked' }
            onPress={()=> changePrinterChoose('SMARTPOS')}
          />
          <Text style={styles.labelText}>IMP. INTERNA</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>                            
          <RadioButton
            value="I9"
            color="#0069A5"
            status={ checked === 'I9' ? 'checked' : 'unchecked' }
            onPress={()=> changePrinterChoose('I9')}
          />
          <Text style={styles.labelText}>IMP. EXTERNA</Text>
        </View>  
      </View>
      <View style={styles.conectionView}>
        <Text style={styles.ipTextLabel}>IP:</Text>
        <TextInput                                                                
          style={styles.inputMensage}
          placeholder="192.168.0.1:9100"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType='default'
          autoCorrect={false}
          value={ipConection}
        />
      </View>
      <View style={styles.printerButtonsView}>
        {buttonsPrinter.map(({id,icon,textButton,onPress}, index)=>(
          <TouchableOpacity 
            style={[styles.buttonMenu]} 
            key={index}
            onPress={onPress}
          >
            <Image style={styles.icon} source={icon}/>
            <Text style={styles.menuTextButton}>{textButton}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.functionButtonsView}>
        {functionButtons.map(({id,icon,textButton,onPress}, index)=>(
          <TouchableOpacity 
            style={[styles.statusButton]} 
            key={index}
            onPress={onPress}
          >
            <Image style={styles.statusIcon} source={icon}/>
            <Text style={styles.statusButtonTXT}>{textButton}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <TouchableOpacity style={styles.actionButton} onPress={() =>statusGaveta()}>
          <Text style={styles.actionButtonTXT}>ABRIR GAVETA</Text>
        </TouchableOpacity>

      </View>
    </View>
       
  </View>    
  );
 };
 
 const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    
  },
  contentView:{
    padding:40,
   
  },
  printerOptionView:{
    flexDirection:'row',
    justifyContent:'space-between',

  },
  conectionView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
    width:'100%',

  },
  printerButtonsView:{
    
  },
  functionButtonsView:{

  },
  labelText:{
    fontWeight:'bold',
    fontSize:15,
  },
  ipTextLabel:{
    fontWeight:'bold',
    fontSize:20,
  },
  inputMensage:{
    fontSize: 16,
    color: 'black',
  },
  buttonMenu:{
    borderWidth:2,
    borderColor:'black',
    width:'100%',
    height:80,
    fontWeight:'bold',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:2.5,
  },
  menuTextButton:{
    textAlign:'center',
    fontSize:10,
    fontWeight: 'bold',
    color:'black',
  },
  icon:{
    width:40,
    height:40,
  },
  statusIcon:{
    width:40,
    height:40,
    marginRight:10,
  },
  statusButtonTXT:{
    fontSize:12,
    textAlign:'center',
    color:'black',
    fontWeight:'bold',
   
  },
  statusButton:{
    flexDirection:'row',
    width:'100%',
    height:50,
    borderWidth:2,
    borderRadius:18,
    borderColor:'black',
    alignItems:'center',
    marginBottom:5,
    justifyContent:'flex-start',
    padding:10,
  },
  actionButton:{
    width:'100%',
    height:50,
    backgroundColor:'#0069A5',
    alignItems:'center',
    borderRadius:15,
    justifyContent:'center',
  },
  actionButtonTXT:{
    color:'white',
    fontWeight:'bold',
  },
});
 
 export default Printer;
 