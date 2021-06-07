import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableHighlight,
  Alert,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import ImageBox from '../../../components/imageBox';
import VideoBox from '../../../components/VideoBox';
import {addToFavourites, deleteFavourites} from '../../../actions/favourites';

import styles from './styles';
import {requestReadStoragePermission} from '../../../services/permissions';
import {strings} from '../../../l18n';
import {underlayColor} from '../../../constants/colors';
import {iconSize} from '../../../constants/sizes';
import * as routes from '../../../constants/routes';

const GalleryScreen = ({
  addToFavourites,
  tabName,
  deleteFavourites,
  favouritesList,
}) => {
  const [photos, setPhotos] = useState([]);
  const [width, setWidth] = useState([]);
  const [selectedPhoto, setPhoto] = useState({uri: '', isVideo: null});
  const [showModal, setModal] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    getPhotoFromDevice();
    setWidth(Dimensions.get('window').width);
  }, []);

  useEffect(() => {
    if (selectedPhoto.uri) {
      setModal(true);
    }
  }, [selectedPhoto]);

  const showErr = e => {
    Alert.alert(strings('alert.titleErr'), e.message, [
      {text: strings('alert.positiveBtn'), onPress: () => {}},
    ]);
  };

  const getPhotoFromDevice = async () => {
    if (Platform.OS === 'android' && !(await requestReadStoragePermission()))
      return;

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

    const isVideo = item.node ? /video/.test(item.node.type) : item.isVideo;
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            setPhoto({uri, isVideo});
          }}>
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
          ? renderIcon(item, isVideo)
          : renderFavouriteIcon(uri)}
        {isVideo ? renderVideoIcon() : null}
      </View>
    );
  };

  const renderVideoIcon = () => (
    <Ionicons
      name="play-outline"
      size={iconSize}
      color="red"
      style={[styles.icon, styles.video]}
    />
  );

  const renderIcon = (item, isVideo) => {
    const selectedElements = item.id
      ? {uri: item.url, id: item.id}
      : {uri: item.node.image.uri, id: Date.now()};
    const icons = favouritesList.map(item => item.uri);

    const uri = item.url || item.node.image.uri;

    return (
      <TouchableHighlight
        onPress={() => selectImage(selectedElements, isVideo)}
        underlayColor={underlayColor}
        style={styles.touchableStyle}>
        {icons.includes(uri) ? (
          <Ionicons
            name="heart"
            size={iconSize}
            color="red"
            style={styles.icon}
          />
        ) : (
          <Ionicons
            name="heart-outline"
            size={iconSize}
            color="red"
            style={styles.icon}
          />
        )}
      </TouchableHighlight>
    );
  };

  const selectImage = async (url, isVideo) => {
    const icons = favouritesList.map(item => item.uri);
    const element = icons.find(item => item === url.uri);
    if (!element) {
      addToFavourites([...favouritesList, {...url, isVideo}]);
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
        <Ionicons
          name="heart"
          size={iconSize}
          color="red"
          style={styles.icon}
        />
      </TouchableHighlight>
    );
  };

  const renderModalContent = isVideo => {
    return isVideo ? (
      <VideoBox
        uri={selectedPhoto.uri}
        isVisible={isVisible}
        setVisible={setVisible}
        setModal={setModal}
      />
    ) : (
      <ImageBox uri={selectedPhoto.uri} setModal={setModal} />
    );
  };

  return (
    <View style={styles.flatContainer}>
      <Modal
        backdropOpacity={0.95}
        isVisible={showModal}
        onModalShow={() => setVisible(true)}
        onModalHide={() => {
          setPhoto({uri: null, isVideo: null});
          setVisible(false);
        }}
        onBackdropPress={() => setModal(false)}>
        {renderModalContent(selectedPhoto.isVideo)}
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
