import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import styles from './styles';
import * as routes from '../../constants/routes';

const icons = {
  [routes.HOME_SCREEN]: {
    selectedIcon: 'ios-home',
    unselectedIcon: 'ios-home-outline',
  },
  [routes.IMAGES_SCREEN]: {
    selectedIcon: 'ios-image',
    unselectedIcon: 'ios-image-outline',
  },
  [routes.SETTINGS_SCREEN]: {
    selectedIcon: 'ios-settings',
    unselectedIcon: 'ios-settings-outline',
  },
  [routes.PROFILE_SCREEN]: {
    selectedIcon: 'ios-person',
    unselectedIcon: 'ios-person-outline',
  },
  [routes.MAP_SCREEN]: {
    selectedIcon: 'ios-map',
    unselectedIcon: 'ios-map-outline',
  },
  [routes.PERMISSION_SCREEN]: {
    selectedIcon: 'bluetooth',
    unselectedIcon: 'bluetooth-outline',
  },
};

const DrawerItem = ({index, onPress, descriptors, route, isFocused, label}) => {
  const {colors} = useTheme();

  const iconName = isFocused ? icons[route.name].unselectedIcon : icons[route.name].unselectedIcon;

  return (
    <TouchableOpacity
      onPress={() => onPress(isFocused, index, route)}
      style={styles.btn}>
      <View style={styles.drawBarItem}>
        <View>
          <Ionicons
            name={iconName}
            size={26}
            color={colors.text}
            style={[styles.icon]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.textStyle, {color: colors.text}]}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerItem;
