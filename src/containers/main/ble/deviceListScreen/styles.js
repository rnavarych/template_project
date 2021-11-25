import {StyleSheet} from 'react-native';
import {
  disabledBtn,
  bluetoothColor,
  lightBack,
  panelButton,
} from '../../../../constants/colors';

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  listHeader: {
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginVertical: 7,
    marginHorizontal: 3,
  },
  floatButton: {
    width: '95%',
    height: 50,
    borderRadius: 12,
    position: 'absolute',
    elevation: 10,
    right: 10,
  },
  fadingContainer: {
    width: '100%',
    height: 65,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    elevation: 10,
  },
});

export default styles;
