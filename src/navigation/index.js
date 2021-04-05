import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as routes from '../constants/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect, useSelector} from 'react-redux';

import LoginScreen from '../containers/auth';
import HomeScreen from '../containers/main/home';
import SettingsScreen from '../containers/main/settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarIconHandler = (route, focused, color, size) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'ios-home' : 'ios-home-outline';
  } else if (route.name === 'Settings') {
    iconName = focused ? 'ios-settings' : 'ios-settings-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const HomeStackScreen = () => {
  const isDark = useSelector(state => state.changeTheme.isDarkTheme);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          tabBarIconHandler(route, focused, color, size),
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: isDark ? '#fff' : 'gray',
        style: {
          backgroundColor: isDark ? '#494f4f' : '#fff',
        },
      }}>
      <Tab.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={routes.SETTINGS_SCREEN} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect()(Navigation);
