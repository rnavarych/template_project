import {createStore, applyMiddleware, combineReducers} from 'redux';
import authReducer from '../reducers/auth';
import changeThemeReducer from '../reducers/changeTheme';
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
    key: 'root',
    storage: AsyncStorage,
    timeout: null,
    whitelist: ['auth', 'changeTheme'],
  };

  const rootReducer = combineReducers({
    auth: authReducer,
    changeTheme: changeThemeReducer,
  });

  const persitedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persitedReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  return {store, persistor};
};
