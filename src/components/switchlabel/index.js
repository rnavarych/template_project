import React from 'react';
import {Switch, View} from 'react-native';
import {
  switchBgIos,
  switchThumbF,
  switchThumbT,
  switchTrackF,
  switchTrackT,
} from '../../constants/colors';
import {Text} from 'react-native-paper';

import styles from './styles';

export function SwitchLabel(props) {
  const {isEnabled, handleChange, text} = props;

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Switch
        trackColor={{false: switchTrackF, true: switchTrackT}}
        thumbColor={isEnabled ? switchThumbT : switchThumbF}
        ios_backgroundColor={switchBgIos}
        onValueChange={handleChange}
        value={isEnabled}
      />
    </View>
  );
}
