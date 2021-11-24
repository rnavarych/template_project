import {PermissionsAndroid} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';


const {
  ACCESS_FINE_LOCATION,
  ACCESS_COARSE_LOCATION,
  READ_EXTERNAL_STORAGE,
} = PermissionsAndroid.PERMISSIONS;

export const requestLocationPermission = async () => {
  const check = await PermissionsAndroid.check(ACCESS_FINE_LOCATION);
  if (!check) return PermissionsAndroid.request(ACCESS_FINE_LOCATION);

  return PermissionsAndroid.RESULTS.GRANTED;
};

export const requestLocationCoarsePermission = async () => {
  const check = await PermissionsAndroid.check(ACCESS_COARSE_LOCATION);
  if (!check) return PermissionsAndroid.request(ACCESS_COARSE_LOCATION);

  return PermissionsAndroid.RESULTS.GRANTED;
};

export const requestReadStoragePermission = async () => {
  const check = await PermissionsAndroid.check(READ_EXTERNAL_STORAGE);
  if (!check) return PermissionsAndroid.request(READ_EXTERNAL_STORAGE);

  return PermissionsAndroid.RESULTS.GRANTED;
};

export const checkBluetooth_ = async (): Promise<boolean> => {
  return checkMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ])
    .then(statuses => {
      return statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

export const requestBluetooth_ = async () => {
  requestMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
  ]).then(statuses => {
    return `Bluetooth ${statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]}`;
  });
};
