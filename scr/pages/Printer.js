import React, { useState } from 'react';
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

const Printer =()=> {

  const navigation = useNavigation();

  const [printerOption, setPrinterOption] = useState('IMP. INTERNA');
  const [checked, setChecked] = useState('M8');
  const [ipConection,setIpConection]=useState('192.168.0.31:9100');

  const buttonsPrinter = [
    {id:'TEXT', icon: require('../icons/printerText.png'), textButton: 'IMPRESSÃO DE TEXTO',onPress:()=> navigation.navigate('PrinterText')},
    {id:'BARCODE', icon: require('../icons/printerBarCode.png'), textButton: 'IMPRESSÃO DE\nCÓDIGO DE BARRAS',onPress:()=> navigation.navigate('PrinterBarCode')},
    {id:'IMAGE', icon: require('../icons/printerImage.png'), textButton: 'IMPRESSÃO\nDE IMAGEM',onPress:()=>navigation.navigate('PrinterImage')},
  ];
  const functionButtons = [
    {id:'STATUS', icon: require('../icons/status.png'), textButton: 'STATUS IMPRESSORA'},
    {id:'GAVETA', icon: require('../icons/status.png'), textButton: 'STATUS GAVETA'},
    
  ];

  return (
  <View style={styles.mainView}>
    <Header textTitle = "IMPRESSORA" />
    <View style={styles.contentView}> 
      <View style={styles.printerOptionView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>                            
          <RadioButton
            value="ElginPay"
            color="#0069A5"
            status={ checked === 'ElginPay' ? 'checked' : 'unchecked' }
            onPress={()=> setChecked('ElginPay')}
          />
          <Text style={styles.labelText}>IMP. INTERNA</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>                            
          <RadioButton
            value="I9"
            color="#0069A5"
            status={ checked === 'I9' ? 'checked' : 'unchecked' }
            onPress={()=> setChecked('I9')}
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
        <TouchableOpacity style={styles.actionButton}>
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
 