import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 80 : 20,
  },
  pickerStyle: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 40,
  },
});
