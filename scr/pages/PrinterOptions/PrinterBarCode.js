import React,{Component,useState} from 'react';
import {View, Text, StyleSheet,TextInput, TouchableOpacity, Alert} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import RadioForm from 'react-native-simple-radio-button';
import {Picker} from '@react-native-picker/picker';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

const PrinterBarCode = () =>{

    const [codigo, setCodigo] = useState("40170725");
    const [selectedCodeType, setSelectedCodeType] = useState('EAN 8');
    const [selectedHeigthCode, setSelectedHeigthCode] = useState(20);
    const [selectedCodeWidth, setSelectedCodeWidth] = useState(1);
    const [optionTextAlign,setOptionTextAlign]=useState("Esquerda");
    const [isCutPaperActive,setIsCutPaperActive]=useState(false);

    

    return(
        <View style={styles.mainView}>
            <Header textTitle = "IMPRESSORA" /> 
            <View style={styles.titleView}>
                <Text style={styles.titleText}>
                    IMPRESSÃO DE CÓDIGO DE BARRAS
                </Text>
            </View>
            <View style={styles.printerSettingsView}>
                <View style={styles.mensageView}>
                    <Text style={styles.labelText}>CÓDIGO:</Text>
                    <TextInput
                        style={styles.inputMensage}
                        onChangeText={setCodigo}
                        value={codigo}
                    />
                </View>
                <View style={styles.codeTypePickerView}>
                    <Text style={styles.labelText}>TIPO DE CÓDIGO DE BARRAS: </Text>
                    <Picker
                        style={styles.codeTypePicker}
                        selectedValue={selectedCodeType}
                        onValueChange={(itemValue, itemIndex) => {
                            setTypeCodeMessage(itemValue);
                            setSelectedCodeType(itemValue)
                        }}
                    >
                        <Picker.Item label="EAN 8" value="EAN 8" />
                        <Picker.Item label="EAN 13" value="EAN 13"/>
                        <Picker.Item label="QR Code" value="QR CODE" />
                        <Picker.Item label="UPC-A" value="UPC-A" />
                        <Picker.Item label="UPC-E" value="UPC-E" />
                        <Picker.Item label="CODE 39" value="CODE 39" />
                        <Picker.Item label="ITF" value="ITF" />
                        <Picker.Item label="CODE BAR" value="CODE BAR" />
                        <Picker.Item label="CODE 93" value="CODE 93" />
                        <Picker.Item label="CODE 128" value="CODE 128" />
                    </Picker>
                </View>
                <View style={styles.alignSettingPrinterView}>
                    <Text style={styles.labelText}>ALINHAMENTO:</Text>
                    <View style={{width:'100%'}}> 
                        <RadioForm
                            style={{marginVertical:13}}
                            labelStyle={{marginHorizontal:13,fontWeight:'bold',fontSize:12}}
                            radio_props={alignTextOptionData}
                            initial={0}
                            buttonSize={10}
                            formHorizontal={true}
                            onPress={(item) => setOptionTextAlign(item)}
                        />
                    </View>
                </View>
                <View style={styles.barCodeStyleView}>
                    <Text style={styles.labelText}>
                        ESTILIZAÇÃO:
                    </Text>
                    <View style={styles.barCodeStyleSettingView} >

                        <View style={styles.barCodeStylePicker}>
                            <Text style={styles.optionText}>
                                WIDTH:
                            </Text>
                            <Picker
                                style={styles.codeTypePicker}
                                selectedValue={selectedCodeWidth}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedCodeWidth(itemValue)
                                }>
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                            </Picker>
                        </View>
                         {selectedCodeType != "QR CODE" ? (
                            <View style={[styles.barCodeStylePickerHeigth]}>
                                <Text style={styles.optionText}>
                                    HEIGTH:
                                </Text>
                                <Picker
                                    style={styles.codeTypePicker}
                                    selectedValue={selectedHeigthCode}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedHeigthCode(itemValue)
                                    }>
                                    <Picker.Item label="20" value="20" />
                                    <Picker.Item label="60" value="60" />
                                    <Picker.Item label="120" value="120" />
                                    <Picker.Item label="200" value="200" />
                                </Picker>
                            </View>
                        ):(
                            <>
                            </>
                        )}
                        <View style={styles.checkBoxStyleView}>
                            <CheckBox
                                disabled={false}
                                value={isCutPaperActive}
                                onValueChange={(newValue) => setIsCutPaperActive(newValue)}
                            />
                            <Text style={styles.optionText}>CUT PAPER</Text>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.printterButtonView}>
                    <TouchableOpacity style={styles.printterButton}>
                        <Text style={styles.textButton}>
                            IMPRIMIR CÓDIGO DE BARRAS
                        </Text>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </View>
         
            
        </View>
    );
};

const styles = StyleSheet.create({

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
    optionText:{
        fontSize:12,
        fontWeight:'bold',
        color:'black',
    },
    labelText:{
        fontWeight:'bold',
        fontSize:15,
        color:'black',
        alignItems:'center',
    },
    textButton:{
        color:'white',
        fontWeight:'bold'
    },
    mainView:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        padding:10,
        
    },
    printerSettingsView:{
        width:'90%',
        height:'90%',
 
    },
    mensageView:{
        flexDirection:'row',
        alignItems:'flex-end',
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
        paddingVertical:-5,
    },
    codeTypePickerView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:2,
    },
    codeTypePicker:{
        width:150,
        height:50,
    },
    barCodeStyleView:{
        flexDirection:'column',
        marginBottom:30,
    },

    barCodeStylePicker:{
        flexDirection:'row',
        alignItems:'center',
    },
    barCodeStylePickerHeigth:{
        flexDirection:'row',
        alignItems:'center',
        display:'flex',
        marginVertical:-10,
    },
    barCodeStyleSettingView:{
        flexDirection:'column',
        justifyContent:'space-between',
        marginVertical:-10,
    },
    alignSettingPrinterView:{
        marginVertical:10,
    },
    checkBoxStyleView:{
        flexDirection:'row',
        alignItems:'center',
    },
    printterButtonView:{
        width:'100%',
        justifyContent:'center',
        height:80,
    },
    printterButton:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderRadius:15,
        borderColor:'#0069A5',
        backgroundColor:'#0069A5',
        height:50,
        marginVertical:5,
    }

});

export default PrinterBarCode