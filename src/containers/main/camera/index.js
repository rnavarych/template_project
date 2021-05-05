import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import CameraRoll from '@react-native-community/cameraroll';
import CameraView from '../../../components/cameraView';

const CameraScreen = props => {
  const [uri, setUri] = useState(null);
  const [takingPhoto, setTakingPhoto] = useState(false);
  const cameraRef = useRef();

  const handleBackPress = () => {
    props.navigation.goBack();
    return true;
  };

  const takePicture = async () => {
    if (!takingPhoto) {
      setTakingPhoto(true);
    }
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true, fixOrientation: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setUri(data.uri);
      setTakingPhoto(false);
      await CameraRoll.saveToCameraRoll(data.uri, 'photo');
    }
  };

  return (
    <CameraView
      onCameraRef={cameraRef}
      onCameraButton={takePicture}
      onBackButtonPress={handleBackPress}
    />
  );
};

export default connect()(CameraScreen);
