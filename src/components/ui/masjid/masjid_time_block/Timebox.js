import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Juma from 'react-native-vector-icons/FontAwesome5';
import Magrib from 'react-native-vector-icons/Ionicons';
import Fajr from 'react-native-vector-icons/Feather';
import Zuhr from 'react-native-vector-icons/Feather';
import Asar from 'react-native-vector-icons/Feather';


export default function Timebox({masjid}) {
    return (
        <>
            <View style={{ flexDirection: 'row', height: '34%' }}>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.fajr}</Text>
                    <Fajr padding={5} name={'sunrise'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Fajr</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.zohar}</Text>
                    <Zuhr padding={5} name={'sun'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Zuh’r</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.asar}</Text>
                    <Asar padding={5} name={'sunset'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Asar</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.maghrib}</Text>
                    <Magrib padding={5} name={'moon-sharp'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Magrib</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.isha}</Text>
                    <Magrib padding={5} name={'moon-sharp'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Isha’a</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.juma}</Text>
                    <Juma padding={5} name={'pray'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Juma</Text>
                </View>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    box: {
        width: '15.40%',
        height: '100%',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,

    },
    boxText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 17,
        justifyContent: 'center'


    },
})