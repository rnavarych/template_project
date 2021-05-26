import 'react-native-gesture-handler';
import React from 'react';
import analytics from '@react-native-firebase/analytics';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import * as routes from '../constants/routes';
import {connect, useSelector} from 'react-redux';
import {strings} from '../l18n';

import CustomTabBar from '../containers/main/tab';
import LoginScreen from '../containers/auth';
import HomeScreen from '../containers/main/home';
import SettingsScreen from '../containers/main/settings';
import ProfileScreen from '../containers/main/profile';

import MapScreen from '../containers/main/map';
import CameraScreen from '../containers/main/camera';
import GalleryScreen from '../containers/main/gallery';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={routes.SETTINGS_SCREEN} component={SettingsScreen} />
      <Tab.Screen name={routes.PROFILE_SCREEN} component={ProfileScreen} />
      <Tab.Screen name={routes.MAP_SCREEN} component={MapScreen} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const isDark = useSelector(state => state.changeTheme.isDarkTheme);
  const theme = isDark ? DarkTheme : DefaultTheme;
  const themeForPaper = isDark ? PaperDarkTheme : PaperDefaultTheme;
  return (
    <PaperProvider theme={themeForPaper}>
      <NavigationContainer onStateChange={onStateChange} theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name={routes.LOGIN_SCREEN}
            component={LoginScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen
            name={routes.HOME_SCREEN}
            component={HomeStackScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen
            name={routes.PROFILE_SCREEN}
            component={HomeStackScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen
            name={routes.CAMERA_SCREEN}
            component={CameraScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen
            name={routes.GALLERY_SCREEN}
            component={GalleryScreen}
            options={{
              headerTitle: strings('headers.gallery'),
              headerBackTitle: false,
              animationTypeForReplace: 'pop',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const onStateChange = async state => {
  const [previousRouteName, currentRouteName] = state.routes;

  if (previousRouteName !== currentRouteName) {
    await analytics().logScreenView({
      screen_name: currentRouteName.name,
      screen_class: currentRouteName.name,
    });
  }
};

export default connect()(Navigation);
