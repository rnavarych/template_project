import React, {useRef, useEffect, useState} from 'react';
import {Image, Animated, TouchableWithoutFeedback} from 'react-native';

import styles from './styles';

const ImageBox = ({uri, setModal}) => {
  const scale = useRef(new Animated.Value(0)).current;

  return (
    <TouchableWithoutFeedback onPress={() => setModal(false)}>
      <Image
        source={{uri}}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default ImageBox;
