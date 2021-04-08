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
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState([]);
  const user_email = useSelector(state => state.setUsername.username);

  useEffect(() => {
    getUsers();
    changeTab(ProfileScreen.name, ProfileScreen.name);
      setErrorMessage('');
  }, [username]);

  const getUsers = async () => {
    const subscriber = await firestore()
      .collection('users')
       .doc(user_email)
      .onSnapshot(doc => {
        setUser(doc.data());
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
        {editable ? (
            <Button
                text={strings('buttons.cancel')}
                containerStyle={styles.styledSmallButtonRed}
                onPress={() => setEditable(false)}
            />
        ) : (
            <Button
                text={strings('buttons.edit')}
                containerStyle={styles.styledSmallButton}
                onPress={() => setEditable(true)}
            />
        )}
      <View style={styles.userForm}>
        <Input
          label={'Name'}
          autoCapitalize={'none'}
          autoCorrect={false}
          spellCheck={false}
          text={user?.name}
          onChange={input => setUserName(input)}
          containerStyle={styles.inputMargin}
          editable={editable}
        />
        <Input
            label={'Surname'}
            autoCapitalize={'none'}
            autoCorrect={false}
            spellCheck={false}
            text={user?.surname}
            onChange={input => setSurName(input)}
            containerStyle={styles.inputMargin}
            editable={editable}
        />
          <Input
              label={'Age'}
              autoCapitalize={'none'}
              autoCorrect={false}
              spellCheck={false}
              text={user?.age}
              onChange={input => setAge(input)}
              containerStyle={styles.inputMargin}
              editable={editable}
          />
          <Input
              label={'City'}
              autoCapitalize={'none'}
              autoCorrect={false}
              spellCheck={false}
              text={user?.city}
              onChange={input => setCity(input)}
              containerStyle={styles.inputMargin}
              editable={editable}
          />
          <Input
              label={'Email'}
              autoCapitalize={'none'}
              autoCorrect={false}
              spellCheck={false}
              text={user?.email}
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
              />
          )}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default connect()(ProfileScreen);
