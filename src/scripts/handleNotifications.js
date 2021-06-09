/* eslint-disable no-console */

import {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging, {firebase} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const requestUserPermission = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
    console.log('Authorization status:', authStatus);
  }
};

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
  }
  if (fcmToken) {
    await AsyncStorage.setItem('fcmToken', fcmToken);
    console.log('Your Firebase Token is:', fcmToken);
  }
};

export const HandleNotifications = () => {
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async message => {
      Alert.alert('Notification received', message);
    });

    return unsubscribe;
  }, []);

  return null;
};
