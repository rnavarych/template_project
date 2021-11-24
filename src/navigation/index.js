import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import analytics from '@react-native-firebase/analytics';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';

import * as routes from '../constants/routes';
import {strings} from '../l18n';

import CustomTabBar from '../containers/main/tab';
import LoginScreen from '../containers/auth';
import HomeScreen from '../containers/main/home';
import SettingsScreen from '../containers/main/settings';
import ProfileScreen from '../containers/main/profile';

import MapScreen from '../containers/main/map';
import CameraScreen from '../containers/main/camera';
import GalleryScreen from '../containers/main/gallery';
import ImageList from '../containers/main/ImageList';

import BlePermissionScreen from '../containers/main/ble/blePermissionScreen';
import DeviceListScreen from '../containers/main/ble/deviceListScreen';
import DeviceLogScreen from '../containers/main/ble/logScreen';
import CustomDrawer from '../components/customDrawer/';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const GalleryComponent = props => {
  const {name} = props.route;
  if (name === routes.GALLERY_SCREEN) {
    return <GalleryScreen tabName={routes.GALLERY_SCREEN} />;
  } else {
    return <GalleryScreen tabName={routes.FAVOURITES_SCREEN} />;
  }
};

const GalleryStackScreen = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name={routes.GALLERY_SCREEN}
        component={GalleryComponent}
      />
      <TopTab.Screen
        name={routes.FAVOURITES_SCREEN}
        component={GalleryComponent}
      />
    </TopTab.Navigator>
  );
};

const HomeStackScreen = () => {
  const username = useSelector(state => state.auth.username);
  const {reset} = useNavigation();
  const lastScreenVisited = useNavigationState(state => {
    const lastScreen = [];
    const currentRouteTop = state.routeNames[state.index];
    lastScreen[0] = currentRouteTop;
    if (state.routes[state.index].state) {
      const index = state.routes[state.index].state.index;
      const currentRoutChild =
        state.routes[state.index].state.routeNames[index];
      lastScreen[1] = {screen: currentRoutChild};
    }
    return lastScreen;
  });
  const dateExpire = new Date().getTime() + 1000 * 10 * 60;

  useEffect(() => {
    const interval = setInterval(() => {
      if (new Date().getTime() >= dateExpire) {
        reset({
          index: 0,
          routes: [
            {name: routes.LOGIN_SCREEN, params: {username, lastScreenVisited}},
          ],
        });
      }
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [lastScreenVisited]);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          borderTopRightRadius: 10,
          borderBottomRightRadius: 100,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
        }}
      />
      <Drawer.Screen
        name={routes.IMAGES_SCREEN}
        component={ImageList}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
        }}
      />
      <Drawer.Screen
        name={routes.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
        }}
      />
      <Drawer.Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
        }}
      />
      <Drawer.Screen
        name={routes.PERMISSION_SCREEN}
        component={BlePermissionScreen}
        options={{
          drawerLabel: 'Bluetooth',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={routes.MAP_SCREEN}
        component={MapScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
        }}
      />
    </Drawer.Navigator>
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
            component={GalleryStackScreen}
            options={{
              headerTitle: strings('headers.photos'),
              headerBackTitle: false,
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen
            name={routes.DEVICE_LIST_SCREEN}
            component={DeviceListScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen
            name={routes.DEVICE_LOG_SCREEN}
            component={DeviceLogScreen}
            options={{
              headerShown: true,
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
    try {
      await analytics().logScreenView({
        screen_name: currentRouteName.name,
        screen_class: currentRouteName.name,
      });
    } catch (error) {}
  }
};

export default Navigation;
