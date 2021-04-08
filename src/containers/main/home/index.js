import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {connect, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import {changeTab} from '../../../analytics/';
import styles from './styles';

function HomeScreen() {
  const [users, setUsers] = useState([]);
  const username = useSelector(state => state.setUsername.username);

  useEffect(() => {
    getUsers();
    changeTab(HomeScreen.name, HomeScreen.name);
  }, []);

  const getUsers = async () => {
    const subscriber = await firestore()
      .collection('users')
      .onSnapshot(docs => {
        let users = [];
        docs.forEach(doc => {
          users.push(doc.data());
        });
        setUsers(users);
      });
    return () => subscriber();
  };

  return (
    <View style={styles.contentContainer}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default connect()(HomeScreen);
