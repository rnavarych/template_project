import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import styles from './styles';

function Button(props) {
  const {
    fetching = false,
    text,
    onPress,
    containerStyle,
    textStyle,
    icon,
  } = props;

  const buttonContent = () => {
    return icon ? (
      <View style={styles.iconHolder}>
        {icon && <Image style={styles.image} source={icon} />}

        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    ) : (
      <Text style={[styles.text, textStyle]}>{text}</Text>
    );
  };

  return (
    <TouchableOpacity
      onPress={fetching ? null : onPress}
      style={[
        styles.container,
        containerStyle,
        props.disabled ? styles.disabled : {},
      ]}>
      {fetching ? <ActivityIndicator color={'white'} /> : buttonContent()}
    </TouchableOpacity>
  );
}

export default Button;
