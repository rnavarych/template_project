import React from 'react';
import {View, Text} from 'react-native';
import {connect, useSelector} from 'react-redux';
import styles from './styles';

function SettingsScreen() {
  const isDark = useSelector(state => state.changeTheme.isDarkTheme);
  return (
    <View
      style={{
        ...styles.contentContainer,
        backgroundColor: isDark ? '#494f4f' : '#fff',
      }}>
      <Text style={{color: isDark ? '#fff' : '#000'}}>Settings</Text>
    </View>
  );
}

export default connect()(SettingsScreen);
