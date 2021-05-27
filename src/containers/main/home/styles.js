import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    flex: 2,
    marginTop: Platform.OS === 'ios' ? 80 : 20,
  },
  pickerStyle: {
    flex: 1,
  },
});
