import {NativeModules} from 'react-native';

var NativeModulesE1 = NativeModules.ToastModules;

export default class ServiceScanner {
  lerScanner() {
    NativeModulesE1.lerCodigo();
  }


}
