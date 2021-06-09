import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {Provider, FAB} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/stack';
import VideoPlayer from 'react-native-video';

import ImageBox from '../../../components/imageBox';
import VideoBox from '../../../components/VideoBox';

import {addToFavourites, deleteFavourites} from '../../../actions/favourites';
import Filter from '../../../components/filter';

import styles from './styles';

import {underlayColor} from '../../../constants/colors';
import {iconSize} from '../../../constants/sizes';
import * as routes from '../../../constants/routes';
import {getPhotoFromDevice} from '../../../utils/utils';

const getAssetType = filterOptions => {
  const {photo, video} = filterOptions;
  if (!photo && !video) return 'All';
  if (photo && video) return null;
  return photo ? 'Photos' : 'Videos';
};

const {height: screenHeigth} = Dimensions.get('window');

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
  const headerHeight = useHeaderHeight();
  const [filterOptions, setFilterOptions] = useState({
    photo: false,
    video: false,
  });
  const [userCenter, setCenter] = useState(0);

  useEffect(() => {
    setWidth(Dimensions.get('window').width);
  }, []);

  useEffect(() => getMedia(), [filterOptions]);

  useEffect(() => {
    if (selectedPhoto.uri) setModal(true);
  }, [selectedPhoto]);

  const getMedia = useCallback(async () => {
    setPhotos(await getPhotoFromDevice(getAssetType(filterOptions)));
  }, [setPhotos, filterOptions]);

  const renderImageBlock = useCallback(
    ({item, height, calculatedWidth, uri, isVideo}) => {
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
                  height,
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
    },
    [tabName, setPhoto, favouritesList],
  );

  const renderVideoBlock = useCallback(
    ({height, calculatedWidth, uri}) => {
      let newUri = uri;
      if (Platform.OS === 'ios') {
        newUri = `assets-library://asset/asset.MOV?id=${
          uri.replace('ph://', '').split('/')[0]
        }&ext=MOV`;
      }
      return (
        <VideoPlayer
          source={{uri: newUri}}
          resizeMode={'cover'}
          style={[
            styles.videoPlayer,
            {
              width: calculatedWidth - 30,
              height,
              borderRadius: 12,
            },
          ]}
        />
      );
    },
    [Platform],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      const calculatedWidth = width / 2;
      const height = calculatedWidth - 80;
      const heigthWithSpaccing = height + 24 * 2;
      const isVideo = item.node ? /video/.test(item.node.type) : item.isVideo;
      const uri =
        tabName === routes.GALLERY_SCREEN
          ? item.url || item.node.image.uri
          : item.url || item.uri;

      const isBlockInCenter = () => {
        const newIndex = index % 2 === 0 ? index : index - 1;
        const blockEndPosition = heigthWithSpaccing * (newIndex / 2 + 1);
        return (
          userCenter < blockEndPosition &&
          userCenter > blockEndPosition - heigthWithSpaccing
        );
      };
      const props = {
        item,
        index,
        height,
        calculatedWidth,
        uri,
        isVideo,
      };
      if (isVideo && isBlockInCenter()) return renderVideoBlock(props);
      return renderImageBlock(props);
    },
    [renderImageBlock, renderVideoBlock, width, tabName, userCenter],
  );

  const renderVideoIcon = useCallback(
    () => (
      <Ionicons
        name="play-outline"
        size={iconSize}
        color="red"
        style={[styles.icon, styles.video]}
      />
    ),
    [],
  );

  const renderIcon = useCallback(
    (item, isVideo) => {
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
    },
    [favouritesList, selectImage],
  );

  const selectImage = useCallback(
    async (url, isVideo) => {
      const icons = favouritesList.map(item => item.uri);
      const element = icons.find(item => item === url.uri);
      if (!element) {
        addToFavourites([...favouritesList, {...url, isVideo}]);
      } else {
        deleteFavourites(url.uri);
      }
    },
    [addToFavourites, deleteFavourites, favouritesList],
  );

  const renderFavouriteIcon = useCallback(
    uri => {
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
    },
    [deleteFavourites],
  );

  const renderModalContent = useCallback(
    isVideo => {
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
    },
    [selectedPhoto, isVisible, setVisible, setModal],
  );

  return (
    <Provider>
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
            onScroll={e => {
              setCenter(
                e.nativeEvent.contentOffset.y +
                  (screenHeigth - headerHeight) / 2,
              );
            }}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => <View style={styles.listHeader} />}
          />
        </View>
        <Filter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </View>
    </Provider>
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
