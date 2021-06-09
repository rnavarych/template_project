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

import * as routes from '../constants/routes';
import {useSelector} from 'react-redux';

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

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
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={routes.IMAGES_SCREEN} component={ImageList} />
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
            component={GalleryStackScreen}
            options={{
              headerTitle: strings('headers.photos'),
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
    try {
      await analytics().logScreenView({
        screen_name: currentRouteName.name,
        screen_class: currentRouteName.name,
      });
    } catch (error) {}
  }
};

export default Navigation;
