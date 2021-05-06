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

import {polylineColor} from '../../../constants/colors'
import {
  requestLocationPermission,
  requestLocationCoarsePermission,
} from '../../../services/permissions';

const Map = () => {
  const [showSpinner, setSpinner] = useState(true);
  const [watchId, setWatchId] = useState(null);
  const [coordinates, setCoordinates] = useState(true);
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
        console.log(err);
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
    Alert.alert('Error', err.message, [{text: 'OK', onPress: () => {}}]);

  const getPermissionAndTrackUser = async () => {
    const options = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    };
    if (Platform.OS === 'ios') {
      setWatchId(Geolocation.watchPosition(sendUserLocationToFb, showErr), {
        ...options,
        distanceFilter: 300,
        useSignificantChanges: true,
      });
    } else {
      try {
        const granted = await requestLocationPermission();
        const grantedCoarse = await requestLocationCoarsePermission();
        if (
          granted === PermissionsAndroid.RESULTS.GRANTED &&
          grantedCoarse === PermissionsAndroid.RESULTS.GRANTED
        ) {
          setWatchId(Geolocation.watchPosition(sendUserLocationToFb, showErr), {
            ...options,
            distanceFilter: 300,
            useSignificantChanges: true,
          });
        } else {
          const err = new Error('Permissions denied');
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
        initialRegion={{
          latitude: 53.902334,
          longitude: 27.5618791,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Polyline
          coordinates={[...Object.values(coordinates)]}
          strokeColor={polylineColor}
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

export default Map;
