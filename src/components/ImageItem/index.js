import React from 'react';
import {View, TouchableWithoutFeedback, Image} from 'react-native';

import styles from './styles';

const ImageItem = ({item, onClick}) => {
  const handleClick = () => onClick(item);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleClick}>
        <Image style={styles.image} source={{uri: item}} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ImageItem;
