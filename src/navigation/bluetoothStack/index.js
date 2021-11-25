import React from 'react';

import * as routes from '../../constants/routes';

import BlePermissionScreen from '../../containers/main/ble/blePermissionScreen';
import DeviceListScreen from '../../containers/main/ble/deviceListScreen';
import DeviceLogScreen from '../../containers/main/ble/logScreen';

import {Stack} from '../';
import {strings} from '../../l18n';

const bleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PERMISSION_SCREEN}
        component={BlePermissionScreen}
        options={{
          drawerLabel: strings('headers.bluetooth'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.DEVICE_LIST_SCREEN}
        component={DeviceListScreen}
        options={{
          headerShown: true,
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name={routes.DEVICE_LOG_SCREEN}
        component={DeviceLogScreen}
        options={{
          headerShown: true,
          animationTypeForReplace: 'pop',
        }}
      />
    </Stack.Navigator>
  );
};

export default bleStack;
