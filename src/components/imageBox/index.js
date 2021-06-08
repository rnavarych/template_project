import React from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';

import styles from './styles';

const ImageBox = ({uri, setModal}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setModal(false)}>
      <Image source={{uri}} style={styles.image} />
    </TouchableWithoutFeedback>
  );
};

export default ImageBox;
