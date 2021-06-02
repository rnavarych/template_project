import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flatContainer: {
    flex: 1,
    backgroundColor: '#f0f3f4',
  },
  wrapperList: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginLeft: 12,
    marginRight: 12,
    resizeMode: 'cover',
    marginBottom: 24,
  },
  imageStyle: {
    borderRadius: 12,
  },
  listHeader: {
    height: 24,
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    left: 13,
  },
  touchableStyle: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 0,
  },
});
