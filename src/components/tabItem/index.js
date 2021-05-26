import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import * as routes from '../../constants/routes';

const TabItem = ({index, onPress, descriptors, route, isFocused}) => {
  const {options} = descriptors[route.key];

  const tabBarIconHandler = (route, focused, color, size) => {
    let iconName;
    const newSize = isFocused ? size + 4 : size;
    const focusStyles = isFocused ? styles.focusStyles : null;

    switch (route.name) {
      case routes.HOME_SCREEN:
        iconName = focused ? 'ios-home' : 'ios-home-outline';
        break;
      case routes.SETTINGS_SCREEN:
        iconName = focused ? 'ios-settings' : 'ios-settings-outline';
        break;
      case routes.PROFILE_SCREEN:
        iconName = focused ? 'ios-person' : 'ios-person-outline';
        break;
      case routes.MAP_SCREEN:
        iconName = focused ? 'ios-map' : 'ios-map-outline';
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
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={() => onPress(isFocused, index, route)}
      style={styles.btn}>
      <View style={styles.tabBarItem}>
        {tabBarIconHandler(route, isFocused, isFocused ? 'tomato' : 'gray', 24)}
      </View>
    </TouchableOpacity>
  );
};

export default TabItem;
