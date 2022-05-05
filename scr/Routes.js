import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Menu from './pages/Menu'
import Printer from './pages/Printer'
import ElginPay from './pages/ElginPay'
import CarteiraDigital from './pages/CarteiraDigital'
import BarCodes from './pages/BarCodes'
import NFCE from './pages/Nfce'
import PrinterText from './pages/PrinterOptions/PrinterText';
import PrinterBarCode from './pages/PrinterOptions/PrinterBarCode';
import PrinterImage from './pages/PrinterOptions/PrinterImage';

export default function Routes(){
    return(
        <NavigationContainer>
              <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen component={Menu} name='Menu' /> 
                <AppStack.Screen component={Printer} name='Printer' /> 
                <AppStack.Screen component={ElginPay} name='ElginPay' /> 
                <AppStack.Screen component={CarteiraDigital} name='CarteiraDigital' /> 
                <AppStack.Screen component={BarCodes} name='BarCodes' /> 
                <AppStack.Screen component={NFCE} name='Nfce'/>
                <AppStack.Screen component={PrinterText} name='PrinterText'/>
                <AppStack.Screen component={PrinterBarCode} name='PrinterBarCode'/>
                
                <AppStack.Screen component={PrinterImage} name='PrinterImage'/>
                

        
        
                
            </AppStack.Navigator>
          
        </NavigationContainer>
    );
};
