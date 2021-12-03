package com.e1smartpos;

import android.app.Activity;

import android.content.Context;
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

import br.com.setis.interfaceautomacao.Confirmacoes;
import br.com.setis.interfaceautomacao.EntradaTransacao;
import br.com.setis.interfaceautomacao.ModalidadesPagamento;
import br.com.setis.interfaceautomacao.Operacoes;
import br.com.setis.interfaceautomacao.SaidaTransacao;
import br.com.setis.interfaceautomacao.Transacoes;

public class ElginPayService {
    public static ReactApplicationContext reactContext;

    private Context context;
    private static Activity mActivity;
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

    public static void IniciarPagamentoDebito(ReadableMap map,Context context,Handler handler){

        String value = (String) map.getString("value");

        pagamento.iniciarPagamentoDebito(value, context, handler);
    }

    public static void IniciarPagamentoCredito(ReadableMap map,Context context,Handler handler)
    {
        String value = (String) map.getString("value");
        int installment = Integer.parseInt(map.getString("installment"));

        pagamento.inciarPagamentoCredito(value, installment, context, handler);
    }

    public static void IniciarCancelamentoVenda(ReadableMap map, Context context, Handler handler)
    {
        String value= (String) map.getString("value");

        pagamento.iniciarCancelamentoVenda(value, context, handler);
    }

    public static void IniciarOperacaoAdministrativa(Context context,Handler handler)
    {
        pagamento.iniciarOperacaoAdministrativa(context, handler);
    }



}
