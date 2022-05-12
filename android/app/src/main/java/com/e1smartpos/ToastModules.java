package com.e1smartpos;

// replace com.your-app-name with your app’s name

import static android.app.Activity.RESULT_OK;
import static com.e1smartpos.MainActivity.it4rObj;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.elgin.e1.Scanner.Scanner;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.Map;

import br.com.daruma.framework.mobile.exception.DarumaException;

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

    public void onNewIntent(Intent intent) {
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        //IntentResult resultIntent = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        WritableMap returnCode = Arguments.createMap();
        if (requestCode == 1) {
            if (resultCode == 2) {
                String[] result = data.getStringArrayExtra("result");

                CharSequence cs;
                if (result[0].equals("1")) {

                    returnCode.putString("returnCode", result[1]);
                    returnCode.putString("returnType", result[3]);
                    reactContext
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("eventBarCodeReturn", returnCode);

                } else {
                    returnCode.putString("returnError", result[0]);
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

    @ReactMethod
    public void sendNfceOption(ReadableMap map) {
        Log.d("DEBUG", "oxe " + map.toString());
        if (map.getString("typeNfce").equals("CONFIGURATE_XML_NFCE"))
            configurateXmlNfce();
        else
            sendSaleNfce(map);

    }

    private void sendSaleNfce(ReadableMap map) {
        final String productName = map.getString("productName");
        final String productPrice = map.getString("productPrice");

        //É feita uma venda antes da venda antes para que a nossa venda não seja omitida, isso é necessário em servidor de homologação
        preSale();

        //Configuramos a venda com os dados da tela
        try {
            it4rObj.venderItem(productName, productPrice, "123456789012");
        } catch (DarumaException e) {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventSendSaleNfce", "Erro na configuração da venda " + e.getMessage());
            e.printStackTrace();
            return;
        }

        //Variável para guardar o status da emissão, caso seja offline o tempo de emissão não deve ser passado
        boolean wasNfceEmittedOnline = true;

        //Encerramos a venda emitindo a nota para o servidor
        try {
            it4rObj.encerrarVenda(productPrice, "Dinheiro");
        } catch (DarumaException e) {
            wasNfceEmittedOnline = false;
        }

        StringBuilder returnSendSaleNfce = new StringBuilder();

        if (wasNfceEmittedOnline)
            returnSendSaleNfce.append("NFC-e emitida com sucesso!" + "|" + (it4rObj.getTimeElapsedInLastEmission().get() / 1000) + "|" + it4rObj.getNumeroNota() + "|" + it4rObj.getNumeroSerie());
        else
            returnSendSaleNfce.append("Erro ao emitir NFC-e online, a impressão será da nota em contingência!" + "|" + it4rObj.getNumeroNota() + "|" + it4rObj.getNumeroSerie());

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("eventSendSaleNfce", returnSendSaleNfce.toString());

        //Impressão da NFC-e
        final WritableMap mapValues = Arguments.createMap();

        mapValues.putString("xmlNFCe", getTextOfFile());
        mapValues.putInt("indexcsc", 1);
        mapValues.putString("csc", "1A451E99-0FE0-4C13-B97E-67D698FFBC37");
        mapValues.putInt("param", 0);

        final int printerReturn = Printer.imprimeXMLNFCe(mapValues);
        Log.d("DEBUG", String.valueOf(printerReturn));
    }

    private void preSale() {
        try {
            it4rObj.venderItem("I", "0.00", "123456789011");
        } catch (DarumaException e) {
            e.printStackTrace();
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventSendSaleNfce", "Erro na configuração da venda " + e.getMessage());
            return;
        }
    }

    //Função que lê o xml que representa a nota NFC-e emitida e retorna uma String com o conteúdo
    private String getTextOfFile() {
        String strFile = "";

        strFile = Environment.getExternalStorageDirectory().getAbsolutePath() + "/EnvioWS.xml";

        String strFileContent = "";
        File file = new File(strFile);

        if (file.exists()) {
            FileInputStream fis2 = null;
            try {
                fis2 = new FileInputStream(file);
                char current;
                while (fis2.available() > 0) {
                    current = ((char) fis2.read());
                    strFileContent = strFileContent + String.valueOf(current);
                }

            } catch (Exception e) {
                Log.d("TourGuide", e.toString());
            } finally {
                if (fis2 != null) try {
                    fis2.close();
                } catch (Exception e) {

                }
            }
        }
        return strFileContent;
    }

    private void configurateXmlNfce() {
        try {
            it4rObj.configurarXmlNfce();
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventConfigurateXmlNfce", "NFC-e configurada com sucesso!");
        } catch (DarumaException e) {
            e.printStackTrace();
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventConfigurateXmlNfce", "Erro na configuração de NFC-e!");
        }
    }


    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void sendOptionsClassPrinter(ReadableMap configsReceived) {
        WritableMap result = Arguments.createMap();

        if (configsReceived.getString("typePrinter").equals("printerConnectInternal")) {
            Printer.printerInternalImpStart();

        } else if (configsReceived.getString("typePrinter").equals("connectPrinterExtern")) {
            Printer.printerExternalImpStart(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("printerCupomTEF")) {
            Printer.imprimeCupomTEF(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("printerText")) {
            Printer.imprimeTexto(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("printerBarCode")) {
            Printer.imprimeBarCode(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("printerBarCodeTypeQrCode")) {
            Printer.imprimeQR_CODE(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("choosePrinterImage")) {
            Intent cameraIntent = new Intent(Intent.ACTION_PICK);
            cameraIntent.setType("image/*");
            reactContext.startActivityForResult(cameraIntent, 1000, null);
        } else if (configsReceived.getString("typePrinter").equals("printerImage")) {
            Printer.imprimeImagem(configsReceived);
        } else if (configsReceived.getString("typePrinter").equals("printerNFCe")) {
            Printer.imprimeXMLNFCe(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("printerSAT")) {
            Printer.imprimeXMLSAT(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("gavetaStatus")) {
            result.putString("statusGaveta", String.valueOf(Printer.statusGaveta()));

            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventStatusGaveta", result);

        } else if (configsReceived.getString("typePrinter").equals("abrirGaveta")) {
            Printer.abrirGaveta();

        } else if (configsReceived.getString("typePrinter").equals("jumpLine")) {
            Printer.AvancaLinhas(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("cutPaper")) {
            Printer.cutPaper(configsReceived);

        } else if (configsReceived.getString("typePrinter").equals("statusPrinter")) {
            result.putString("statusPrinter", String.valueOf(Printer.statusSensorPapel()));

            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventStatusPrinter", result);
        } else if (configsReceived.getString("typePrinter").equals("statusPosPrinter")) {
            result.putString("statusPosPrinter", String.valueOf(Printer.statusSensorPapelSmartPOS()));
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("eventPosPrinter", result);

        } else if (configsReceived.getString("typePrinter").equals("printerStop")){
            Printer.printerStop();
            Log.d("DEBUG", "printerStopped");
        }
    }

    @ReactMethod
    public void sendOptionElginPay(ReadableMap configsReceived) {
        WritableMap result = Arguments.createMap();

        if (configsReceived.getString("typeTransition").equals("creditTransaction")) {
            ElginPayService.IniciarPagamentoCredito(configsReceived);

        } else if (configsReceived.getString("typeTransition").equals("debitTransaction")) {
            ElginPayService.IniciarPagamentoDebito(configsReceived);

        } else if (configsReceived.getString("typeTransition").equals("admTransaction")) {
            ElginPayService.IniciarOperacaoAdministrativa();

        } else if (configsReceived.getString("typeTransition").equals("cancelTransaction")) {
            ElginPayService.IniciarCancelamentoVenda(configsReceived);
        } else if (configsReceived.getString("typeTransition").equals("customization")) {
            ElginPayService.IniciarCustomizacao(configsReceived);
        }
    }


}
