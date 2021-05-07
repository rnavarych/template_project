import React from 'react';
import {View, ActivityIndicator} from 'react-native'

import {progressColor} from '../../constants/colors'
import styles from './style'

const Progress = ({style}) => {
  return (
    <View
      style={[styles.container,style]}>
      <ActivityIndicator size="large" color={progressColor} />
    </View>
  );
};

export default Progress;
