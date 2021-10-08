import React,{useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import {launchImageLibrary} from 'react-native-image-picker';
import Logo from '../../icons/ElginDeveloperCommunity.png';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PrinterImage = () =>{
    // Variáveis de Entrada
    const [isCutPaperActive,setIsCutPaperActive]=useState(false);
    const [image,setImage]=useState("");
    const [pathImage,setPathImage] = useState('');

    //Abre o picker de imagem
    const chooseImage = (type) => {
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
        };

        launchImageLibrary(options, (response) => {
        //   console.log('Response = ', response);
    
          if (response.didCancel) {
            alert('NÃO FOI ESCOLHIDO NENHUMA IMAGEM');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('CÂMERA NÃO DISPONÍVEL');
            return;
          } else if (response.errorCode == 'permission') {
            alert('PERMISSÃO NÃO CONCEDIDA');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log(response);
          setImage(response);            
          setPathImage(response.uri);
        });
    };

    return(
        <View style={styles.mainView}>
            <Header textTitle = "IMPRESSORA" /> 
            <View style={styles.titleView}>
                <Text style={styles.titleText}>
                    IMPRESSÃO DE IMAGEM
                </Text>
                <Text style={styles.subTitleText}>
                    PRÉ-VISUALIZAÇÃO
                </Text>
            </View>

            <View style={styles.uploadedImageView}>
                {
                    image ? (
                        <Image style={styles.imageZone} resizeMode='contain' source={image}/>
                    ):(
                        <Image style={styles.imageZone} resizeMode='contain'  source={Logo}/>
                    )
                }
            </View>

            <View style={styles.imageStyleSettingsView}>
                <View style={styles.imageStyleOptionsView}>
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
            <View style={styles.submitButtonsView}>
                <TouchableOpacity style={styles.actionButton} onPress={() => chooseImage('photo')}>
                    <Text style={styles.textButton} >SELECIONAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton }  >
                    <Text style={styles.textButton}>IMPRIMIR</Text>
                </TouchableOpacity>
            </View>
            <Footer/>
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
    subTitleText:{
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'black'
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
        fontWeight:'bold',
    },
    mainView:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        padding:10,
        
    },
    titleView:{
        width:'100%',
        height:80,
        alignItems:'center',
        justifyContent:'space-around',
        marginVertical:20,

    },
    uploadedImageView:{
        alignItems:'center',
        height:150,
        justifyContent:'center',
        marginVertical:20,
    },
    imageZone:{
        width:300,
        height:300,
    },
    actionButton:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderRadius:15,
        borderColor:'#0069A5',
        backgroundColor:'#0069A5',
        height:50,
        width:'100%',
        marginVertical:5,
    },
    imageStyleSettingsView:{
        flexDirection:'column',
    },
    imageStyleOptionsView:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    imageTypePicker:{
        width:150,
        height:50,
    },
    imageStylePicker:{
        flexDirection:'row',
        alignItems:'center',
    },
    checkBoxStyleView:{
        flexDirection:'row',
        alignItems:'center',
     
    },
    submitButtonsView:{
        flexDirection:'column',
        justifyContent:'space-between',
        width:'100%',
        marginVertical:40,
    }

})

export default PrinterImage