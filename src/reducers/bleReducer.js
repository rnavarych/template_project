import {AnyAction} from 'redux';
import * as types from '../constants/actionTypes';

let initialState = {
  device: {id: '', name: '', isConnected: false, isConnecting: false},
  devices: [],
  isBluetoothOn: false,
  message: '',
};

const bleReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.BLUETOOTHON: {
      return {
        ...state,
        isBluetoothOn: true,
      };
    }
    case types.BLUETOOTHOFF: {
      return {
        ...state,
        isBluetoothOn: false,
      };
    }
    case types.CHANGECURRENTDEVICE: {
      return {
        ...state,
        device: action.payload,
      };
    }
    case types.ADDDEVICE: {
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };
    }
    case types.SETDEVICE: {
      return {
        ...state,
        device: action.payload,
      };
    }
    case types.UPDATEDEVICE: {
      return {
        ...state,
        devices: [
          action.payload,
          ...state.devices.filter(item => item.id !== action.payload.id),
        ],
      };
    }
    case types.SETMESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case types.RESET:
      return {...initialState, isBluetoothOn: state.isBluetoothOn};
    default: {
      return state;
    }
  }
};
export default bleReducer;
