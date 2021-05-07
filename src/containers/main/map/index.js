import React, {useEffect, useState} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';

import Progress from '../../../components/Progress';

import { initialRegion } from '../../../constants/map'
import {strings} from '../../../l18n';
import {polylineColor} from '../../../constants/colors';
import {
  requestLocationPermission,
  requestLocationCoarsePermission,
} from '../../../services/permissions';

const Map = () => {
  const [showSpinner, setSpinner] = useState(true);
  const [watchId, setWatchId] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const doc = 'E6i8fSGMPJsR1jN2KoYz';

  const getRoute = async () => {
    await firestore()
      .collection('maps')
      .doc(doc)
      .get()
      .then(data => {
        setCoordinates(data.get('route'));
        setSpinner(false);
      })
      .catch(err => {
        setSpinner(false);
        showErr(err);
      });
  };

  const sendUserLocationToFb = async position => {
    await firestore()
      .collection('maps')
      .doc(doc)
      .update({
        userCoord: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  const showErr = err =>
    Alert.alert(strings('alert.titleErr'), err.message, [
      {text: strings('alert.positiveBtn'), onPress: () => {}},
    ]);

  const getPermissionAndTrackUser = async () => {
    const options = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
      distanceFilter: 300,
      useSignificantChanges: true,
    };
    if (Platform.OS === 'ios') {
      setWatchId(
        Geolocation.watchPosition(sendUserLocationToFb, showErr),
        options,
      );
    } else {
      try {
        const granted = await requestLocationPermission();
        const grantedCoarse = await requestLocationCoarsePermission();
        if (
          granted === PermissionsAndroid.RESULTS.GRANTED &&
          grantedCoarse === PermissionsAndroid.RESULTS.GRANTED
        ) {
          setWatchId(
            Geolocation.watchPosition(sendUserLocationToFb, showErr, options),
          );
        } else {
          const err = new Error(strings('permission.denied'));
          showErr(err);
        }
      } catch (err) {
        showErr(err);
      }
    }
  };

  useEffect(() => {
    getRoute();
    getPermissionAndTrackUser();
    () => Geolocation.clearWatch(watchId);
  }, []);

  if (showSpinner) return <Progress />;

  return (
    <View style={{...StyleSheet.absoluteFill}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={{...StyleSheet.absoluteFill}}
        initialRegion={initialRegion}>
        <Polyline
          coordinates={coordinates}
          strokeColor={polylineColor}
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

export default Map;
