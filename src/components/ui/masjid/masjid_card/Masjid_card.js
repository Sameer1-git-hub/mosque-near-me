import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Model from '../../model/edit_masjid_timing/Index';
import Timebox from '../masjid_time_block/Timebox';
import Location from '../../model/location_box/Location';
import Direction from '../../model/mapdirection/Direction';
import Favbutton from '../../form/buttons/Favbutton';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Edit from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';



export default function Masjidcard({ masjid }) {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const userData = useSelector(state => state.user);
    const token = userData.token

    useEffect(() => {
        setIsLoggedIn(!!token); // Changed to !!token to convert it to boolean
    }, [token]);

    const handleLoginShow = () => {
        navigation.navigate('Login');
    }

    
    return (
        <View>
            <View style={[styles.card, styles.shadowProp]}>
                <LinearGradient colors={['#197173', '#0F3E3F']} style={styles.linearcolor}>
                    <View style={styles.cardContent}>
                        <View style={styles.mainicons}>
                            {isLoggedIn ? (
                                    <Model  masjid={masjid} />
                                ) : (
                                    <Edit onPress={handleLoginShow} name="edit" size={30} color={'#FFFFFF'} /> 
                                )}
                            <Location  masjid={masjid} />
                            <View>
                            {isLoggedIn ? (
                                    <Favbutton key={masjid} masjidId={masjid} />
                                ) : (
                                    <Icon onPress={handleLoginShow} name="heart-o" size={30} color={'#FFFFFF'} /> 
                                )}
                                <Direction masjid={masjid} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', overflow: 'scroll' }}>
                            <Text style={styles.title}>{masjid.name}</Text>
                            <Text style={styles.title}>
                                Distance - {masjid.distance_to_masjid}
                            </Text>
                        </View>
                    </View>
                    <Timebox key={masjid.id}  masjid={masjid} />
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    linearcolor: {
        width: '100%',
        height: '95%',
        borderRadius: 20,
        alignItems: 'center',
        paddingTop: 10,
    },
    mainicons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    card: {
        width: '100%',
        backgroundColor: '#132B2B',
        overflow: 'hidden',
        marginVertical: 10,
        height: 350,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        textAlign: 'center',
        elevation: 3,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardContent: {
        padding: 15,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'LibreBaskerville-Bold',
        textAlign: 'center',
        paddingVertical: 10,
        width: 350,
        overflow: 'scroll',
    },
});
