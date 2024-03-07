import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function Masjidname(props) {
    const { heandelchange } = props;
    return (
        <View>
            <TextInput 
                onChangeText={heandelchange}
                placeholder='Masjid Name'
                style={{ borderWidth: 2, borderColor: '#0B7955', color: '#0B7955', fontSize: 18, marginBottom:10}}
            />
        </View>
    )
}