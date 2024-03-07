import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, } from 'react-native';
import Jumaa from 'react-native-vector-icons/FontAwesome5';
import Send from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import TimePicker from '../Timepickercomponent/Timepicker';
import Edit from 'react-native-vector-icons/AntDesign';


const Model = ({ masjid }) => {
    const [updatedMajid, setUpdatedMajid] = useState(masjid);
    const [showPrayers, setShowPrayers] = useState(false);
    // const [Time, setTime] = useState({});

    const handleButtonPress = () => {
        setShowPrayers(!showPrayers);
    };

    // const handleSelectedTimeChange = (prayerName) => {
    //     const formattedTime = moment(time).local().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    //     setTime((prevTime) => ({
    //         ...prevTime,
    //         [prayerName]: formattedTime,
    //     }));
    // };

    const handleSubmit = () => {
        // console.log(Time);
        setShowPrayers(false); // Close the popup after submitting
    };

    const updateMasjid = (selectedTime, namazName) => {
        setUpdatedMajid(prevMajid => ({
            ...prevMajid,
            [namazName]: selectedTime // Using bracket notation to dynamically set the property
        }));
    }

    return (
        <View>
            <TouchableOpacity onPress={handleButtonPress}>
                <Edit name={'edit'} size={30} color={'#fff'} />
            </TouchableOpacity>

            <Modal visible={showPrayers} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TimePicker label="Fazar" onSelectedTimeChange={(selectedTime) => updateMasjid(selectedTime, "fajr")} masjid={updatedMajid} namazName={"fajr"}/>
                        <TimePicker label="Zuhar" onSelectedTimeChange={(selectedTime) => updateMasjid(selectedTime, 'Zuhar')} masjid={updatedMajid} namazName={"zohar"} />
                        <TimePicker label="Asar" onSelectedTimeChange={(selectedTime) => updateMasjid(selectedTime, 'Asar')} masjid={updatedMajid} namazName={"asar"} />
                        <TimePicker label="Magrib" onSelectedTimeChange={(selectedTime) => updateMasjid(selectedTime, 'Magrib')} masjid={updatedMajid} namazName={"maghrib"} />
                        <TimePicker label="Isha" onSelectedTimeChange={(selectedTime) => updateMasjid(selectedTime, 'Isha')} masjid={updatedMajid} namazName={"isha"} />
                        <TimePicker label="Juma" onSelectedTimeChange={(selectedTime) => updateMasjid(selectedTime, 'Juma')} masjid={updatedMajid} namazName={"juma"} />
                        <View style={{ marginTop: 10, marginLeft: 10, }}>
                            <Send onPress={handleSubmit} padding={5} name={'send'} size={30} color={'#0B7955'} />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 10, }}>
                            <Send onPress={() => setShowPrayers(false)} padding={5} name={'close'} size={30} color={'#0B7955'} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0B7955',
        width: 150,
        height: 50,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ADEFD1FF',
    },
});

export default Model;
