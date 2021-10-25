import { Alert, NativeModules } from 'react-native';

var NativeModulesE1 = NativeModules.ToastModules;

export default class ElginPayService{

    sendFunctionToAndroid(mapParam){
        NativeModulesE1.sendOptionElginPay(mapParam);
    };

    sendCreditPayment(valor,installmentType){
        const mapParam = {
            "typeTransition":"creditTransaction",
            "value": valor,
            "installment": installmentType,
        }

        this.sendFunctionToAndroid(mapParam);

    }
    sendDebitPayment(valor){
        const mapParam = {
            "typeTransition":"debitTransaction",
            "value": valor,
        }

        this.sendFunctionToAndroid(mapParam);
    }

    sendAdmTransaction(){
        const mapParam={
            "typeTransition":"admTransaction"
        }

        this.sendFunctionToAndroid(mapParam);
        
    }

    sendCancelSell(valor){
        const mapParam = {
            "typeTransition":"cancelTransaction",
            "value": valor,
        }

        this.sendFunctionToAndroid(mapParam);

    }

}