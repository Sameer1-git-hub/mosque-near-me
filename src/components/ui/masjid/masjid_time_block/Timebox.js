import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Fajr from 'react-native-vector-icons/Feather';
import Zuhr from 'react-native-vector-icons/Feather';
import Asar from 'react-native-vector-icons/Feather';
import Magrib from 'react-native-vector-icons/Ionicons';
import Isha from 'react-native-vector-icons/FontAwesome5';
import Juma from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

export default function Timebox({ masjid }) {
    return (
        <>
            <View style={{ 
                flexDirection: 'row',
                height: height * 0.14,
                }}>
                <View style={styles.box}>
                    <Text style={styles.boxText}>
                        {masjid.fajr ? masjid.fajr : 'N/A'}
                    </Text>
                    <Fajr padding={5} name={'sunrise'} size={30} color={'#ffb150'} />
                    <Text style={styles.boxText}>Fajr</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.zohar ? masjid.zohar : 'N/A'}</Text>
                    <Zuhr padding={5} name={'sun'} size={30} color={'#D14009'} />
                    <Text style={styles.boxText}>Zuh’r</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.asar ? masjid.asar : 'N/A'}</Text>
                    <Asar padding={5} name={'sunset'} size={30} color={'#ffb150'} />
                    <Text style={styles.boxText}>Asar</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.maghrib ? masjid.maghrib : 'N/A'}</Text>
                    <Magrib padding={5} name={'moon-sharp'} size={30} color={'#558CA7'} />
                    <Text style={styles.boxText}>Magrib</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.isha ? masjid.isha : 'N/A'}</Text>
                    <Isha padding={5} name={'cloud-moon'} size={28} color={'#101B39'} />
                    <Text style={styles.boxText}>Isha’a</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.juma ? masjid.juma : 'N/A'}</Text>
                    <Juma padding={5} name={'pray'} size={28} color={'#00ff00'} />
                    <Text style={styles.boxText}>Juma</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        width: width * 0.145,
        height: height * 0.14,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3.5
    },
    boxText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 15,
        justifyContent: 'center'
    },
})
