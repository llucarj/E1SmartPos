
 import React from 'react';
 import {useNavigation} from '@react-navigation/native';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
 } from 'react-native';

 import Logo from '../icons/ElginDeveloperCommunity.png'
import Footer from '../components/Footer';
 


 
 const Menu =()=> {
   const navigation = useNavigation();

   const buttonsMenuData = [
    {icon: require('../icons/printer.png'), textButton: 'IMPRESSORA',onPress: () => navigation.navigate('Printer')},
    {icon: require('../icons/msitef.png'), textButton: 'ELGIN PAY',onPress: () => navigation.navigate('ElginPay')},
    {icon: require('../icons/msitef.png'), textButton: 'CARTEIRA DIGITAL',onPress: () => navigation.navigate('CarteiraDigital')},
    {icon: require('../icons/barCode.png'), textButton: 'LEITOR DE CÓDIGO',onPress: () => navigation.navigate('BarCodes')},
];
 
   return (
     <View style={styles.mainView}>
       <View style={styles.contentView}>
         <View style={styles.bannerView}>
           <Image style={styles.banner} source={Logo}/>
          </View>
          <View style={styles.menuView}>
            {buttonsMenuData.map(({icon,textButton,onPress},index)=>(
              <TouchableOpacity 
                style={[styles.buttonMenu]} 
                key={index}
                onPress={onPress}
              >
                <Image style={styles.icon} source={icon}/>
                <Text style={styles.textButton}>{textButton}</Text>
              </TouchableOpacity>
              ))}
          </View>
          <Footer/>
        
        </View>
        
       </View>
   );
 };
 
 const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:'white',
  },
  contentView:{
    height:'100%',
    width:'80%',
    alignSelf:'center',

  },
  bannerView:{
    alignItems: 'center',
    justifyContent:'center',
  },
  banner:{
    resizeMode:'contain',
    width: '100%',
    height: 139,
  },
  menuView:{
    flexDirection:'row',
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    height:420,
    width:'100%',
   
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
    width:50,
    height:50,
  },


  textButton: {
    fontWeight: 'bold',
    textAlign:'center',
  }
 });
 
 export default Menu;
 