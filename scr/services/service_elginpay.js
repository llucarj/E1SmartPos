import { Alert, NativeModules } from 'react-native';

var NativeModulesE1 = NativeModules.ToastModules;

export default class ElginPayService{

    sendFunctionToAndroid(mapParam){
        NativeModulesE1.sendOptionElginPay(mapParam);
    };

    sendCreditPayment(valor,installmentType,numParcelas){
        const mapParam = {
            "typeTransition":"creditTransaction",
            "value": valor,
            "installment": installmentType,
            "numInstallment": numParcelas,
        }

        console.log(mapParam);
        this.sendFunctionToAndroid(mapParam);

    }
    sendDebitPayment(valor){
        const mapParam = {
            "typeTransition":"debitTransaction",
            "value": valor,
        }
        console.log(mapParam);
        this.sendFunctionToAndroid(mapParam);
    }

    sendAdmTransaction(){
        const mapParam={
            "typeTransition":"admTransaction"
        }

        this.sendFunctionToAndroid(mapParam);
        
    }

    sendCancelSell(valor,ref,data){
        const mapParam = {
            "typeTransition":"cancelTransaction",
            "value": valor,
            "ref":ref,
            "data":data,
        }
        this.sendFunctionToAndroid(mapParam);

    }
    
    sendLayoutCustomization(isCustominzationOn){
        const mapParam={
            "typeTransition":"customization",
            "customizationStatus":isCustominzationOn,
        }
        this.sendFunctionToAndroid(mapParam);
    }


}