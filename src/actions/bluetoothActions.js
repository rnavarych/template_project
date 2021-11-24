import {BleManager, Device} from 'react-native-ble-plx';
import {
  addDevice,
  bluetoothOff,
  bluetoothOn,
  setDevice,
  setMessage,
  updateDevice,
} from './ble';
import {AppDispatch, RootState} from '../store/';

const emptyDevice = {
  id: '',
  name: '',
  isConnected: false,
  isConnecting: false,
};

export const scan = () => {
  return (
    dispatch: AppDispatch,
    getState: () => RootState,
    DeviceManager: BleManager,
  ) => {
    dispatch(bluetoothOn());
    DeviceManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        dispatch(bluetoothOff());
        return;
      }
      device &&
        device.isConnected().then((isConnected: boolean) => {
          let {
            ble: {devices},
          } = getState();

          const isScanned = checkIsScanned(device, devices);
          if (!isScanned) {
            const deviceState = {
              ...device,
              isConnected: isConnected,
              isConnecting: false,
            };
            dispatch(addDevice(deviceState));
            isConnected && dispatch(setDevice(deviceState));
          }
        });
    });
  };
};

const checkIsScanned = (device: Device, devices: Device[]) => {
  const found = devices.find(
    deviceInStorage => deviceInStorage.id === device.id,
  );
  if (!found) {
    return false;
  }
  return true;
};

export const stopScan = () => {
  return (
    dispatch: AppDispatch,
    getState: () => RootState,
    DeviceManager: BleManager,
  ) => {
    let {
      ble: {device, devices},
    } = getState();
    DeviceManager.stopDeviceScan();
    dispatch(bluetoothOff());
  };
};

export const disconnectDevice = () => {
  return (
    dispatch: AppDispatch,
    getState: () => RootState,
    DeviceManager: BleManager,
  ) => {
    let {
      ble: {device, devices},
    } = getState();
    DeviceManager.cancelDeviceConnection(device.id).then(deviceUpdated => {
      const deviceState = {
        ...deviceUpdated,
        isConnected: false,
        isConnecting: false,
      };
      dispatch(updateDevice(deviceState));
      dispatch(setDevice(emptyDevice));
    });
  };
};

export const subscibeOnDevice = (isMounted: boolean, onDisconnect: () => void) => {
  return (
    dispatch: AppDispatch,
    getState: () => RootState,
    DeviceManager: BleManager,
  ) => {
    let {
      ble: {device, devices},
    } = getState();
    DeviceManager.onDeviceDisconnected(device.id, () => {
      const deviceState = {
        ...device,
        isConnected: false,
      };
      dispatch(updateDevice(deviceState));
      dispatch(setDevice(emptyDevice));
      isMounted && onDisconnect();
    });
  };
};

export const updateConnect = (connectingDevice: Device) => {
  return (
    dispatch: AppDispatch,
    getState: () => RootState,
    DeviceManager: BleManager,
  ) => {
    let {
      ble: {device, devices},
    } = getState();
    if (device.id !== '') {
      DeviceManager.cancelDeviceConnection(device.id)
        .then(deviceUpdated => {
          const deviceState = {
            ...deviceUpdated,
            isConnected: false,
            isConnecting: false,
          };
          dispatch(updateDevice(deviceState));
          dispatch(setDevice(emptyDevice));
          connectDevice(dispatch, getState, DeviceManager, connectingDevice);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      connectDevice(dispatch, getState, DeviceManager, connectingDevice);
    }
  };
};

const connectDevice = (
  dispatch: AppDispatch,
  getState: () => RootState,
  DeviceManager: BleManager,
  connectingDevice: Device,
) => {
  dispatch(
    updateDevice({
      ...connectingDevice,
      isConnecting: true,
    }),
  );
  dispatch(
    setDevice({
      ...connectingDevice,
      isConnecting: true,
    }),
  );
  DeviceManager.connectToDevice(connectingDevice.id, null)
    .then(deviceUpdated => {
      deviceUpdated.isConnected().then(connectionStatus => {
        const deviceState = {
          ...deviceUpdated,
          isConnected: connectionStatus,
          isConnecting: false,
        };
        dispatch(updateDevice(deviceState));
        if (deviceState.isConnected) {
          dispatch(setDevice(deviceState));
        }
      });
    })
    .catch((error: any) => {
      const deviceState = {
        ...connectingDevice,
        isConnecting: false,
      };
      dispatch(updateDevice(deviceState));
      dispatch(setDevice(emptyDevice));
    });
};
