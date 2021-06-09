import {StyleSheet} from 'react-native';

const sharedStyles = {
  marginLeft: 12,
  marginRight: 12,
  marginBottom: 24,
};

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
    ...sharedStyles,
    resizeMode: 'cover',
  },
  videoPlayer: {
    ...sharedStyles,
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
  video: {
    top: 25,
  },
  touchableStyle: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 0,
  },
});
