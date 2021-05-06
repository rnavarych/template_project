import React from 'react';
import {View, ActivityIndicator} from 'react-native'

import {progressColor} from '../../constants/colors'
import styles from './style'

const Progress = (props) => {
  return (
    <View
      style={[styles.container,props.style?props.style:null]}>
      <ActivityIndicator size="large" color={progressColor} />
    </View>
  );
};

export default Progress;
