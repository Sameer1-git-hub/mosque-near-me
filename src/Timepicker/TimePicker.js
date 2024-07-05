import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Snackbar from 'react-native-snackbar';

const TimePicker = ({ title, time, onTimeChange }) => {
    const [show, setShow] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        if (time && typeof time === 'string' && time.trim() !== "") {
            const trimmedTime = time.trim();
            let [hours, minutes] = trimmedTime.split(':').map(Number);
            if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && time.match(/^\d{1,2}:\d{2}$/)) {
                const date = new Date();
                if (title !== 'Fazar' && hours < 12) {
                    hours += 12;
                }
                date.setHours(hours, minutes, 0, 0);
                setCurrentTime(date);
            } else {
                console.error('Invalid time format:', time);
                Snackbar.show({
                    text: 'Invalid time format',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } else {
            setCurrentTime(new Date());
        }
    }, [time]);

    const onChange = (event, selectedTime) => {
        const newTime = selectedTime || currentTime;
        if (Platform.OS !== 'ios') {
            setShow(false);
        }
        setCurrentTime(newTime);
        onTimeChange(newTime, title);
    };

    return (
        <View style={styles.container}>
            <View style={{ width: 250 }}>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Text style={styles.buttonText}>{title}</Text>
                    <Text style={styles.timeText}>
                        {currentTime && `${currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/\s?[AP]M/i, '')}`}
                    </Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    value={currentTime}
                    mode="time"
                    display="spinner"
                    onChange={onChange}
                    is24Hour={false}
                />
            )}
        </View>
    );
};

export default TimePicker;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    timeText: {
        color: '#c5dbda',
        padding: 9,
        fontSize: 18,
        fontWeight: '600',
        borderRadius: 8,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: 'white',
        paddingLeft: 15
    },
});
