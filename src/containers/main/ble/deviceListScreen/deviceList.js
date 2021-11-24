import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../../types';
import {useFocusEffect} from '@react-navigation/native';

import styles from './styles';

import Button from '../../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {reset} from '../../../../actions/ble';
import {scan, stopScan} from '../../../../actions/bluetoothActions';
import DeviceComponent from '../../../../components/device';
import {RootState} from '../../../../store';
import ModalComponent from '../../../../components/modal/modal';
import {disabledBtn, bluetoothColor} from '../../../../constants/colors';
import * as routes from '../../../../constants/routes';
import { strings } from '../../../../l18n';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main',
>;

type Props = {};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen: React.FC<Props> = () => {
  const devices = useSelector((state: RootState) => state.ble.devices);
  const device = useSelector((state: RootState) => state.ble.device);
  const bluetoothStatus = useSelector(
    (state: RootState) => state.ble.isBluetoothOn,
  );
  const {colors} = useTheme();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    device.isConnected ? fadeIn() : fadeOut();
  }, [device.isConnected]);

  useFocusEffect(
    useCallback(() => {
      dispatch(reset());
      dispatch(scan());

      return () => dispatch(stopScan());
    }, []),
  );

  const nextPressHandler = () => {
    navigation.navigate(routes.DEVICE_LOG_SCREEN);
  };

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: colors.card}}>
      <View style={styles.listHeader}>
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={modalText}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          style={{width: '100%'}}
          data={devices}
          renderItem={({item}) => (
            <DeviceComponent
              key={item.id}
              device={item}
              setModalVisible={value => setModalVisible(value)}
              setModalText={value => setModalText(value)}
            />
          )}
        />
      </View>
      {device.isConnected && (
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Button
            text={strings("buttons.next")}
            containerStyle={styles.floatButton}
            onPress={nextPressHandler}
            textStyle={styles.text}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default HomeScreen;
