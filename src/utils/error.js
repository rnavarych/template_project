import {Alert} from 'react-native';
import {strings} from '../l18n/index';

export const showErr = e => {
  Alert.alert(strings('alert.titleErr'), e.message, [
    {text: strings('alert.positiveBtn'), onPress: () => {}},
  ]);
};
