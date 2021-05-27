import React from 'react'
import {View, Text, Image} from 'react-native'

import styles from './styles'

const ImageItem = ({item}) =>{
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: item}} />
        </View>
    )
}

export default ImageItem