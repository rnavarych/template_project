import {createStore, applyMiddleware, combineReducers} from 'redux';
import {apiMiddleware} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import {BleManager, Device} from 'react-native-ble-plx';
import thunkMiddleware from 'redux-thunk';
import authReducer from '../reducers/auth';
import changeThemeReducer from '../reducers/changeTheme';
import favouritesReducer from '../reducers/favourites';
import bleReducer from '../reducers/bleReducer';
import {settings} from '../reducers/settings';

export const configureStore = () => {
  const middlewares = [
    apiMiddleware,
    thunkMiddleware.withExtraArgument(
      new BleManager({
        restoreStateIdentifier: 'BleInTheBackground',
        restoreStateFunction: restoredState => {},
      }),
    ),
  ];
  if (__DEV__) {
    middlewares.push(logger);
  }

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: null,
    whitelist: ['auth', 'changeTheme', 'settings'],
    blacklist: ['setUsername'],
  };

  const rootReducer = combineReducers({
    auth: authReducer,
    changeTheme: changeThemeReducer,
    settings: settings,
    favourites: favouritesReducer,
    ble: bleReducer,
  });

  const persitedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persitedReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  return {store, persistor};
};
