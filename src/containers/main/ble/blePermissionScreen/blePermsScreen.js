import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';

import styles from './styles';

import Button from '../../../../components/button';
import {
  checkBluetooth_,
  requestBluetooth_,
} from '../../../../services/permissions';
import {
  disabledBtn,
  bluetoothColor,
} from '../../../../constants/colors';
import Logo from '../../../../assets/images/bleY.png';
import {RootStackParamList} from '../../../types';
import * as routes from '../../../../constants/routes';
import { strings } from '../../../../l18n';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main',
>;

type Props = {};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PersmScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const [permissions, setPermissions] = useState(false);
  const message = permissions
    ? strings("permission.granted")
    : strings("permission.denied");
  let color = permissions ? bluetoothColor : disabledBtn;

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    let isAvailable = await checkBluetooth_();
    setPermissions(isAvailable);
  };

  const askPermissions = async () => {
    await requestBluetooth_();
  };

  const nextPressHandler = () => {
    if (permissions) {
      navigation.navigate(routes.DEVICE_LIST_SCREEN);
    } else {
    }
  };

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: colors.card}}>
      <View style={styles.topContainer}>
        <Image style={{...styles.image, tintColor: color}} source={Logo} />
        <Text style={{...styles.text, color: colors.text}}>{message}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          {!permissions ? (
            <Button
              text={strings("permission.ask")}
              containerStyle={{...styles.button}}
              textStyle={{...styles.buttonText, color: colors.text}}
              onPress={askPermissions}
            />
          ) : (
            <></>
          )}
          <Button
            text={strings("buttons.next")}
            textStyle={{...styles.buttonText, color: colors.background}}
            containerStyle={{...styles.button, backgroundColor: color}}
            onPress={nextPressHandler}
          />
        </View>
        <View />
      </View>
    </View>
  );
};

export default PersmScreen;
