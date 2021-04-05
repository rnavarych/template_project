import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles/common';

function SettingsScreen() {
  return (
    <View style={styles.contentContainer}>
      <Text>Settings</Text>
    </View>
  );
}

export default connect()(SettingsScreen);
