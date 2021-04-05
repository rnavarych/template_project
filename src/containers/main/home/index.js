import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';

function HomeScreen() {
  return (
    <View style={styles.contentContainer}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default connect()(HomeScreen);
