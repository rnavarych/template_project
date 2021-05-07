import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Button from '../../components/button';
import {strings} from '../../l18n';
import styles from './styles';

const PhotoPicker = () => {
  const [imageSource, setImageSource] = useState(null);

  const sheetRef = useRef(null);

  const fall = new Animated.Value(1);

  const takePhotoFromCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      const source = {uri: response.uri};
      setImageSource(source.uri);
    });
  };

  const choosePhotoFromLibrary = () => {
    let options = {
      path: 'images',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert(strings('alert.select_img'));
      } else {
        const source = {uri: response.uri};
        console.log({source});
        setImageSource(source.uri);
      }
    });
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.renderInner}>
        <Text style={styles.panelTitle}>{strings('buttons.upload_photo')}</Text>
        <Text style={styles.panelSubtitle}>
          {strings('buttons.choose_pic')}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>
          {strings('buttons.take_photo')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>
          {strings('buttons.choose_from_lib')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>{strings('buttons.cancel')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandler} />
      </View>
    </View>
  );

  return (
    <View style={styles.content}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={[
          styles.animated,
          {opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))},
        ]}
      />

      <Button
        text={strings('buttons.pick_img')}
        containerStyle={styles.buttonContent}
        textStyle={styles.buttonTitle}
        onPress={() => sheetRef.current.snapTo(0)}
      />
    </View>
  );
};

export default PhotoPicker;
