import React from 'react'
import { Switch, Text, View } from 'react-native'

import styles from './styles'

export function SwitchLabel(props){
    const {isEnabled, handleChange, text} = props

    return (
        <View style={styles.container}>
            <Text>{text}</Text>
            <Switch
                 trackColor={{ false: "#767577", true: "#81b0ff" }}
                 thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                 ios_backgroundColor="#3e3e3e"
                 onValueChange={handleChange}
                 value={isEnabled}/>
        </View>
    )
}