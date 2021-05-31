import React, {useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';

import ImageList from '../ImageList';
import HomeButton from '../../../components/homeButton';
import {connect} from 'react-redux';
import * as routes from '../../../constants/routes';
import images from '../../../configs/images';
import PhotoPicker from '../../../components/imagePicker';

import {changeTab} from '../../../analytics/';
import styles from './styles';
import {strings} from '../../../l18n';

function HomeScreen(props) {
  useEffect(() => {
    changeTab(HomeScreen.name, HomeScreen.name);
  }, []);

  return (
    <>
      <View style={styles.contentContainer}>
        <HomeButton
          icon={images.camera}
          action={() => props.navigation.navigate(routes.CAMERA_SCREEN)}
          buttonText={strings('buttons.camera')}
        />
        <HomeButton
          icon={images.gallery}
          action={() => props.navigation.navigate(routes.GALLERY_SCREEN)}
          buttonText={strings('headers.gallery')}
        />
      </View>
      <ImageList />
      <View style={styles.pickerStyle}>
        <PhotoPicker />
      </View>
    </>
  );
}

export default connect()(HomeScreen);
