package com.example.test;

import android.os.Bundle;
import android.view.Menu;
import org.apache.cordova.*;
import android.view.MenuItem;

public class cordovaExample extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.setIntegerProperty("splashscreen", R.drawable.splashscreen);
        super.onCreate(savedInstanceState);
        super.loadUrl("http://192.168.2.5:3000/",4000);
    }

    public boolean onCreateOptionsMenu(Menu menu) {

        menu.add(0, 2, 2, R.string.exit);
        // TODO Auto-generated method stub 
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == 2) {
            finish();
        }
        return super.onOptionsItemSelected(item);
    }

}
