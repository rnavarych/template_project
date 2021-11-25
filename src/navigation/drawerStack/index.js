import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import * as routes from '../../constants/routes';

import HomeScreen from '../../containers/main/home';
import SettingsScreen from '../../containers/main/settings';
import ProfileScreen from '../../containers/main/profile';
import MapScreen from '../../containers/main/map';
import ImageList from '../../containers/main/ImageList';

import CustomDrawer from '../../components/customDrawer/';
import bleStack from '../bluetoothStack';

const Drawer = createDrawerNavigator();

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
          component={bleStack}
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

  export default HomeStackScreen;