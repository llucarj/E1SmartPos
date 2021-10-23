import { NativeModules } from 'react-native';


var NativeModulesE1 = NativeModules.ToastModules;

export default class barCodeService{
    runReadCode(){
        NativeModulesE1.lerCodigo();
    };
}