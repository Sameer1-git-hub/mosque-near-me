import { View, TextInput } from 'react-native'
import React from 'react'

export default function Address(props) {
    const { heandelchange } = props;
    return (
        <View>
            <TextInput
                onChangeText={heandelchange}
                placeholder='Address'
                style={{ borderWidth: 2, borderColor: '#0B7955', color: '#0B7955', fontSize: 18, marginBottom: 10 }}
            />
        </View>
    )
}