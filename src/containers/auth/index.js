import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import Input from '../../components/input';
import Button from '../../components/button';
import {strings} from '../../l18n';
import styles from './styles/common';
import * as routes from '../../constants/routes';

function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [username, password]);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => props.navigation.navigate(routes.HOME_SCREEN))
      .catch(error => setErrorMessage(error.message));
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
          label={strings('placeholder.username')}
          autoCapitalize={'none'}
          autoCorrect={false}
          spellCheck={false}
          text={username}
          onChange={input => setUsername(input)}
          containerStyle={styles.inputMargin}
        />
        <Input
          label={strings('placeholder.password')}
          text={password}
          onChange={input => setPassword(input)}
          containerStyle={styles.inputMargin}
          secure={true}
        />
      </View>
      <Text style={styles.errorText}>
        {errorMessage !== '' ? errorMessage : ' '}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          fetching={props.fetching}
          text={strings('buttons.login')}
          onPress={handleLogin}
          containerStyle={styles.styledButton}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default connect()(LoginScreen);
