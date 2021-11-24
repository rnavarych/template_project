import React from 'react';
import {Modal, Text, View, ScrollView} from 'react-native';
import { strings } from '../../l18n';
import Button from '../button';
import {styles} from './styles';

const ModalComponent = (props) => {
  const {modalVisible, setModalVisible, message} = props;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <ScrollView contentContainerStyle={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <Button
              style = {styles.button}
              onPress={() => setModalVisible(false)}
              textStyle={styles.textStyle}
              text={strings("buttons.hide")}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;
