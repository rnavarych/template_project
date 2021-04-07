import React from 'react';
import {I18nManager, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';

import {HandleNotifications} from './scripts/handleNotifications';
import Navigation from './navigation';
import './configs/stylesheet';

import {configureStore} from './store';
import { setDirection } from './actions/settings'

const {store, persistor} = configureStore();
export {store};

function App() {
  StatusBar.setBarStyle('dark-content', true);
  store.dispatch(setDirection(I18nManager.isRTL))
  
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
          <HandleNotifications />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default codePush(App);
