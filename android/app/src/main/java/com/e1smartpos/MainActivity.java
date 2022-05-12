package com.e1smartpos;

import android.app.Activity;
import android.os.Bundle;

import com.e1smartpos.NFCE.It4r;
import com.facebook.react.ReactActivity;

import br.com.daruma.framework.mobile.DarumaMobile;

public class MainActivity extends ReactActivity {

  Activity activity;
  public static Printer printer;
  public static ElginPayService elginPayService;
  public static It4r it4rObj;

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected String getMainComponentName() {
    return "E1SmartPos";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState){
    super.onCreate(savedInstanceState);
    activity = this;

    printer = new Printer(activity);
    elginPayService = new ElginPayService(activity);
    it4rObj = new It4r(DarumaMobile.inicializar(this, "@FRAMEWORK(LOGMEMORIA=200;TRATAEXCECAO=TRUE;TIMEOUTWS=8000;SATNATIVO=FALSE);@SOCKET(HOST=192.168.210.94;PORT=9100;)"));
  }
}
