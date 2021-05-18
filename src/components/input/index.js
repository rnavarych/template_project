import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    iconName,
    onIconPress,
    iconStyles
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputContainer}>
        {iconName && onIconPress ? (
          <TouchableWithoutFeedback onPress={onIconPress}>
            <Ionicons
              style={[styles.icon, iconStyles]}
              size={24}
              name={iconName}
            />
          </TouchableWithoutFeedback>
        ) : null}
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
