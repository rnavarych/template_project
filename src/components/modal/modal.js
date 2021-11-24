import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View, ScrollView} from 'react-native';
import { strings } from '../../l18n';
import Button from '../button';
import {styles} from './styles';

type CProps = {
  setModalVisible: (value: boolean) => void;
  modalVisible: boolean;
  message: string;
};

const ModalComponent = (props: CProps) => {
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
