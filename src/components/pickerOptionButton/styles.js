import {StyleSheet} from 'react-native';
import {panelButton} from '../../constants/colors';

export default StyleSheet.create({
  panelButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: panelButton,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
