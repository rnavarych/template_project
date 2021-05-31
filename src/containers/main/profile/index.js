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
  const [editable, setEditable] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const user_email = useSelector(state => state.auth.username);

  useEffect(() => {
    isFetching ? getUsers() : null;
    changeTab(ProfileScreen.name, ProfileScreen.name);
    setErrorMessage('');
  }, []);

  const getUsers = async () => {
    try {
      const subscriber = await firestore()
        .collection('users')
        .doc(user_email)
        .onSnapshot(doc => {
          setUserName(doc.data().name);
          setSurName(doc.data().surname);
          setAge(doc.data().age);
          setCity(doc.data().city);
          setEmail(doc.data().email);
        });
      return () => subscriber();
    } catch (error) {}
  };

  const updateUserInfo = async () => {
    await firestore().collection('users').doc(user_email).update({
      age,
      city,
      email,
      name: username,
      surname,
    });
    setEditable(false);
    setFetching(false);
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={100}
      style={styles.screenContainer}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps={'handled'}
      bounces={false}>
      <Button
        text={strings(`${editable ? 'buttons.cancel' : 'buttons.edit'}`)}
        containerStyle={
          editable ? styles.styledSmallButtonRed : styles.styledSmallButton
        }
        onPress={() => setEditable(!editable)}
      />
      <View style={styles.userForm}>
        <Input
          label={'Name'}
          autoCapitalize={'none'}
          autoCorrect={false}
          spellCheck={false}
          text={username}
          onChange={input => setUserName(input)}
          containerStyle={styles.inputMargin}
          editable={editable}
        />
        <Input
          label={'Surname'}
          autoCapitalize={'none'}
          autoCorrect={false}
          spellCheck={false}
          text={surname}
          onChange={input => setSurName(input)}
          containerStyle={styles.inputMargin}
          editable={editable}
        />
        <Input
          label={'Age'}
          autoCapitalize={'none'}
          autoCorrect={false}
          spellCheck={false}
          text={age}
          onChange={input => setAge(input)}
          containerStyle={styles.inputMargin}
          editable={editable}
        />
        <Input
          label={'City'}
          autoCapitalize={'none'}
          autoCorrect={false}
          spellCheck={false}
          text={city}
          onChange={input => setCity(input)}
          containerStyle={styles.inputMargin}
          editable={editable}
        />
        <Input
          label={'Email'}
          autoCapitalize={'none'}
          autoCorrect={false}
          spellCheck={false}
          text={email}
          onChange={input => setEmail(input)}
          containerStyle={styles.inputMargin}
          editable={editable}
        />
      </View>
      <Text style={styles.errorText}>
        {errorMessage !== '' ? errorMessage : ' '}
      </Text>
      <View style={styles.buttonContainer}>
        {editable && (
          <Button
            text={strings('buttons.save')}
            containerStyle={styles.styledButton}
            onPress={updateUserInfo}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default connect()(ProfileScreen);
