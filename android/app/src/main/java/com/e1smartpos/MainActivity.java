package com.e1smartpos;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  Activity activity;
  public static Printer printer;
  public static ElginPayService elginPayService;

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

  }
}
