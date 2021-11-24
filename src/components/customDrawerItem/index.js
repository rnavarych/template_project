import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import styles from './styles';
import * as routes from '../../constants/routes';

const icons = {
  [routes.HOME_SCREEN]: 'ios-home-outline',
  [routes.IMAGES_SCREEN]: 'ios-image-outline',
  [routes.SETTINGS_SCREEN]: 'ios-settings-outline',
  [routes.PROFILE_SCREEN]: 'ios-person-outline',
  [routes.MAP_SCREEN]: 'ios-map-outline',
  [routes.PERMISSION_SCREEN]: 'bluetooth-outline',
};

const iconSelected = {
  [routes.HOME_SCREEN]: 'ios-home',
  [routes.IMAGES_SCREEN]: 'ios-image',
  [routes.SETTINGS_SCREEN]: 'ios-settings',
  [routes.PROFILE_SCREEN]: 'ios-person',
  [routes.MAP_SCREEN]: 'ios-map',
  [routes.PERMISSION_SCREEN]: 'bluetooth',
};

const DrawerItem = ({index, onPress, descriptors, route, isFocused, label}) => {
  const {colors} = useTheme();

  const iconName = isFocused ? iconSelected[route.name] : icons[route.name];

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
            <Text style={[styles.textStyle, {color: colors.text}]}>
              {label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
  );
};

export default DrawerItem;
