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

import Header from '../components/Header'
import Footer from '../components/Footer'

const ElginPay =()=>{

  const [ selectedOptionTEF, setSelectedOptionTEF ] = useState("");

  const [ listOfResults, setListOfResults ] = useState([]);

  const [ typeTEF, setTypeTEF ] = useState("PayGo");

  const [ image64, setImage64 ] = useState("");

  const [ valor, setValor ]=useState("1000");
  const [ numParcelas, setnumParcelas ] = useState("1");
  const [ numIP, setNumIP ] = useState("192.168.0.00");
  const [ paymentMeth,  setPaymentMeth ] = useState("Crédito");
  const [ installmentType, setInstallmentType ] = useState("Avista");

  const numIPRef = useRef(null);
  var isFirstTime = true;

  const buttonsTEFs = [
      {id:'PayGo', textButton: 'PayGo', onPress: () => changeTypeTEF('PayGo')},
      {id:'M-Sitef', textButton: 'M-Sitef', onPress: () => changeTypeTEF('M-Sitef')},
  ];

  const buttonsPayment = [
      {id:'Crédito', icon: require('../icons/card.png'), textButton: 'CRÉDITO',onPress:() => setPaymentMeth('Crédito')},
      {id:'Débito', icon: require('../icons/card.png'), textButton: 'DÉBITO',onPress:() => setPaymentMeth('Débito')},
      {id:'Todos', icon: require('../icons/voucher.png'), textButton: 'TODOS',onPress:() => setPaymentMeth('Todos')},
  ];

  const buttonsInstallment = [
      {id:'Loja', icon: require('../icons/store.png'), textButton: 'LOJA', onPress: ()=> setInstallmentType('Loja')},
      {id:'Adm', icon: require('../icons/adm.png'), textButton: 'ADM ', onPress: ()=>setInstallmentType('Adm')},
      {id:'Avista', icon: require('../icons/card.png'), textButton: 'A VISTA', onPress: ()=> setInstallmentType('Avista')},
  ];

  function changeTypeTEF(tefChoosed){
    if(tefChoosed === "M-Sitef"){
        if(installmentType === "Avista") setInstallmentType("Loja");
        setTypeTEF("M-Sitef");
        
    }else{
        setTypeTEF("PayGo");
    }
}
  
return(
    <View style={styles.mainView}>
        <Header textTitle={'ELGIN PAY'}/>         
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
            <View style={styles.inputView}>
                <Text style={styles.labelText}>Nº PARCELAS:</Text>
                <TextInput
                    placeholder={'00'}
                    style={styles.inputMensage}

                    keyboardType='numeric'
                    onChangeText={setnumParcelas}
                    value={numParcelas}              
                />
            </View>
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
                <View style={styles.paymentView}>
                    <Text style={styles.labelText}> TIPO DE PARCELAMENTO </Text>
                    <View style={styles.paymentsButtonView}>
                        {buttonsInstallment.map(({id,icon,textButton,onPress}, index)=>(
                            <TouchableOpacity 
                                style={[styles.paymentButton, {borderColor: id===installmentType ? '#23F600':'black'}]} 
                                key={index}
                                onPress={onPress}
                                disabled={id === "Avista" && typeTEF === "M-Sitef" ? true : false}
                            >
                                    <Image style={styles.icon} source={icon}/>
                                    <Text style={styles.buttonText}>{textButton}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
              </View>
            </View>
            <View marginBottom={80}>
              <View style={styles.submitionButtonsView}>
                  <TouchableOpacity style={styles.submitionButton} onPress={() => startActionTEF('SALE')} >
                      <Text style={styles.textButton}>
                          ENVIAR TRANSAÇÃO
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.submitionButton} onPress={() => startActionTEF('CANCEL')} >
                      <Text style={styles.textButton}>
                          CANCELAR TRANSAÇÃO
                      </Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.submitionButtonsView}>
                  <TouchableOpacity style={styles.configButton} onPress={() => startActionTEF('CONFIGS')}>
                      <Text style={styles.textButton}>
                          CONFIGURAÇÃO
                      </Text>
                  </TouchableOpacity>
              </View>
            </View>
            <Footer/>
      </View>
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