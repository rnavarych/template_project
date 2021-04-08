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
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          tabBarIconHandler(route, focused, color, size),
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={routes.SETTINGS_SCREEN} component={SettingsScreen} />
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
