import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {focusedBtn, unFocusedBtn} from '../../constants/colors';
import styles from './styles';
import * as routes from '../../constants/routes';

const icons = {
  [routes.HOME_SCREEN]: 'ios-home-outline',
  [routes.IMAGES_SCREEN]: 'ios-image-outline',
  [routes.SETTINGS_SCREEN]: 'ios-settings-outline',
  [routes.PROFILE_SCREEN]: 'ios-person-outline',
  [routes.MAP_SCREEN]: 'ios-map-outline',
};

const TabItem = ({index, onPress, descriptors, route, isFocused}) => {
  const {options} = descriptors[route.key];

  const getIconName = icon => icon.substring(0, icon.length - '-outline'.length);

  const tabBarIconHandler = (route, color, size) => {
    let iconName = isFocused
      ? getIconName(icons[route.name])
      : icons[route.name];
    const newSize = isFocused ? size + 4 : size;
    const focusStyles = isFocused ? styles.focusStyles : null;

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
