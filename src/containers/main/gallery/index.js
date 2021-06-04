import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableHighlight,
  Alert,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import ImageBox from '../../main/imageBox';
import {addToFavourites, deleteFavourites} from '../../../actions/favourites';

import styles from './styles';
import {strings} from '../../../l18n';
import {underlayColor} from '../../../constants/colors';
import * as routes from '../../../constants/routes';

const GalleryScreen = ({
  addToFavourites,
  tabName,
  deleteFavourites,
  favouritesList,
}) => {
  const [photos, setPhotos] = useState([]);
  const [width, setWidth] = useState([]);
  const [selectedPhoto, setPhoto] = useState('');
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    getPhotoFromDevice();
    setWidth(Dimensions.get('window').width);
  }, []);

  useEffect(() => {
    if (selectedPhoto) {
      setModal(true);
    }
  }, [selectedPhoto]);

  const showErr = e => {
    Alert.alert(strings('alert.titleErr'), e.message, [
      {text: strings('alert.positiveBtn'), onPress: () => {}},
    ]);
  };

  const getPhotoFromDevice = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    })
      .then(response => setPhotos(response.edges))
      .catch(showErr);
  };

  const renderItem = ({item}) => {
    const calculatedWidth = width / 2;
    const uri =
      tabName === routes.GALLERY_SCREEN
        ? item.url || item.node.image.uri
        : item.url || item.uri;
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => setPhoto(uri)}>
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
        </TouchableWithoutFeedback>
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
    const icons = favouritesList.map(item => item.uri);

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
    const icons = favouritesList.map(item => item.uri);
    const element = icons.find(item => item === url.uri);
    if (!element) {
      addToFavourites([...favouritesList, url]);
    } else {
      deleteFavourites(url.uri);
    }
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
      <Modal
        backdropOpacity={0.95}
        isVisible={showModal}
        onModalHide={() => setPhoto('')}
        onBackdropPress={() => setModal(false)}>
        <ImageBox uri={selectedPhoto} setModal={setModal} />
      </Modal>

      <View style={styles.wrapperList}>
        <FlatList
          data={tabName === routes.GALLERY_SCREEN ? photos : favouritesList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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
