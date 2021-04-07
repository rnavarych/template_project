import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {changeTab} from '../../../analytics/';
import styles from './styles';

function HomeScreen() {
  useEffect(() => {
    changeTab(HomeScreen.name, HomeScreen.name);
  }, []);

  return (
    <View style={styles.contentContainer}>
      <Text>Screen</Text>
    </View>
  );
}

export default connect()(HomeScreen);
