import React, {useEffect, useState} from 'react';
import {View, FlatList, Alert, Text} from 'react-native';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import Share from 'react-native-share';

import {strings} from '../../../l18n';
import Progress from '../../../components/Progress';
import ImageItem from '../../../components/ImageItem';

import styles from './styles';

const ImageList = () => {
  const [urls, setUrls] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getImgUrl();
  }, []);

  const showErr = msg => {
    Alert.alert(strings('alert.titleErr'), msg, [{onPress: () => {}}]);
  };

  const showSuccess = msg => {
    Alert.alert(strings('alert.titleSuccess'), msg, [{onPress: () => {}}]);
  };

  const getImgUrl = async () => {
    try {
      let images = storage().ref('/images');
      images = (await images.list()).items;
      images = await Promise.all(images.map(el => el.getDownloadURL()));
      setSpinner(false);
      setUrls(images);
    } catch (error) {
      showErr(error.message);
      setSpinner(false);
    }
  };

  const writeFile = async imgUrl => {
    try {
      let metaData = await storage().refFromURL(imgUrl).getMetadata();
      const downloadTo = `${utils.FilePath.DOCUMENT_DIRECTORY}/${metaData.name}`;
      await storage().refFromURL(imgUrl).writeToFile(downloadTo);
      showSuccess(strings('alert.file_saved') + downloadTo);
    } catch (error) {
      showErr(error.message);
    }
  };

  const handleShare = async imgUrl => {
    try {
      await Share.open({
        title: strings('alert.titlePictureDialog'),
        message: strings('alert.msg_share'),
        url: imgUrl,
        failOnCancel: false,
      });
    } catch (error) {
      showErr(error.message);
    }
  };

  const handleClick = img => {
    Alert.alert(
      strings('alert.titlePictureDialog'),
      strings('alert.msgPicture'),
      [
        {text: strings('buttons.share_photo'), onPress: () => handleShare(img)},
        {text: strings('buttons.save'), onPress: () => writeFile(img)},
        {text: strings('buttons.cancel'), onPress: () => {}},
      ],
    );
  };

  if (spinner) return <Progress />;

  return (
    <View style={styles.container}>
      <FlatList
        data={urls}
        renderItem={props => <ImageItem onClick={handleClick} {...props} />}
        style={styles.container}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ImageList;
