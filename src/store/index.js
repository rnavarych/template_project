import {createStore, applyMiddleware} from 'redux';
import authReducer from '../reducers/auth';
import {apiMiddleware} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';

export const configureStore = () => {
  const middlewares = [apiMiddleware];
  if (__DEV__) {
    middlewares.push(logger);
  }

  const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    timeout: null,
  };

  const authPersistedReducer = persistReducer(persistConfig, authReducer);

  const store = createStore(
    authPersistedReducer,
    applyMiddleware(...middlewares),
  );
  const persistor = persistStore(store);
  return {store, persistor};
};
