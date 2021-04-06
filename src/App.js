import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {HandleNotifications} from './scripts/handleNotifications';
import Navigation from './navigation';
import './configs/stylesheet';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import {configureStore} from './store';

const {store, persistor} = configureStore();
export {store};

function App() {
  const [theme, setTheme] = useState(PaperDefaultTheme);
  store.subscribe(() => {
    const isDark = store.getState().changeTheme.isDarkTheme;
    setTheme(isDark ? PaperDarkTheme : PaperDefaultTheme);
  });

  StatusBar.setBarStyle('dark-content', true);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <HandleNotifications />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
