import {StyleSheet, Platform} from 'react-native';
import {scale} from '../../utils/cameraUtils';
import {getStatusBarHeight} from '../../utils/utils';
import {_animatedOpacity} from './index';
import {backGround} from '../../constants/colors';

export default StyleSheet.create({
  content: {
    position: 'relative',
    backgroundColor: '#182229',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  cameraViewContainer: {
    flex: 1,
    backgroundColor: '#182229',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  portraitView: {
    flexDirection: 'column',
  },
  landscapeView: {
    flexDirection: 'row',
  },
  portraitHeader: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  landscapeHeader: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backButton: {
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonIcon: {
    height: scale(14),
    width: scale(8),
  },
  portraitUseCameraButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  landscapeUseCameraButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  animatedStyle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? getStatusBarHeight() + scale(50) : 0,
    backgroundColor: 'black',
    zIndex: 9999,
  },
  headerIOS: {
    backgroundColor: backGround,
    height: getStatusBarHeight(),
  },
  imageStyle: {
    width: scale(70),
    height: scale(70),
  },
});
