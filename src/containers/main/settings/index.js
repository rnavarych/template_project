import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {connect} from 'react-redux';
import styles from './styles';

function SettingsScreen() {
  return (
    <View style={styles.contentContainer}>
      <Text>Settings</Text>
    </View>
  );
}

export default connect()(SettingsScreen);
