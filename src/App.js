import React, {useState, useEffect} from 'react';
import {I18nManager, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';

import {HandleNotifications} from './scripts/handleNotifications';
import Navigation from './navigation';
import './configs/stylesheet';

import {configureStore} from './store';
import {setDirection} from './actions/settings';

const {store, persistor} = configureStore();
export {store};

function App() {
  const [showSpinner, setSpinner] = useState(true);
  StatusBar.setBarStyle('dark-content', true);
  store.dispatch(setDirection(I18nManager.isRTL));

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(()=>{
      setSpinner(false)
    },1000)
  }, []);

  if (showSpinner) return <LottieView loop autoPlay source={require('./assets/progress-bar.json')}/>

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
