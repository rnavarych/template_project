import {Platform, Dimensions, StatusBar} from 'react-native';
import {showErr} from './error';
import CameraRoll from '@react-native-community/cameraroll';

import {requestReadStoragePermission} from '../services/permissions';

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

export function getStatusBarHeight(skipAndroid = false) {
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 44;
    }
    return 20;
  }

  if (skipAndroid) {
    return 0;
  }

  return StatusBar.currentHeight;
}

export const getPhotoFromDevice = async (assetType = 'All') => {
  if (Platform.OS === 'android' && !(await requestReadStoragePermission()))
    return;
  let result = [];

  if (assetType) {
    try {
      result = (
        await CameraRoll.getPhotos({
          first: 20,
          assetType: assetType,
        })
      ).edges;
    } catch (error) {
      showErr(error);
    }
  }
  return result;
};
