import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './styles';

const GalleryScreen = props => {
  const [photos, setPhotos] = useState([]);
  const [width, setWidth] = useState([]);

  useEffect(() => {
    getPhotoFromDevice();
    setWidth(Dimensions.get('window').width);
  }, []);

  const getPhotoFromDevice = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    }).then(response => setPhotos(response.edges));
  };

  const renderItem = ({item}) => {
    const calculatedWidth = width / 2;
    const uri = item.url || item.node.image.uri;
    return (
      <View>
        <Image
          source={{uri}}
          imageStyle={styles.imageStyle}
          style={[
            styles.image,
            {
              width: calculatedWidth - 30,
              height: calculatedWidth - 80,
              borderRadius: 12,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.flatContainer}>
      <View style={styles.wrapperList}>
        <FlatList
          data={photos}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={index => index.toString()}
          ListHeaderComponent={() => <View style={styles.listHeader} />}
        />
      </View>
    </View>
  );
};

export default connect()(GalleryScreen);
