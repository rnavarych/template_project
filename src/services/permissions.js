import {PermissionsAndroid} from 'react-native';

const {
  ACCESS_FINE_LOCATION,
  ACCESS_COARSE_LOCATION,
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
