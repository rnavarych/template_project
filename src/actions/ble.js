import * as types from '../constants/actionTypes';

export const bluetoothOn = () => {
    return {
      type: types.BLUETOOTHON,
    };
  };
  export const bluetoothOff = () => {
    return {
      type: types.BLUETOOTHOFF,
    };
  };
  export const reset = () => {
    return {
      type: types.RESET,
    };
  };
  export const addDevice = (device) => {
    return {
      type: types.ADDDEVICE,
      payload: device,
    };
  };
  export const updateDevice = (device) => {
    return {
      type: types.UPDATEDEVICE,
      payload: device,
    };
  };
  export const setMessage = (message) => {
    return {
      type: types.SETMESSAGE,
      payload: message,
    };
  };
  export const setDevice = (device) => {
    return {
      type: types.SETDEVICE,
      payload: device,
    };
  };