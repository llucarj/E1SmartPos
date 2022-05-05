 import React from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
 } from 'react-native';

 import Logo from '../icons/elgin_logo.png'
 import Footer from '../components/Footer';
 
 const Menu =({navigation})=> {
   
   const buttonsMenuData = [
    {icon: require('../icons/printer.png'), textButton: 'IMPRESSORA', onPress: () => navigation.navigate('Printer')},
    {icon: require('../icons/elginpay_logo.png'), textButton: 'ELGIN PAY', onPress: () => navigation.navigate('ElginPay')},
    {icon: require('../icons/msitef.png'), textButton: 'CARTEIRA DIGITAL', onPress: () => navigation.navigate('CarteiraDigital')},
    {icon: require('../icons/barCode.png'), textButton: 'LEITOR DE CÓDIGO', onPress: () => navigation.navigate('BarCodes')},
];

             
 
   return (
     <View style={styles.mainView}>
       <View style={styles.contentView}>
         <View style={styles.bannerView}>
           <Image style={styles.banner} source={Logo}/>
          </View>
          <View style={styles.menuView}>
            <View style={styles.largeButtonView}>
              <TouchableOpacity 
                style={styles.buttonMenu} 
                onPress={()=>navigation.navigate('ElginPay')}
              >
                <Image style={styles.icon} source={require('../icons/elginpay_logo.png')}/>
                <Text style={styles.textButton}>ELGIN PAY</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.doubleButtonView}>
              <TouchableOpacity 
                style={styles.doubleButton} 
                onPress={()=>navigation.navigate('Printer')}
              >
                <Image style={styles.icon} source={require('../icons/printer.png')}/>
                <Text style={styles.textButton}>IMPRESSORA</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.doubleButton} 
                onPress={()=>navigation.navigate('CarteiraDigital')}
              >
                <Image style={styles.icon} source={require('../icons/msitef.png')}/>
                <Text style={styles.textButton}>CARTEIRA DIGITAL</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.doubleButtonView}>
              <TouchableOpacity 
                style={styles.doubleButton} 
                onPress={()=>navigation.navigate('Nfce')}
              >
                <Image style={styles.icon} source={require('../icons/nfce.png')}/>
                <Text style={styles.textButton}>NFC-e</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.doubleButton} 
                onPress={()=>navigation.navigate('BarCodes')}
              >
                <Image style={styles.icon} source={require('../icons/barCode.png')}/>
                <Text style={styles.textButton}>LEITOR DE CÓDIGO</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Footer/>
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
    width:'80%',
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
  
  menuView:{

    flexDirection:'column',
    justifyContent:'center',
    alignContent:'space-around',
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
  doubleButton:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    borderRadius:25,
    width:'49%',
    height:100,
  },
  largeButtonView:{
    width:'100%',
    marginBottom:10,
  },
  doubleButtonView:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%',
    marginBottom:10,
  },
  icon:{
    resizeMode: 'contain',
    width: 150,
    height: 60,
  },

  textButton: {
    fontWeight: 'bold',
    textAlign:'center',
  }
 });
 
 export default Menu;
 