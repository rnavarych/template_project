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

const DrawerItem = ({index, onPress, descriptors, route, isFocused, label}) => {
  const getIconName = icon =>
    icon.substring(0, icon.length - '-outline'.length);

  const {colors} = useTheme();

  const tabBarIconHandler = (color, size) => {
    let iconName = isFocused
      ? getIconName(icons[route.name])
      : icons[route.name];

    return (
      <Ionicons
        name={iconName}
        size={size}
        color={color}
        style={[styles.icon]}
      />
    );
  };

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={() => onPress(isFocused, index, route)}
        style={styles.btn}>
        <View style={styles.drawBarItem}>
          <View>
            {tabBarIconHandler(colors.text, 26)}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.textStyle, {color: colors.text}]}>{label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerItem;
