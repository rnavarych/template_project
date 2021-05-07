import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function PickerOptionButton({clickOption, optionText}) {
  return (
    <TouchableOpacity style={styles.panelButton} onPress={clickOption}>
      <Text style={styles.panelButtonTitle}>{optionText}</Text>
    </TouchableOpacity>
  );
}
