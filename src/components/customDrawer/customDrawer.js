import React from 'react';
import {View, Image, Animated, Text} from 'react-native';
import {useTheme, Title, Caption, Drawer} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import {AuthContext} from '../components/context';
import styles from './styles';
import avatar from '../../assets/images/2048_ava.jpg';
import Button from '../../components/button';
import * as routes from '../../constants/routes';
import CustomDrawerItem from '../customDrawerItem/drawerItem';

export default function DrawerContent({state, descriptors, navigation}) {
  const {colors} = useTheme();

  const onPress = (isFocused, index, route) => {
    if (!isFocused) {
      navigation.navigate(route.name);
    }
  };
  return (
    <>
        <DrawerContentScrollView style={{...styles.drawerMainContainer}}>
          <View style={styles.drawerUserContainer}>
            <Image style={styles.imageStyle} source={avatar} size={50} />
            <View style={styles.userTextContainer}>
              <Title style={[styles.title, {color: colors.text}]}>Username</Title>
              <Caption style={[styles.caption, {color: colors.placeholder}]}>@userId</Caption>
            </View>
          </View>
          <View style={styles.drawerSection}>
            {state.routes.map((route, index) => (
              <CustomDrawerItem
                key={index}
                route={route}
                descriptors={descriptors}
                isFocused={state.index === index}
                index={index}
                onPress={onPress}
                label={descriptors[route.key].options.drawerLabel || route.name}
              />
            ))}
          </View>
        </DrawerContentScrollView>
      <View style={{...styles.buttonContainer}}>
        <Button
          containerStyle={styles.buttonStyle}
          text=" Log Out"
          iconSize = {34}
          vectorIcon="ios-chevron-back-circle"
          textStyle={styles.buttonText}
        />
      </View>
    </>
  );
}
