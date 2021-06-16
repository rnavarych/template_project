package com.templateproject;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.List;
import java.util.Map;

public class NativeButtonManager extends SimpleViewManager<NativeButton> {
    @Override
    public String getName() {
        return "NativeButton";
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "click",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onClick")))
                .build();
    }

    @ReactProp(name="title")
    public void setBulbStatus(NativeButton nativeBtn, String title) {
        nativeBtn.setTitle(title);
    }

    @Override
    protected NativeButton createViewInstance(ThemedReactContext reactContext) {
        return new NativeButton(reactContext);
    }
}
