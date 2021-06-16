import React from 'react';
import {View} from 'react-native';

import Button from './nativeBtn';
import styles from './styles';

const NativeButton = ({styleBtn, style, ...props}) => {
  return (
    <View style={[styles.container, style]}>
      <Button {...props} style={[styles.button, styleBtn]} />
    </View>
  );
};

export default NativeButton;
