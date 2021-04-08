import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {connect, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import {changeTab} from '../../../analytics/';
import styles from './styles';
import Input from '../../../components/input';
import {strings} from '../../../l18n';
import Button from '../../../components/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function ProfileScreen() {
    const [username, setUserName] = useState('');
    const [surname, setSurName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const user_email = useSelector(state => state.setUsername.username);

  useEffect(() => {
    getUsers();

    changeTab(ProfileScreen.name, ProfileScreen.name);
      setErrorMessage('');
  }, [username, password]);

  useEffect(() => {
      if (users){
          users.filter((userInfo) => {
              if (userInfo.email === user_email) {
                  setUser(userInfo);
              };
          })
        }
  }, [users])

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
    <KeyboardAwareScrollView
      extraHeight={100}
      style={styles.screenContainer}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps={'handled'}
      bounces={false}>
      <View style={styles.userForm}>
        <Input
          label={user[0].name}
          autoCapitalize={'none'}
          autoCorrect={false}
          spellCheck={false}
          text={'Username'}
          onChange={input => setUserName(input)}
          containerStyle={styles.inputMargin}
        />
        <Input
            label={user[0].surname}
            autoCapitalize={'none'}
            autoCorrect={false}
            spellCheck={false}
            text={'Surname'}
            onChange={input => setSurName(input)}
            containerStyle={styles.inputMargin}
        />
          <Input
              label={user[0].age}
              autoCapitalize={'none'}
              autoCorrect={false}
              spellCheck={false}
              text={'Age'}
              onChange={input => setAge(input)}
              containerStyle={styles.inputMargin}
          />
          <Input
              label={user[0].city}
              autoCapitalize={'none'}
              autoCorrect={false}
              spellCheck={false}
              text={'City'}
              onChange={input => setCity(input)}
              containerStyle={styles.inputMargin}
          />
          <Input
              label={user[0].email}
              autoCapitalize={'none'}
              autoCorrect={false}
              spellCheck={false}
              text={'Email'}
              onChange={input => setEmail(input)}
              containerStyle={styles.inputMargin}
          />
      </View>
      <Text style={styles.errorText}>
        {errorMessage !== '' ? errorMessage : ' '}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          fetching={}
          text={strings('buttons.login')}
          onPress={}
          containerStyle={styles.styledButton}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default connect()(ProfileScreen);
