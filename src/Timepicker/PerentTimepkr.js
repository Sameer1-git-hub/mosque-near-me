import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import EditIcon from 'react-native-vector-icons/AntDesign';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TimePicker from './TimePicker';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

export default function ParentTimePicker({ masjid, onMasjidUpdate, handleShowPhonePopup }) {
    const token = useSelector(state => state.token);
    const [showPrayers, setShowPrayers] = useState(false);
    const [updatedMasjid, setUpdatedMasjid] = useState(masjid);
  const [loading, setLoading] = useState(false);


    const toggleShowPrayers = () => setShowPrayers(!showPrayers);

    const prayerTimes = {
        fajr: updatedMasjid.fajr,
        zohar: updatedMasjid.zohar,
        asar: updatedMasjid.asar,
        maghrib: updatedMasjid.maghrib,
        isha: updatedMasjid.isha,
        juma: updatedMasjid.juma,
        masjidId: updatedMasjid.id,
        name: updatedMasjid.name,
    };

    const handleSubmit = () => {
        setLoading(true);
        axios.post('https://admin.meandmyteam.org/api/masjid-edit', prayerTimes, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setShowPrayers(false);
            onMasjidUpdate(updatedMasjid);
        })
        .catch(error => {
            console.error('Error updating prayer times:', error);
            Snackbar.show({
                text: 'Failed to update prayer times. Please try again later.',
                duration: Snackbar.LENGTH_SHORT,
            });
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleChange = (time, title) => {
        const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/\s?[AP]M/i, '');
        setUpdatedMasjid(prevState => ({ ...prevState, [title]: timeString }));
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleShowPrayers}>
                <EditIcon name="edit" size={25} color="#fff" />
            </TouchableOpacity>
            <Modal visible={showPrayers} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={toggleShowPrayers} style={styles.closeButton}>
                        <CloseIcon name="close" size={35} color="#fff" />
                    </TouchableOpacity>
                    <TimePicker masjid={masjid} onTimeChange={time => handleChange(time, "fajr")} time={updatedMasjid.fajr} title="Fajr" />
                    <TimePicker masjid={masjid} onTimeChange={time => handleChange(time, "zohar")} time={updatedMasjid.zohar || ""} title="Zohar" />
                    <TimePicker masjid={masjid} onTimeChange={time => handleChange(time, "asar")} time={updatedMasjid.asar || ""} title="Asar" />
                    <TimePicker masjid={masjid} onTimeChange={time => handleChange(time, "maghrib")} time={updatedMasjid.maghrib || ""} title="Maghrib" />
                    <TimePicker masjid={masjid} onTimeChange={time => handleChange(time, "isha")} time={updatedMasjid.isha || ""} title="Isha" />
                    <TimePicker masjid={masjid} onTimeChange={time => handleChange(time, "juma")} time={updatedMasjid.juma || ""} title="Juma" />
                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.submitButtonText}>Submit</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#123032',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 30,
    },
    submitButton: {
        marginTop: 30,
        backgroundColor: '#5F8575',
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: 250,
        justifyContent: 'center',
    },
    submitButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
    },
});
