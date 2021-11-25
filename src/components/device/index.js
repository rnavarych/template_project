import React, {useEffect, useState} from 'react';
import {Text, Pressable, View} from 'react-native';
import styles from './styles';

import Button from '../button';
import {useDispatch, useSelector, connect} from 'react-redux';
import {disconnectDevice, updateConnect} from '../../actions/bluetoothActions';
import {
  bluetoothColor,
  listItem,
  menuButton,
} from '../../constants/colors';
import {useTheme} from '@react-navigation/native';
import {strings} from '../../l18n';

const DeviceComponent = props => {
  const {device, setModalVisible, setModalText} = props;
  const [deviceName, setDeviceName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const dispatch = useDispatch();
  const {colors, dark} = useTheme();
  const {} = useSelector(state => state.ble);

  const isConnected = device.isConnected;
  const isConnecting = device.isConnecting;

  const color = isConnected
    ? {
        borderColor: bluetoothColor,
        borderWidth: 2,
      }
    : {};

  const border = dark
    ? {
        borderColor: 'white',
        borderWidth: 1,
      }
    : {
        borderColor: 'transparent',
        borderWidth: 0,
      };
  const title = () => {
    if (isConnecting) {
      return strings('buttons.connecting');
    } else {
      return isConnected
        ? strings('buttons.connected')
        : strings('buttons.connect');
    }
  };

  useEffect(() => {
    setDeviceName(device.name);
    setDeviceId(device.id);
  }, []);

  const pressHanlderConnect = () => {
    if (device.isConnected || device.isConnecting) dispatch(disconnectDevice());
    else {
      dispatch(updateConnect(device));
    }
  };

  const deviceShortText = `id : ${device.id} \nname : ${device.name} \n txLevel : ${device.txPowerLevel}`;

  const pressHanlderInfo = () => {
    setModalText(deviceShortText);
    setModalVisible(true);
  };

  return (
    <View
      style={{
        ...styles.mainContainer,
        backgroundColor: colors.background,
        ...border,
        ...color,
      }}>
      <View style={styles.lefContainer}>
        <View style={styles.midContainer}>
          <Text style={{...styles.textname, color: colors.text}}>
            {deviceName}
          </Text>
          <Text numberOfLines={2} style={styles.deviceId}>
            {deviceId}
          </Text>
        </View>
        <View style={styles.connectButtonContainer}>
          <Button
            containerStyle={{
              ...styles.connectButton,
              backgroundColor: menuButton,
            }}
            text={strings('buttons.info')}
            textStyle={{...styles.connectButtonText}}
            onPress={pressHanlderInfo}
          />
          <Button
            containerStyle={{
              ...styles.connectButton,
              backgroundColor: menuButton,
            }}
            text={title()}
            textStyle={{...styles.connectButtonText}}
            onPress={pressHanlderConnect}
          />
        </View>
      </View>
    </View>
  );
};

export default DeviceComponent;
