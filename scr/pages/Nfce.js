import React,{useState,useEffect, useRef} from 'react';

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

import Logo from '../icons/elgin_logo.png'

import Header from '../components/Header'
import Footer from '../components/Footer'





const Nfce =()=> {
    const [productName,setProductName]=useState('');
    const [productPrice,setProductPrice]=useState('');
    const [emitionTime,setEmitionTime]=useState('');
    const [noteNumber,setNoteNumber]=useState('');
    const [serieNumber,setSerieNumber]= useState('');


    const configButtons =[
        {id:'configNfce',textButton:'CONFIGURAR NFCE'},
        {id:'sendSellNfce',textButton:'ENVIAR VENDA NFCE'}

    ]

    return(
        <View style={styles.mainView}>
            <View style={styles.contentView}>
                <View style={styles.bannerView}>
                    <Image style={styles.banner} source={Logo}/>
                </View>
                <View style={styles.menuView}>
                    <View style={styles.configView}>
                        <View style={styles.dataInputView}>
                            <Text style={styles.labelText}>NOME DO PRODUTO:</Text>
                            <TextInput
                                placeholder={'CAFE'}
                                style={styles.inputMensage}
                                keyboardType='default'
                                onChangeText={setProductName}
                                value={productName}        
                            />
                        </View>
                        <View style={styles.dataInputView}>
                            <Text style={styles.labelText}>PREÇO DO PRODUTO:</Text>
                            <TextInput
                                placeholder={'8,00'}
                                style={styles.inputMensage}
                                keyboardType='numeric'
                                onChangeText={setProductPrice}
                                value={productPrice}        
                            />
                        </View>
                        <View style={styles.configButtonsView}>
                            {configButtons.map(({id,textButton,onPress}, index)=>(                            
                                <TouchableOpacity 
                                    style={styles.doubleActionButton} 
                                    key={index}
                                    onPress={onPress}                                
                                >
                                <Text style={styles.buttonText}>{textButton}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.returnDataView}>
                            <Text style={styles.labelText}>TEMPO DE EMISSÃO:</Text>
                            <Text>{emitionTime}</Text>
                        </View>
                        <View style={styles.returnDataView}>
                            <View style={styles.returnDataText}>
                                <Text style={styles.labelText}>NOTA Nº:</Text>
                                <Text>{noteNumber}</Text>
                            </View>
                            <View style={styles.returnDataText}>
                                <Text style={styles.labelText}>SÉRIE Nº:</Text>
                                <Text>{serieNumber}</Text>
                            </View>
                            
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.configButtons}>
                            <Text style={styles.buttonText}>CONSULTAR ERRO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            
        </View>
    );
};

const styles = StyleSheet.create(
    {
  
    mainView:{
      flex:1,
      backgroundColor:'white',
  
    },
  
    contentView:{
      height:'100%',
      width:'90%',
      alignSelf:'center',
    },

    bannerView:{
      alignItems: 'center',
      justifyContent:'center',
    },
  
    banner:{
      resizeMode: 'contain',
      height: 140,
      width: 350
    },

    labelText:{
        fontWeight:'bold',
        fontSize:15,
        color:'black',
        alignItems:'center',
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize: 14,
    },
    
    menuView:{
      flexDirection:'column',
      justifyContent:'center',
      alignContent:'space-around',
      height:420,
      width:'100%',
      //backgroundColor:'blue',
     
    },

    configView:{
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        borderWidth:2,
        borderRadius:25,
        width:'100%',
        height:200,
        paddingHorizontal:10,
        marginBottom:10,
    },
    configButtonsView:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
    },
    doubleActionButton:{
        width:'49%',
        height:45,
        backgroundColor:'#0069A5',
        alignItems:'center',
        borderRadius:15,
        justifyContent:'center',
    },

    infoView:{

    },

    returnDataView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:2,
        borderRadius:25,
        width:'100%',
        height:70,
        paddingHorizontal:10,
        marginBottom:10,
    },
    returnDataText:{
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'49%',
    },

    buttonView:{

    },

    footerView:{
      position:'relative',
    },
  
    buttonMenu:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      borderWidth:2,
      borderRadius:25,
      width:'100%',
      height:100,
      
    },
    
    icon:{
      resizeMode: 'contain',
      width: 150,
      height: 60,
    },
  
    textButton: {
      fontWeight: 'bold',
      textAlign:'center',
    },

    dataInputView:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:'100%',
    },
    inputMensage:{
        textAlign: 'center',
        flexDirection:'row',
        width:'45%',
        borderBottomWidth:1,
        borderBottomColor:'black',
        textAlignVertical:'bottom',
        padding:0,
        fontSize:17,
    },
    configButtons:{
        width:'100%',
        height:70,
        backgroundColor:'#0069A5',
        alignItems:'center',
        borderRadius:15,
        justifyContent:'center',
    },
    
   });

export default Nfce;