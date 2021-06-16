package com.templateproject;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.List;

public class NativeButton extends androidx.appcompat.widget.AppCompatButton {
    public String title = "button";
    public Color defaultColor;

    public NativeButton(Context context) {
        super(context);
        this.setOnClickListener(clickListener);
        this.setTitle(title);
    }

    public NativeButton(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public NativeButton(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public void setTitle (String newTtitle){
        this.setText(newTtitle);
    }

    private OnClickListener clickListener = new OnClickListener() {
        public void onClick(View v) {
            WritableMap event = Arguments.createMap();
            event.putString("test", "test");
            ReactContext reactContext = (ReactContext)getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                    getId(),
                    "click",
                    event);
        }
    };
}
