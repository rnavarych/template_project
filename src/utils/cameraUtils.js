import {Dimensions} from 'react-native';

export const scale = size => {
  const SCALE_PORTRAIT = 375;
  let {width, height} = Dimensions.get('window');
  return ((height > width ? width : height) / SCALE_PORTRAIT) * size;
};
