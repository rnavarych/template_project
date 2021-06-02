import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';

import {connect} from 'react-redux';
import {addToFavourites, deleteFavourites} from '../../../actions/favourites';

import styles from './styles';
import {underlayColor} from '../../../constants/colors';
import * as routes from '../../../constants/routes';

const GalleryScreen = ({
  addToFavourites,
  tabName,
  deleteFavourites,
  favouritesList,
}) => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
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
    const uri =
      tabName === routes.GALLERY_SCREEN
        ? item.url || item.node.image.uri
        : item.url || item.uri;
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
        {tabName === routes.GALLERY_SCREEN
          ? renderIcon(item, uri)
          : renderFavouriteIcon(uri)}
      </View>
    );
  };

  const renderIcon = item => {
    const selectedElements = item.id
      ? {uri: item.url, id: item.id}
      : {uri: item.node.image.uri, id: Date.now()};
    const icons = selectedPhotos.map(item => item.uri);

    const uri = item.url || item.node.image.uri;

    return (
      <TouchableHighlight
        onPress={() => selectImage(selectedElements)}
        underlayColor={underlayColor}
        style={styles.touchableStyle}>
        {icons.includes(uri) ? (
          <Ionicons name="heart" size={25} color="red" style={styles.icon} />
        ) : (
          <Ionicons
            name="heart-outline"
            size={25}
            color="black"
            style={styles.icon}
          />
        )}
      </TouchableHighlight>
    );
  };

  const selectImage = async url => {
    const icons = selectedPhotos.map(item => item.uri);
    const element = icons.find(item => item === url.uri);
    if (!element) {
      setSelectedPhotos([...selectedPhotos, url]);
    } else {
      setSelectedPhotos([selectedPhotos.filter(item => item.uri !== url.uri)]);
    }
    addToFavourites([...selectedPhotos, url]);
  };

  const renderFavouriteIcon = uri => {
    return (
      <TouchableHighlight
        onPress={() => deleteFavourites(uri)}
        underlayColor={underlayColor}
        style={styles.touchableStyle}>
        <Ionicons name="heart" size={25} color="red" style={styles.icon} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.flatContainer}>
      <View style={styles.wrapperList}>
        <FlatList
          data={tabName === routes.GALLERY_SCREEN ? photos : favouritesList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={index => index.toString()}
          ListHeaderComponent={() => <View style={styles.listHeader} />}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  favouritesList: state.favourites.favouritesList,
});
const mapDispatchToProps = dispatch => ({
  addToFavourites: photo => dispatch(addToFavourites(photo)),
  deleteFavourites: key => dispatch(deleteFavourites(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryScreen);
