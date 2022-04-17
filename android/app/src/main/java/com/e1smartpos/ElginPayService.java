package com.e1smartpos;

import android.app.Activity;

import android.content.Context;
import android.content.res.AssetManager;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import android.os.Handler;

import android.os.Message;

import com.elgin.e1.Pagamento.ElginPay;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import br.com.setis.interfaceautomacao.Confirmacoes;
import br.com.setis.interfaceautomacao.EntradaTransacao;
import br.com.setis.interfaceautomacao.ModalidadesPagamento;
import br.com.setis.interfaceautomacao.Operacoes;
import br.com.setis.interfaceautomacao.Personalizacao;
import br.com.setis.interfaceautomacao.SaidaTransacao;
import br.com.setis.interfaceautomacao.Transacoes;

public class ElginPayService {
    public static ReactApplicationContext reactContext;

    private static Context context;
    private static Activity mActivity;
    private static Personalizacao personalizacao;
    static ElginPay pagamento = new ElginPay();

    /*private class CustomHandler extends Handler{
        ElginPayService ctx;


        public CustomHandler(Looper l, ElginPayService ctx){
            super(l);
            this.ctx = ctx;
        }

        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
            String saida = (String) msg.obj;

            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("lastTransitionOut", saida);
            Toast.makeText(ctx.context, saida, Toast.LENGTH_LONG).show();
        }
    }*/

    public ElginPayService(Context c){
        context = c;
    }

    public static void setPersonalizacao(Personalizacao mPersonalizacao) {
        personalizacao = mPersonalizacao;
    }

    public static void IniciarPagamentoDebito(ReadableMap map,Context context,Handler handler){

        String value = (String) map.getString("value");

        pagamento.iniciaVendaDebito(value, context, handler);
    }

    public static void IniciarPagamentoCredito(ReadableMap map,Context context,Handler handler)
    {
        String value = (String) map.getString("value");
        int installment = Integer.parseInt(map.getString("installment"));
        int numInstallment= Integer.parseInt(map.getString("numInstallment"));

        pagamento.iniciaVendaCredito(value, installment,numInstallment, context, handler);
    }

    public static void IniciarCancelamentoVenda(ReadableMap map, Context context, Handler handler)
    {
        String value= (String) map.getString("value");
        String saleRef = (String) map.getString("ref");
        String todayDate = (String) map.getString("data");


        pagamento.iniciaCancelamentoVenda(value, saleRef, todayDate, context, handler);
    }

    public static void IniciarOperacaoAdministrativa(Context context,Handler handler)
    {
        pagamento.iniciaOperacaoAdministrativa(context, handler);
    }

    public static void IniciarCustomizacao(ReadableMap map){
        Boolean isCustomizationOn = (Boolean) map.getBoolean("customizationStatus");
        if(isCustomizationOn){
            setCustomLayoutOn();
        }else{
            setCustomLayoutOff();
        }
    }

    public static void setCustomLayoutOn(){
        System.out.println("Customização BatPay On");
        setPersonalizacao(obterPersonalizacao());
    }

    public static void setCustomLayoutOff(){
        setPersonalizacao(new Personalizacao.Builder().build());
        System.out.println("Customização BatPay Off");
    }

    private static File createFileFromInputStream(InputStream inputStream) {

        try{
            File f = new File("sdcard/logo2.png");
            OutputStream outputStream = new FileOutputStream(f);
            byte buffer[] = new byte[1024];
            int length = 0;

            while((length=inputStream.read(buffer)) > 0) {
                outputStream.write(buffer,0,length);
            }

            outputStream.close();
            inputStream.close();

            return f;
        }catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    private static Personalizacao obterPersonalizacao(){
        //Processo de personalização do layout
        Personalizacao.Builder pb = new Personalizacao.Builder();
        String corDestaque = "#FED20B"; // AMARELO
        String corPrimaria = "#050609"; // PRETO
        String corSecundaria = "#808080";

        pb.informaCorFonte(corDestaque);
        pb.informaCorFonteTeclado(corPrimaria);
        pb.informaCorFundoToolbar(corDestaque);
        pb.informaCorFundoTela(corPrimaria);
        pb.informaCorTeclaLiberadaTeclado(corDestaque);
        pb.informaCorTeclaPressionadaTeclado(corSecundaria);
        pb.informaCorFundoTeclado(corPrimaria);
        pb.informaCorTextoCaixaEdicao(corDestaque);
        pb.informaCorSeparadorMenu(corDestaque);

        try {
            AssetManager am = context.getAssets();
            InputStream inputStream = am.open("logo.png");
            File file = createFileFromInputStream(inputStream);
            pb.informaIconeToolbar(file);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return pb.build();
    }



}
