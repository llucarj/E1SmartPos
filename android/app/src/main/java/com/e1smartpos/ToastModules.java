package com.e1smartpos;

// replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.IOException;
import java.util.Map;

//import javax.print.attribute.standard.PrinterInfo;

import java.util.HashMap;

import android.app.Service;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.widget.Toast;
import android.util.Log;
import org.json.JSONException;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import static android.app.Activity.RESULT_OK;
import static android.app.Activity.RESULT_CANCELED;
import com.facebook.react.bridge.ActivityEventListener;
import com.google.zxing.integration.android.IntentResult;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.google.zxing.integration.android.IntentIntegrator;

//LIBS QUE PERMITER ENVIAR OS DADOS PARA APLICAÇÃO EM JAVASCRIPT
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import br.com.setis.interfaceautomacao.Operacoes;
import com.elgin.e1.Scanner.*;
import com.e1smartpos.Printer;
import com.e1smartpos.ElginPayService;

public class ToastModules extends ReactContextBaseJavaModule implements ActivityEventListener {
    public static ReactApplicationContext reactContext;

    Bundle instanceBundle = new Bundle();

    ToastModules(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "ToastModules";
    }

    public void onNewIntent(Intent intent){}

    private Handler handler = new Handler(Looper.getMainLooper()){
        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
            String saida = (String) msg.obj;

            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("lastTransitionOut", saida);
        }
    };

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data){
        //IntentResult resultIntent = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        WritableMap returnCode = Arguments.createMap();
        if (requestCode == 1) {
            if (resultCode == 2) {
                String[] result = data.getStringArrayExtra("result");

                CharSequence cs;
                if (result[0].equals("1")) {

                    returnCode.putString("returnCode",result[1]);
                    returnCode.putString("returnType",result[3]);
                    reactContext
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("eventBarCodeReturn", returnCode);

                } else {
                    returnCode.putString("returnError",result[0]);
                    reactContext
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("eventBarCodeReturn", returnCode);
                    cs = "Erro # " + result[0] + " na leitura do código.";

                }
            }
        }

        if (resultCode == RESULT_OK) {
            if (requestCode == 1000) {
                Uri returnUri = data.getData();
                File file = new File(returnUri.getPath());//create path from uri
                final String path = file.getPath();
                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("eventChoosePrinterImage", path);
            }
        } else {
            Toast.makeText(reactContext, "You haven't picked an Image", Toast.LENGTH_LONG).show();
        }
    }

    @ReactMethod
    public void lerCodigo() {
        Activity thisActivity = getCurrentActivity();
        Intent in = Scanner.getScanner(thisActivity);
        thisActivity.startActivityForResult(in, 1);

    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void sendOptionsClassPrinter(ReadableMap configsReceived){
        WritableMap result = Arguments.createMap();

        if(configsReceived.getString("typePrinter").equals("printerConnectInternal")){
            Printer.printerInternalImpStart();

        }else if(configsReceived.getString("typePrinter").equals("connectPrinterExtern")){
            Printer.printerExternalImpStart(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("printerCupomTEF")){
            Printer.imprimeCupomTEF(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("printerText")){
            Printer.imprimeTexto(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("printerBarCode")){
            Printer.imprimeBarCode(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("printerBarCodeTypeQrCode")){
            Printer.imprimeQR_CODE(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("choosePrinterImage")){
            Intent cameraIntent = new Intent(Intent.ACTION_PICK);
            cameraIntent.setType("image/*");
            reactContext.startActivityForResult(cameraIntent, 1000, null);
        }else if(configsReceived.getString("typePrinter").equals("printerImage")){
            Printer.imprimeImagem(configsReceived);
        }else if(configsReceived.getString("typePrinter").equals("printerNFCe")){
            Printer.imprimeXMLNFCe(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("printerSAT")){
            Printer.imprimeXMLSAT(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("gavetaStatus")){
            result.putString("statusGaveta", String.valueOf(Printer.statusGaveta()));

            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventStatusGaveta", result);

        }else if(configsReceived.getString("typePrinter").equals("abrirGaveta")){
            Printer.abrirGaveta();

        }else if(configsReceived.getString("typePrinter").equals("jumpLine")){
            Printer.AvancaLinhas(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("cutPaper")){
            Printer.cutPaper(configsReceived);

        }else if(configsReceived.getString("typePrinter").equals("statusPrinter")){
            result.putString("statusPrinter", String.valueOf(Printer.statusSensorPapel()));

            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventStatusPrinter", result);
        } else if (configsReceived.getString("typePrinter").equals("statusPosPrinter")){
            result.putString("statusPosPrinter",String.valueOf(Printer.statusSensorPapelSmartPOS()));
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventPosPrinter", result);

        }
    }

    @ReactMethod
    public void sendOptionElginPay(ReadableMap configsReceived){
        WritableMap result = Arguments.createMap();

        if(configsReceived.getString("typeTransition").equals("creditTransaction")){
            ElginPayService.IniciarPagamentoCredito(configsReceived,reactContext.getCurrentActivity(),handler);

        }else if(configsReceived.getString("typeTransition").equals("debitTransaction")){
            ElginPayService.IniciarPagamentoDebito(configsReceived,reactContext.getCurrentActivity(),handler);

        }else if(configsReceived.getString("typeTransition").equals("admTransaction")){
            ElginPayService.IniciarOperacaoAdministrativa(reactContext.getCurrentActivity(),handler);

        }else if(configsReceived.getString("typeTransition").equals("cancelTransaction")){
            ElginPayService.IniciarCancelamentoVenda(configsReceived,reactContext.getCurrentActivity(),handler);
        }else if(configsReceived.getString("typeTransition").equals("customization")){
            ElginPayService.IniciarCustomizacao(configsReceived);
        }
    }


    
}
