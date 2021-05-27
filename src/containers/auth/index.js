import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

import {logSignUp} from '../../analytics';
import Input from '../../components/input';
import Button from '../../components/button';
import {strings} from '../../l18n';
import styles from './styles';
import * as routes from '../../constants/routes';
import {setUsername} from '../../actions/setUsername';

function LoginScreen(props) {
  const [username, setUserName] = useState('test@test.com');
  const [password, setPassword] = useState('Aa123456');
  const [secure, setSecure] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    username: yup.string().min(5).max(20).required(),
    password: yup.string().min(8).required()
  });

  useEffect(() => {
    setErrorMessage('');
    handleLogin()
  }, [username, password]);

  const handleLogin = async() => {
    try {
      await schema.validate({username, password})
      await auth().signInWithEmailAndPassword(username, password)
      dispatch(setUsername(username))
      logSignUp('email&pass');
      props.navigation.navigate(routes.HOME_SCREEN);
    } catch (error) {
      setErrorMessage(error.message)
    }      
  };

  const onIconPress = () => setSecure(!secure)
  
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
          onChange={input => setUserName(input)}
          containerStyle={styles.inputMargin}
        />
        <Input
          iconName={secure?'ios-eye-outline': 'ios-eye-off-outline'}
          label={strings('placeholder.password')}
          text={password}
          onChange={input => setPassword(input)}
          containerStyle={styles.inputMargin}
          onIconPress={onIconPress}
          secure={secure}
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
