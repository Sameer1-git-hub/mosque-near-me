import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Timebox from '../masjid_time_block/Timebox';
import Location from '../../model/location_box/Location';
import Direction from '../../model/mapdirection/Direction';
import Favbutton from '../../model/FavButton/Favbutton';
import { useSelector } from 'react-redux';
import ParentTimepkr from '../../../../Timepicker/PerentTimepkr';
import Popups from '../../../../logincomponent/popups/Popupheandel';
import FavPopup from '../../../../logincomponent/popups/FavoritePopup';
import AddNumber from '../../../../logincomponent/popups/AddNumber';
import Edit from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

export default function Masjidcard({ masjid, onMasjidUpdate }) {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [showAddNumber, setShowAddNumber] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    const onMasjidUpdateHandler = (masjid) => {
        onMasjidUpdate(masjid);
    };

    const handleCloseAddNumber = () => {
        setShowAddNumber(false);
    };

    return (
        <SafeAreaView style={styles.safeArea} >
            <LinearGradient colors={['#197173', '#0F3E3F']} style={styles.linearcolor}>
                <View style={styles.cardContent}>
                    <View style={{
                        flexDirection: 'row',
                        width: width * 0.9,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 7,
                    }}>
                        <Text style={styles.title}>{masjid.name}</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <Direction masjid={masjid} />
                            <Text style={styles.subtitle}> {masjid.distance_to_masjid}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mainicons}>
                        {isLoggedIn ? (
                            user.phone_number ? (
                                <ParentTimepkr masjid={masjid} onMasjidUpdate={onMasjidUpdateHandler} />
                            ) : (
                                <TouchableOpacity onPress={() => setShowAddNumber(true)}>
                                    <Edit name="edit" size={25} color={'#FFFFFF'} />
                                </TouchableOpacity>
                            )
                        ) : (
                            <Popups />
                        )}
                        <Location masjid={masjid} />
                        <View style={{ alignItems: 'center' }}>
                            {isLoggedIn ? (
                                <Favbutton masjidId={masjid.id} />
                            ) : (
                                <FavPopup />
                            )}
                        </View>
                    </View>
                </View>
                <Timebox masjid={masjid} />
            </LinearGradient>
            {showAddNumber && <AddNumber visible={showAddNumber} onClose={handleCloseAddNumber} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        marginBottom: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    linearcolor: {
        height: 'auto',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 4,
        paddingBottom: 15
    },
    mainicons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10
    },
    cardContent: {
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'LibreBaskerville-Bold',
        textAlign: 'left',
        width: width * 0.6,
    },
    subtitle: {
        color: '#fff',
        fontSize: 11,
        textAlign: 'center',
    },
    editText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
