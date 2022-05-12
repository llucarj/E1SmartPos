import React,{ useEffect, useState} from 'react';
import {View, Text, StyleSheet,TextInput, TouchableOpacity, Alert} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import RadioForm from 'react-native-simple-radio-button';
import {Picker} from '@react-native-picker/picker';
 
import Header from '../../components/Header';

import PrinterService from '../../services/service_printer';

import XmlNFCe from '../../services/service_xmlNFCe';
import XmlSAT from '../../services/service_xmlSAT';

const alignTextOptionData = [
    {
        label: 'ESQUERDA',
        value: 'Esquerda'
    },
    {
        label: 'CENTRALIZADO',
        value: 'Centralizado'
    },
    {
        label: 'DIREITA',
        value: 'Direita'
    }
];

const PrinterText = ({route}) =>{

    var printerService = new PrinterService();
    

    const [text, setText] = useState("ELGIN DEVELOPER COMMNUNITY");
    const [selectedFontFamily, setSelectedFontFamily] = useState('FONT A');
    const [selectedFontSize, setSelectedFontSize] = useState(17);
    const [optionTextAlign,setOptionTextAlign]=useState("Esquerda");

    const [isBold,setIsBold]=useState(false);
    const [isUnderline,setIsUnderline]=useState(false);
    //const [isCutPaperActive,setIsCutPaperActive]=useState(false);
    
    
    const checkBoxType = [
        {id:'NEGRITO', textButton: 'NEGRITO', value:isBold ,setValue: (value) => setIsBold(value)},
        {id:'SUBLINHADO', textButton: 'SUBLINHADO', value: isUnderline ,setValue: (value) =>setIsUnderline(value)},
        /*{id:'CUT-PAPER', textButton: 'CUTPAPER', value:isCutPaperActive ,setValue: (value) =>setIsCutPaperActive(value)},*/
    ]

    const buttonOptionRender=[
        {id:'NFCE', textButton: 'NFCE',onPress:()=>doPrinterXmlNFCe() },
        {id:'SAT', textButton: 'SAT',onPress:()=>doPrinterXmlSAT() },
    ]  

    function doPrinterText(){
        if(text === ''){
            Alert.alert("Alerta", "Campo mensagem vazio!");
        }else{
            printerService.sendPrinterText(
                text,
                optionTextAlign,
                isBold,
                isUnderline,
                selectedFontFamily,
                parseInt(selectedFontSize),
            );
            printerService.jumpLine(10);
            /*
            if(route.params.conectionType==="extern"){
                if(isCutPaperActive) printerService.cutPaper(10);
            }*/
        }

    

    }

    function doPrinterXmlNFCe(){
        var xml_nfce = new XmlNFCe();
        var xmlNFCE = xml_nfce.getXmlNFCe();

        printerService.sendPrinterNFCe(xmlNFCE, 1, "CODIGO-CSC-CONTRIBUINTE-36-CARACTERES", 0);

        printerService.jumpLine(10);
        /*
        if(route.params.conectionType==="extern"){
            if(isCutPaperActive) printerService.cutPaper(10);
        }*/
    }

    function doPrinterXmlSAT(){
        var xml_sat = new XmlSAT();
        
        printerService.sendPrinterSAT(
            xml_sat.getXmlSAT(),
            0,
        );
        
        /*if(route.params.conectionType==="extern"){
            if(isCutPaperActive) printerService.cutPaper(10);
        }*/
    }

    return(
        <View style={styles.mainView}>
            <Header textTitle = "IMPRESSORA" /> 
            <View style={styles.printerSettingsView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        IMPRESSÃO DE TEXTO
                    </Text>
                </View>
                <View style={styles.mensageView}>
                    <Text style={styles.labelText}>MENSAGEM:</Text>
                    <TextInput
                        placeholder={'Insira sua mensagem aqui'}
                        style={styles.inputMensage}
                        onChangeText={setText}
                        value={text}                        
                    />
                </View>
                <View style={styles.alignSettingPrinterView}>
                    <Text style={styles.labelText}>ALINHAMENTO:</Text>
                    <View style={{alignSelf:'center',marginBottom:25}}> 
                        <RadioForm
                            style={{marginVertical:10,}}
                            labelStyle={{marginHorizontal:5,fontWeight:'bold',fontSize:12}}
                            radio_props={alignTextOptionData}
                            initial={0}
                            buttonSize={10}
                            formHorizontal={true}
                            onPress={(item) => setOptionTextAlign(item)}
                    
                        />
                    </View>
                    <View style={styles.fontStyleView}>
                        <Text style={styles.labelText}>ESTILIZAÇÃO</Text>
                        <View style={styles.fontStyleSettings}>
                            <View style={styles.fontPickerView}>
                                <Text style={styles.optionText}>FONT FAMILY: </Text>
                                <Picker
                                    style={styles.fontPicker}
                                    selectedValue={selectedFontFamily}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedFontFamily(itemValue)
                                    }>
                                    <Picker.Item label="FONT A" value="FONT A" />
                                    <Picker.Item label="FONT B" value="FONT B" />
                                </Picker>

                            </View>
                            <View style={styles.fontPickerView}>
                                <Text style={styles.optionText}>FONT SIZE: </Text>
                                <Picker
                                    style={styles.fontPicker}
                                    selectedValue={selectedFontSize}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedFontSize(itemValue)
                                    }>
                                    <Picker.Item label="17" value="17" />
                                    <Picker.Item label="34" value="34" />
                                    <Picker.Item label="51" value="51" />
                                    <Picker.Item label="68" value="68" />
                                </Picker>

                            </View>
                        </View>
                        <View style={styles.fontStylesSelect}>
                                {checkBoxType.map(({id,textButton,value,setValue}, index)=>(
                                    <View key={index} style={styles.checkBoxStyleView}>
                                        <CheckBox
                                        disabled={id==="CUT-PAPER"&& route.params.conectionType ==="intern"? true:false || 
                                                  id==="NEGRITO"&&selectedFontFamily==="FONT B"?true:false}
                                        value={value}
                                        onValueChange={(newValue) => setValue(newValue)}
                                        />
                                        <Text style={styles.optionText}>{textButton}</Text>
                                    </View>
                                ))}

                        </View>
                        <View >
                            <TouchableOpacity style={styles.printButtonView} onPress={doPrinterText}>
                                <Text style={styles.textButton}>
                                    IMPRIMIR TEXTO
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonOptionview}>
                                {buttonOptionRender.map(({id,textButton, onPress}, index)=>(
                                    <View key={index} style={styles.buttonOptionStyle}>
                                        <TouchableOpacity
                                            style={styles.buttonOption}
                                            onPress={onPress}
                                        >
                                            <Text style={styles.textButton}>{textButton}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}

                        </View>
                    </View>
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
        padding:10,
    },
    labelText:{
        fontWeight:'bold',
        fontSize:15,
        color:'black',
        alignItems:'center',
    },
    optionText:{
        fontSize:10,
        fontWeight:'bold',
        color:'black',
    },
    titleText:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'black',
    },
    titleView:{
     marginTop:40,
     marginBottom:25,
    },   
    printerSettingsView:{
        width:'90%',
        height:'90%',
    },
    mensageView:{
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'space-between',
        width:'100%',
        marginBottom:25,
    },

    inputMensage:{
        width:'70%',
        borderBottomWidth:0.5,
        borderBottomColor:'black',
        textAlignVertical:'bottom',
        fontSize:17,
    },
    alignSettingPrinterView:{
    },
    alginProps:{
        justifyContent:'space-between',
    },
    fontStyleView:{
        flexDirection:'column',

    },
    fontStyleSettings:{
        flexDirection:'column',
        marginBottom:40,
    },
    fontPickerView:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:-10,
    },
    fontStylesSelect:{
        flexDirection:'row',
        width:'90%',
       justifyContent:'space-between',
       marginBottom:18

    },
    fontPicker:{
        width:150,
        height:50,    
    },
    checkBoxStyleView:{
        flexDirection:'row',
        alignItems:'center',
        width:'25%',
    },
    textButton:{
        color:'white',
        fontWeight:'bold'
    },
    printButtonView:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderRadius:18,
        borderColor:'#0069A5',
        backgroundColor:'#0069A5',
        height:50,
        marginVertical:5,
    },
    buttonOptionview:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    buttonOption:{
        width:'100%',
        height:45,
        backgroundColor:'#0069A5',
        alignItems:'center',
        borderRadius:18,
        justifyContent:'center',
    },
    buttonOptionStyle:{
        width:'47%',

    }  
    
})

export default PrinterText