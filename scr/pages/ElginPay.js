import React,{useRef, useState, useEffect} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    FlatList,
    TextInput
} from 'react-native';

import { DeviceEventEmitter } from 'react-native';
import ElginPayService from '../services/service_elginpay';

import moment from 'moment';
import Dialog from "react-native-dialog";
import CheckBox from '@react-native-community/checkbox';

import Header from '../components/Header'
import Footer from '../components/Footer'
import DialogButton from 'react-native-dialog/lib/Button';

const ElginPay =()=>{
  var elginPay = new ElginPayService();

  const [valor, setValor ]=useState("1000");
  const [formatValue,setFormatValue]=useState(" ")
  const [ numParcelas, setnumParcelas ] = useState("1");
  const [ paymentMeth,  setPaymentMeth ] = useState("Crédito");
  const [ installmentType, setInstallmentType ] = useState("3");

  const [customLayout,setCustomLayout]=useState(false);

  const [todayDate,setTodayDate] =useState(moment().utcOffset('-04:00').format("DD/MM/YY"));
  const [refCode,setRefCode] = useState("");
  const [isDialogVisible,setIsDialogvisible] = useState(false);

  const numIPRef = useRef(null);
  var isFirstTime = true;

  const buttonsTEFs = [
      {id:'PayGo', textButton: 'PayGo', onPress: () => changeTypeTEF('PayGo')},
      {id:'M-Sitef', textButton: 'M-Sitef', onPress: () => changeTypeTEF('M-Sitef')},
  ];

  const buttonsPayment = [
      {id:'Crédito', icon: require('../icons/card.png'), textButton: 'CRÉDITO',onPress:() => setPaymentMeth('Crédito')},
      {id:'Débito', icon: require('../icons/card.png'), textButton: 'DÉBITO',onPress:() => setPaymentMeth('Débito')},
  ];

  const buttonsInstallment = [
      {id:'3', icon: require('../icons/store.png'), textButton: 'LOJA', onPress: ()=> setInstallmentType('3')},
      {id:'2', icon: require('../icons/adm.png'), textButton: 'ADM ', onPress: ()=>setInstallmentType('2')},
      {id:'1', icon: require('../icons/card.png'), textButton: 'A VISTA', onPress: ()=> setInstallmentType('1')},
  ];

let actualEvent =DeviceEventEmitter.addListener(
    'lastTransitionOut',
    event=>{
        console.log("Retorno Transação React",event);
        Alert.alert("Retorno ElginPay",event);

        
    },
);


function changeLayout(isLayoutOn){
    if(isLayoutOn){
        setCustomLayout(true);
        
    }else{
        setCustomLayout(false);
    }
    elginPay.sendLayoutCustomization(isLayoutOn);
}




function formatEntries(){
    setTodayDate(moment().utcOffset('-04:00').format("DD/MM/YY"))
}

function sendActionTef(action){
    if(isEntriesValid(action)){
        formatEntries()
        sendElginPayParam(action);
    }
}

function isEntriesValid(action){
 
    if((paymentMeth === "Crédito") && (parseInt(numParcelas)  > 0) && (valor!="" && parseInt(valor)>=1)){
        return(true);
    }
    else if(paymentMeth==="Débito"&& (valor!="" && parseInt(valor)>=1) ){
        return(true);
    }else if((action==="CANCEL")&& (valor!="" && parseInt(valor)>=1)){
        return(true);
    }else{
        Alert.alert("Entradas inválidas","Por favor, insira valores de entrada válidos!")
    }
}



function sendElginPayParam(action){
    if(action ==="SALE"){
        if(paymentMeth==="Crédito"){
            elginPay.sendCreditPayment(valor.replace(/[^\d]+/g,''),installmentType,numParcelas);
            
           
        }else if (paymentMeth==="Débito"){
            elginPay.sendDebitPayment(valor.replace(/[^\d]+/g,''));
        }
    }
    if(action ==="CANCEL"){
        if(refCode!=" "){
            setIsDialogvisible(false)
            
            elginPay.sendCancelSell(valor.replace(/[^\d]+/g,''),refCode,todayDate);
        } else {
            Alert.alert("Código de Referência Vazio","Por favor, insira um código de referência válido")
        }
    }

    

    
    
  }

  function configElginPay(){
      elginPay.sendAdmTransaction();
  }

return(
    <View style={styles.mainView}>
        <Header textTitle="ELGIN PAY"/>         
          <View style={styles.configView}>
            <View style={styles.inputView}>
              <Text style={styles.labelText}>VALOR:</Text>
              <TextInput
                placeholder={'000'}
                style={styles.inputMensage}
                keyboardType='numeric'
                onChangeText={setValor}
                value={valor}              
              />                        
            </View>
            {paymentMeth !== "Débito" && (
                <>
                    < View style={styles.inputView}>
                        <Text style={styles.labelText}>Nº PARCELAS:</Text>
                        <TextInput
                            placeholder={'00'}
                            style={styles.inputMensage}
                            keyboardType='numeric'
                            onChangeText={setnumParcelas}
                            value={numParcelas}              
                        />
                    </View>
                </>
            )}
           
            <View marginBottom={15}>
              <View style={styles.paymentView}>
                  <Text style={styles.labelText}> FORMAS DE PAGAMENTO </Text>
                  <View style={styles.paymentsButtonView}>
                    {buttonsPayment.map(({id,icon,textButton,onPress}, index)=>(                            
                      <TouchableOpacity 
                          style={[styles.paymentButton, {borderColor: id === paymentMeth ? '#23F600':'black'}]} 
                          key={index}
                          onPress={onPress}                                
                      >
                      <Image style={styles.icon} source={icon}/>
                      <Text style={styles.buttonText}>{textButton}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                {paymentMeth !== "Débito" && (
                    <>
                        <View style={styles.paymentView}>
                            <Text style={styles.labelText}> TIPO DE PARCELAMENTO </Text>
                            <View style={styles.paymentsButtonView}>
                                {buttonsInstallment.map(({id,icon,textButton,onPress}, index)=>(
                                    <TouchableOpacity 
                                        style={[styles.paymentButton, {borderColor: id===installmentType ? '#23F600':'black'}]} 
                                        key={index}
                                        onPress={onPress}
                                        disabled={false}
                                    >
                                            <Image style={styles.icon} source={icon}/>
                                            <Text style={styles.buttonText}>{textButton}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </>
                )}
            </View>

            <View>
                <Dialog.Container visible={isDialogVisible}>
                    <Dialog.Title>Código de Referência</Dialog.Title>
                    <Dialog.Input label="Insira o código de referência"
                    onChangeText={setRefCode}
                    value={refCode}  
                    ></Dialog.Input>
                    <Dialog.Button label="CANCELAR" onPress={()=>setIsDialogvisible(false)}/>
                    <Dialog.Button label="OK" onPress={()=>sendActionTef('CANCEL')}/>
                    
                </Dialog.Container>
            </View>

            <View style={styles.checkBoxStyleView}>
                <CheckBox
                value={customLayout}
                onValueChange={newValue => changeLayout(newValue)}
                />
                <Text style={styles.optionText}>LAYOUT CUSTOMIZADO</Text>
            </View>
         
            <View marginBottom={80}>
              <View style={styles.submitionButtonsView}>
                  <TouchableOpacity style={styles.submitionButton} onPress={() => sendActionTef('SALE')} >
                      <Text style={styles.textButton}>
                          ENVIAR TRANSAÇÃO
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.submitionButton} onPress={()=> setIsDialogvisible(true)} >
                      <Text style={styles.textButton}>
                          CANCELAR TRANSAÇÃO
                      </Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.submitionButtonsView}>
                  <TouchableOpacity style={styles.configButton} onPress={() => configElginPay()}>
                      <Text style={styles.textButton}>
                          CONFIGURAÇÃO
                      </Text>
                  </TouchableOpacity>
              </View>
            </View>
            
      </View>
      <Footer/>
    </View>
  );
};
 
const styles = StyleSheet.create({
  mainView:{
    flex:1,
    alignItems:'center',
    backgroundColor:'white',
      
  },
  labelText:{
    fontWeight:'bold',
    fontSize:15,
    color:'black',
    alignItems:'center',
  },
  optionText:{
      fontSize:14,
      fontWeight:'bold',
      color:'black',
  },
  titleText:{
      textAlign:'center',
      fontSize:30,
      fontWeight:'bold',
  },
  menuView:{
      flexDirection:'column',
      width:'90%',
      height:'80%',
  },
  inputView:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:'100%',
  },
  inputMensage:{
      flexDirection:'row',
      width:'70%',
      borderBottomWidth:0.5,
      borderBottomColor:'black',
      textAlignVertical:'bottom',
      padding:0,
      fontSize:17,
  },
  configView:{
      flexDirection:'column',
      width:'90%',
      height:'80%',
      marginTop:50,
      

  },
  paymentView:{
      marginVertical:20,
  },
  paymentsButtonView:{
      flexDirection:'row',
  },  
  paymentButton:{
      justifyContent:'center',
      alignItems:'center',
      borderWidth:2,
      borderRadius:15,
      width:60,
      height:60,
      marginHorizontal: 5,
  },
  typeTEFButton: {
      justifyContent:'center',
      alignItems:'center',
      borderWidth:2,
      borderRadius:15,
      width:100,
      height:35,
      marginHorizontal: 5,
  },
  checkBoxStyleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon:{
      width:30,
      height:30,
    },
  submitionButtonsView:{
      marginTop: 5,
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
    
  },
  submitionButton:{
      width:'48%',
      height:45,
      backgroundColor:'#0069A5',
      alignItems:'center',
      borderRadius:15,
      justifyContent:'center',
  },
  configButton:{
    width:'100%',
    height:45,
    backgroundColor:'#0069A5',
    alignItems:'center',
    borderRadius:15,
    justifyContent:'center',
  },
  textButton:{
      color:'white',
      fontWeight:'bold',
      fontSize: 12,
  },
  titleReturnView:{
      marginBottom:10,
  },
  buttonText: {
      fontSize: 10,
      fontWeight: 'bold'
  }
});
 export default ElginPay;