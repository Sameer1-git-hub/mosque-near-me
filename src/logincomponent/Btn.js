import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Btn = ({bgcolor, btnLabel, textcolor , press}) => {
    return (
        <TouchableOpacity onPress={press} style={{backgroundColor: bgcolor, marginVertical:10, width:350,padding:8, borderRadius:100, alignItems: 'center'}}>
            <Text style={{color: textcolor , fontSize: 25, fontWeight: 'bold'}}>
                {btnLabel}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default Btn;
