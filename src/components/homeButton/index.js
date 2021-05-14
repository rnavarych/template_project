import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function HomeButton({buttonText, icon, action}) {
  return (
    <View>
      <TouchableOpacity style={styles.content} onPress={action}>
        <View style={styles.center}>
          <Image style={styles.icon} source={icon} />
          <Text style={styles.textStyle}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
