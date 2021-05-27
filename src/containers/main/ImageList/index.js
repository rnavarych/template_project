import React, {useEffect, useState} from 'react';
import {Text, FlatList, Alert} from 'react-native';
import storage from '@react-native-firebase/storage';

import {strings} from '../../../l18n'
import Progress from '../../../components/Progress';
import ImageItem from '../../../components/ImageItem';

import styles from './styles';


const ImageList = () => {
  const [urls, setUrls] = useState([]);
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    getImgUrl();
  }, []);

  const getImgUrl = async () => {
    try {
      let images = storage().ref('/images');
      images = (await images.list()).items;
      images = await Promise.all(images.map(el => el.getDownloadURL()));
      setSpinner(false)
      setUrls(images);
    } catch (error) {
      Alert.alert(strings('alert.titleErr'), error.message,[{onPress:()=>{}}])
      setSpinner(false)
    }
  };

  if (spinner) return <Progress/>

  return (
    <FlatList
      data={urls}
      renderItem={props => <ImageItem {...props} />}
      style={styles.container}
      keyExtractor={(item, index) => index.toString()}>
      <Text>Hello from text12</Text>
    </FlatList>
  );
};

export default ImageList;
