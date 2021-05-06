import React, {useEffect} from 'react';
import {View} from 'react-native';
import HomeButton from '../../../components/homeButton';
import {connect} from 'react-redux';
import * as routes from '../../../constants/routes';
import images from '../../../configs/images';

import {changeTab} from '../../../analytics/';
import styles from './styles';

function HomeScreen(props) {
  useEffect(() => {
    changeTab(HomeScreen.name, HomeScreen.name);
  }, []);

  return (
    <View style={styles.contentContainer}>
      <HomeButton
        icon={images.camera}
        action={() => props.navigation.navigate(routes.CAMERA_SCREEN)}
        buttonText={'Camera'}
      />
      <HomeButton
        icon={images.gallery}
        action={() => props.navigation.navigate(routes.GALLERY_SCREEN)}
        buttonText={'Gallery'}
      />
    </View>
  );
}

export default connect()(HomeScreen);
