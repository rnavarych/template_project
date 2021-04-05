import React from 'react';
import {TextInput, View, Text} from 'react-native';

import styles from './styles';
import {useSelector} from "react-redux";

function Input(props) {
  const isDark = useSelector(state => state.changeTheme.isDarkTheme);
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
      <Text style={{...styles.text, color: isDark ? '#fff' : '#000'}}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={{...styles.input, color: isDark ? '#fff' : '#000'}}
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
