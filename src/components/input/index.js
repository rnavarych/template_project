import React from 'react';
import {TextInput, View, Text} from 'react-native';

import styles from './styles';

function Input(props) {
  const {
    secure = false,
    label,
    text,
    placeholder,
    onChange,
    containerStyle,
    autoCapitalize,
    autoCorrect,
    spellCheck,
    keyboardType,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'#565a69'}
          onChangeText={onChange}
          value={text}
          secureTextEntry={secure}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          keyboardType={keyboardType}
          editable={props.editable}
        />
      </View>
    </View>
  );
}

export default Input;
