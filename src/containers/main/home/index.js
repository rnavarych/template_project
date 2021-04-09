import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {connect} from 'react-redux';

import {changeTab} from '../../../analytics/';
import styles from './styles';

function HomeScreen() {

  useEffect(() => {
    changeTab(HomeScreen.name, HomeScreen.name);
  }, []);

  return (
    <View style={styles.contentContainer}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default connect()(HomeScreen);
