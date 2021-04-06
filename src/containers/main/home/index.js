import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Switch} from 'react-native-paper';
import {connect, useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {changeTheme} from '../../../actions/changeTheme';

function HomeScreen() {
  const isDark = useSelector(state => state.changeTheme.isDarkTheme);
  const dispatch = useDispatch();
  const toggleSwitch = () => dispatch(changeTheme(!isDark));

  return (
    <View style={styles.contentContainer}>
      <Text>Home Screen</Text>
      <Switch
        trackColor={{false: '#767577', true: '#fff'}}
        thumbColor={isDark ? 'tomato' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isDark}
      />
    </View>
  );
}

export default connect()(HomeScreen);
