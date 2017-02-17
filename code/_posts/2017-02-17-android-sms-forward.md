---
title: Android 按号码转发短信
date: 2017-02-17 11:07
category: Android
---

因日常需转发短信，所以在github上找了一个代码改了一下，用于自动转发。可以按 短信号码\|转发号码1,转发号码2 格式设置自动转发。

# {{ page.title }}

AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="cf.wfen.smsforward"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk
        android:minSdkVersion="22"
        android:targetSdkVersion="22" />    
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.RECEIVE_SMS" />
    <uses-permission android:name="android.permission.READ_SMS" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE" />
    .

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
		<receiver
            android:name="cf.wfen.smsforward.SmsMonitor"
            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <action android:name="android.provider.Telephony.SMS_RECEIVED" />
            </intent-filter>
        </receiver>
    </application>
</manifest>

```
```java
package cf.wfen.smsforward;

import java.util.HashMap;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.provider.Telephony;
import android.telephony.SmsManager;
import android.telephony.SmsMessage;
import android.util.Log;

public class SmsMonitor extends BroadcastReceiver{

    public static final String TAG = "SmsMonitor";

    public static final String SMS_ACTION = "android.provider.Telephony.SMS_RECEIVED";

    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO: This method is called when the BroadcastReceiver is receiving
        // an Intent broadcast.
        // throw new UnsupportedOperationException("Not yet implemented");
        Log.i("sms", "on receive," + intent.getAction());
        if (Telephony.Sms.Intents.SMS_RECEIVED_ACTION.equals(intent.getAction())) {
            for (SmsMessage smsMessage : Telephony.Sms.Intents.getMessagesFromIntent(intent)) {

                String messageBody = smsMessage.getMessageBody();
                String address = smsMessage.getOriginatingAddress();
                //Log.i("sms", "body: " + messageBody);
                //Log.i("sms", "address: [" + address+"]");
                
                HashMap<String,String[]> map = getSettings(context);
                for (String key : map.keySet()) {
                	Log.i("key",address.equals(key)?"True":"False");
                    if(address.equals(key)) {
                    	for(String addr : map.get(key)){
                            Log.i("sms","from "+address+" send "+addr+" content "+messageBody);
                            SmsManager.getDefault().sendTextMessage(addr,null,messageBody,null,null);
                    	};
                    }
                }
            }
        }
    }
    private HashMap<String,String[]> getSettings(Context context){
    	HashMap<String,String[]> map = new HashMap<String,String[]>();
    	String settingsStr = context.getSharedPreferences("data", Context.MODE_PRIVATE).getString("settings", "");
    	Log.i("settings",settingsStr);
    	String[] lines = settingsStr.split("\n");
    	int cnt = lines.length;
    	for(int i=0;i<cnt;i++){
    		String[] p1s = lines[i].split("\\|");
    		String[] numbers = p1s[1].split("\\,");
    		for(String num :numbers){
    			Log.i("num",num);
    		}
    		map.put(p1s[0], numbers);
    	}
    	return map;
    }
}

```

```
package cf.wfen.smsforward;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        String number = getSharedPreferences("data", Context.MODE_PRIVATE).getString("settings", "");
        Log.d("log","number: " + number);
        EditText editText = (EditText) findViewById(R.id.edit_Settings);
        editText.setText(number, TextView.BufferType.EDITABLE);
    }

    public void sendSMS(View v)
    {
        EditText settingsText = (EditText) findViewById(R.id.edit_Settings);
        String settingsStr = settingsText.getText().toString();

        SharedPreferences.Editor editor = getSharedPreferences("data", Context.MODE_PRIVATE).edit();
        editor.putString("settings", settingsStr);
        editor.commit();
    }

}

```


```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="roxma.org.sms_forward.MainActivity" >

    <LinearLayout
        android:id="@+id/linearLayout1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:orientation="vertical"
	>

        <Button
            android:id="@+id/btnSendSMS"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:onClick="sendSMS"
            android:text="Save" >
        </Button>

	    <EditText
	        android:id="@+id/edit_Settings"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
            android:layout_centerInParent="true"
	        android:ems="10"
	        android:inputType="textMultiLine" >
	        <requestFocus />
	    </EditText>
    </LinearLayout>

</RelativeLayout>
```