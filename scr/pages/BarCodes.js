import React,{useState,useEffect, useRef} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
  } from 'react-native';

  import Header from '../components/Header'
  import Footer from '../components/Footer'

  import BarCodeService from '../services/service_barCode';

 
 const BarCodes =()=> {

  var serviceBarCode = new(BarCodeService);
  const inputOne = useRef();
  const inputTwo = useRef();
  const inputThree = useRef();
  const inputFour = useRef();
  const inputFive = useRef();

 
 
  const [ firstInput, setFirstInput ] = useState("");
  const [ secondInput, setSecondInput ] = useState("");
  const [ thirdInput, setTirthInput ] = useState("");
  const [ fourthInput, setFourthInput ] = useState("");
  const [ fifthInput, setFifthInput ] = useState("");

  function clearAllOfInputs(){
    setFirstInput("");
    setSecondInput("");
    setTirthInput("");
    setFourthInput("");
    setFifthInput("");
  }
   return (
    <View style={styles.mainView}>
      <Header textTitle={"CÓDIGO DE BARRAS"}/>
      <View style={styles.mainBarCodesView}>
          <View style={styles.barCodesView}>
              <View style={styles.showBarCodesView}>
                <View style={styles.containerInputMessages}> 
                  <TextInput                                
                    returnKeyType="next"
                    ref={inputOne}
                    onSubmitEditing={() =>  inputTwo.current.focus()}
                    blurOnSubmit={false}

                    style={styles.inputMensage}
                    onChangeText={setFirstInput}
                    value={firstInput}
                  />
                </View>
                <View style={styles.containerInputMessages}>
                    <TextInput                                                                
                      returnKeyType="next"
                      ref={inputTwo}
                      onSubmitEditing={() => inputThree.current.focus()}
                      blurOnSubmit={false}
                      editable={firstInput !== "" ? true : false}
                      style={styles.inputMensage}
                      onChangeText={setSecondInput}
                      value={secondInput}
                    />
                </View>

                <View style={styles.containerInputMessages}>
                  <TextInput                                                                
                    returnKeyType="next"
                    ref={inputThree}
                    onSubmitEditing={() => inputFour.current.focus()}                                
                    blurOnSubmit={false}
                    editable={secondInput !== "" ? true : false}
                    style={styles.inputMensage}
                    onChangeText={setTirthInput}
                    value={thirdInput}
                  />
                </View>
                <View style={styles.containerInputMessages}>
                  <TextInput                                                                
                    returnKeyType="next"
                    ref={inputFour}
                    onSubmitEditing={() => inputFive.current.focus()}                                
                    blurOnSubmit={false}
                    editable={thirdInput !== "" ? true : false}

                    style={styles.inputMensage}
                    onChangeText={setFourthInput}
                    value={fourthInput}
                  />
                </View>                 
                <View style={styles.containerInputMessages}>
                  <TextInput                                                                
                    returnKeyType="next"
                    onSubmitEditing={() => inputSix.current.focus()}
                    ref={inputFive}
                    blurOnSubmit={false}
                    editable={fourthInput !== "" ? true : false}
                    style={styles.inputMensage}
                    onChangeText={setFifthInput}
                    value={fifthInput}
                  />
                </View>    
              </View>
              <TouchableOpacity style={styles.submitionButton} onPress={()=>serviceBarCode.runReadCode()}>
                <Text style={styles.textButton}>
                    REALIZAR LEITURA DE CÓDIGO DE BARRAS
                </Text>
              </TouchableOpacity>
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
      fontSize:20,
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
  textButton:{
      color:'white',
      fontWeight:'bold',
      fontSize:15,
  },
  buttonsView:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',
  },
  submitionButton:{
      width:'100%',
      height:54,
      backgroundColor:'#0069A5',
      alignItems:'center',
      borderRadius:20,
      justifyContent:'center',
  },
  mainBarCodesView:{
      alignItems:'center',
      width:'90%',
      height:'85%',
      justifyContent:'center',
  },
  barCodesView:{
      flexDirection:'column',
      height:'80%',
      width:'100%',
  },
  showBarCodesView:{
      borderWidth:2,
      borderRadius:15,
      width:'100%',
      height:'90%',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:10,
 
  },
  barCodeText:{
      width:'84%',
      height:30,
      textAlign:'center',
      textAlignVertical:'center',
      borderWidth:2,
      borderColor:'black',
      borderRadius:5,

  },
  barCodeIcon:{

     width:'15%',
     height:25,


  },
  statusText:{
      width:'50%',
  },
  containerInputMessages: {
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
      marginVertical: 1,
     
  },
  inputMensage:{
    alignContent:'center',
      width:'90%',
      height:55,
      borderWidth: 1,
      borderRadius: 10,
      borderBottomColor:'black',
      textAlignVertical:'bottom',
      padding:10,
      fontSize: 30,
      marginLeft: 10,
    
  },
});
 
 export default BarCodes;