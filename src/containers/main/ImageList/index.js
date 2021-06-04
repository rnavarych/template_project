import React, {useEffect, useRef, useState} from 'react';
import {View, Alert, Animated, SafeAreaView} from 'react-native';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import Share from 'react-native-share';

import {strings} from '../../../l18n';
import Progress from '../../../components/Progress';
import ImageItem from '../../../components/ImageItem';

import {BLOCK_HEIGHT, SPACCING} from '../../../constants/animation';
import styles from './styles';

const BLOCK_SIZE = BLOCK_HEIGHT + SPACCING;
const SCALE_VALUE = 0.8;

const ImageList = () => {
  const [urls, setUrls] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

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

  const getInputRange = index => [
    -1,
    0,
    BLOCK_SIZE * index,
    BLOCK_SIZE * (index + 0.5),
    BLOCK_SIZE * (index + 1),
  ];

  const getScale = index => {
    return scrollY.interpolate({
      inputRange: getInputRange(index),
      outputRange: [1, 1, 1, SCALE_VALUE, SCALE_VALUE],
    });
  };

  const getTranslate = index => {
    const diff = BLOCK_SIZE - BLOCK_SIZE * SCALE_VALUE;

    return scrollY.interpolate({
      inputRange: getInputRange(index),
      outputRange: [0, 0, 0, (BLOCK_SIZE + diff/2) / 2, BLOCK_SIZE + diff],
    });
  };

  if (spinner) return <Progress />;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={urls}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        renderItem={({item, index}) => {
          const animStyle = {
            transform: [
              {scale: getScale(index)},
              {translateY: getTranslate(index)},
            ],
            zIndex: index,
          };

          return (
            <Animated.View style={animStyle}>
              <ImageItem onClick={handleClick} item={item} />
            </Animated.View>
          );
        }}
        style={styles.container}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default ImageList;
