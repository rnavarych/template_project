import {StyleSheet} from 'react-native';
import {BLOCK_HEIGHT, SPACCING} from '../../constants/animation';

export default StyleSheet.create({
  container: {
    marginBottom: SPACCING,
    alignItems: 'center',
    borderWidth: 1,
    height: BLOCK_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: BLOCK_HEIGHT,
  },
});
