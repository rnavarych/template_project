import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {focusedBtn, unFocusedBtn} from '../../constants/colors';
import styles from './styles';
import * as routes from '../../constants/routes';

const TabItem = ({index, onPress, descriptors, route, isFocused}) => {
  const {options} = descriptors[route.key];

  const tabBarIconHandler = (route, color, size) => {
    let iconName;
    const newSize = isFocused ? size + 4 : size;
    const focusStyles = isFocused ? styles.focusStyles : null;

    switch (route.name) {
      case routes.HOME_SCREEN:
        iconName = isFocused ? 'ios-home' : 'ios-home-outline';
        break;
      case routes.SETTINGS_SCREEN:
        iconName = isFocused ? 'ios-settings' : 'ios-settings-outline';
        break;
      case routes.PROFILE_SCREEN:
        iconName = isFocused ? 'ios-person' : 'ios-person-outline';
        break;
      case routes.MAP_SCREEN:
        iconName = isFocused ? 'ios-map' : 'ios-map-outline';
        break;
    }

    return (
      <Ionicons
        name={iconName}
        size={newSize}
        color={color}
        style={[styles.icon, focusStyles]}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(isFocused, index, route)}
      style={styles.btn}>
      <View style={styles.tabBarItem}>
        {tabBarIconHandler(route, isFocused ? focusedBtn : unFocusedBtn, 24)}
      </View>
    </TouchableOpacity>
  );
};

export default TabItem;
