import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {View, Text, FlatList, ScrollView, Dimensions} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';

import styles from './styles';

import Button from '../../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {
  disconnectDevice,
  subscibeOnDevice,
} from '../../../../actions/bluetoothActions';
import {RootState} from '../../../../store';
import * as routes from '../../../../constants/routes';
import {useNavigation, useTheme} from '@react-navigation/native';

import {RootStackParamList} from '../../../types';
import { strings } from '../../../../l18n';

type Props = {};
type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main',
>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen: React.FC<Props> = () => {
  const device = useSelector((state: RootState) => state.ble.device);

  ({
    id,
    isConnectable,
    isConnected,
    isConnecting,
    localName,
    manufacturerData,
    mtu,
    name,
    overflowServiceUUIDs,
    rssi,
    serviceData,
    serviceUUIDs,
    solicitedServiceUUIDs,
    txPowerLevel,
  } = device);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          containerStyle={styles.button}
          text={strings("buttons.disconnect")}
          onPress={() => dispatch(disconnectDevice())}
        />
      ),
    });
  }, [navigation]);

  const {colors} = useTheme();
  const [text, setText] = useState('');
  let isMounted = true;

  const subscriber = () => {
    dispatch(subscibeOnDevice(isMounted, () => setText('Device is disconnected')));
  };
  
  useEffect(() => {
    setText(
      JSON.stringify({
        id,
        isConnectable,
        isConnected,
        isConnecting,
        localName,
        manufacturerData,
        mtu,
        name,
        overflowServiceUUIDs,
        rssi,
        serviceData,
        serviceUUIDs,
        solicitedServiceUUIDs,
        txPowerLevel,
      }),
    );
    subscriber();
    return () => {isMounted = false};
  }, []);

  return (
    <View style={{...styles.mainContainerStyle, backgroundColor: colors.card}}>
      <View style={styles.listHeader}>
        <ScrollView style={{height: windowHeight}} nestedScrollEnabled={true}>
          <Text style={{...styles.text, color: colors.text}}>{text}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
