import React, {useState} from 'react';
import {Platform} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Progress from '../Progress';

import styles from './styles';

const VideoBox = ({uri, setModal, isVisible}) => {
  const [pause, setPause] = useState(false);
  if (!isVisible) return <Progress />;

  let newUri = uri;
  if (Platform.OS === 'ios') {
    newUri = `assets-library://asset/asset.MOV?id=${
      uri.replace('ph://', '').split('/')[0]
    }&ext=MOV`;
  }

  return (
    <VideoPlayer
      source={{uri: newUri}}
      paused={pause}
      resizeMode={'contain'}
      navigator={{
        pop: () => {
          setPause(true);
          setModal(false);
        },
      }}
      style={styles.video}
    />
  );
};

export default VideoBox;
