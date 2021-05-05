import React from 'react';
import {Platform, Dimensions, StatusBar} from 'react-native';

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
