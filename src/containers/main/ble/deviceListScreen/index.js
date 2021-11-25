import React, {useCallback, useEffect, useState, useRef} from 'react';
import {View, FlatList, Dimensions, Animated} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

import styles from './styles';

import Button from '../../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {reset} from '../../../../actions/ble';
import {scan, stopScan} from '../../../../actions/bluetoothActions';
import DeviceComponent from '../../../../components/device';
import ModalComponent from '../../../../components/modal';
import * as routes from '../../../../constants/routes';
import {strings} from '../../../../l18n';

const HomeScreen = () => {
  const devices = useSelector(state => state.ble.devices);
  const device = useSelector(state => state.ble.device);

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
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
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
          data={devices}
          renderItem={({item}) => (
            <DeviceComponent
              key={item.id}
              device={item}
              setModalVisible={setModalVisible}
              setModalText={setModalText}
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
            text={strings('buttons.next')}
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
