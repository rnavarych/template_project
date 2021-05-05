import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './styles';
import images from '../../configs/images';
import {underlayColor} from '../../constants/colors';

const CameraView = ({onCameraRef, onCameraButton, onBackButtonPress}) => {
  const _animatedOpacity = new Animated.Value(0);

  const [cameraWidth, setCameraWidth] = useState(null);
  const [cameraHeight, setCameraHeight] = useState(null);
  const [portraitOrientation, setPortraitOrientation] = useState(null);

  useEffect(() => {
    updateCameraDimensions({window: Dimensions.get('window')});
    Dimensions.addEventListener('change', updateCameraDimensions);

    return () =>
      Dimensions.removeEventListener('change', updateCameraDimensions);
  });

  const updateCameraDimensions = ({window: {width, height}}) => {
    let cameraWidth, cameraHeight;
    if (height > width) {
      cameraWidth = width;
      cameraHeight = (4 * width) / 3;
    } else {
      cameraHeight = height;
      cameraWidth = (4 * height) / 3;
    }
    setCameraWidth(cameraWidth);
    setCameraHeight(cameraHeight);
    setPortraitOrientation(height > width);
  };

  const handleTouch = () => {
    Animated.sequence([
      Animated.timing(_animatedOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(_animatedOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onCameraButton();
  };

  return (
    <View
      style={[
        styles.cameraViewContainer,
        portraitOrientation ? styles.portraitView : styles.landscapeView,
      ]}>
      {Platform.OS === 'ios' && <View style={styles.headerIOS} />}
      {Platform.OS === 'ios' && (
        <View
          style={
            portraitOrientation ? styles.portraitHeader : styles.landscapeHeader
          }>
          <TouchableHighlight
            underlayColor={underlayColor}
            style={styles.backButton}
            onPress={onBackButtonPress}>
            <Image
              source={images.backArrowCamera}
              style={styles.backButtonIcon}
            />
          </TouchableHighlight>
        </View>
      )}
      <Animated.View
        style={[
          styles.animatedStyle,
          {width: cameraWidth, height: cameraHeight, opacity: _animatedOpacity},
        ]}
        pointerEvents="none"
      />
      <View style={{width: cameraWidth, height: cameraHeight}}>
        <RNCamera
          ref={onCameraRef}
          type={RNCamera.Constants.Type.back}
          style={{
            width: cameraWidth,
            height: cameraHeight,
          }}
          ratio="4:3"
          playSoundOnCapture={true}
        />
      </View>
      <View
        style={
          portraitOrientation
            ? styles.portraitUseCameraButtonContainer
            : styles.landscapeUseCameraButtonContainer
        }>
        <TouchableHighlight underlayColor="transparent" onPress={handleTouch}>
          <Image source={images.takePhoto} style={styles.imageStyle} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default CameraView;
