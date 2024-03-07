import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Isha(props) {
  const { onSelectedTimeChange } = props;

  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Set the time range from 6:00 AM to 10:00 PM
  const timeLimitStart = new Date();
  timeLimitStart.setHours(19, 30, 0); // 6:00 AM

  const timeLimitEnd = new Date();
  timeLimitEnd.setHours(22, 30, 0); // 10:00 PM

  useEffect(() => {
    const loadSelectedTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('selectedTime');
        if (storedTime) {
          setSelectedTime(new Date(storedTime));
        }
      } catch (error) {
        console.error('Error loading selected time:', error);
      }
    };

    loadSelectedTime();
  }, []);

  const handleTimeChange = (event, time) => {
    setShowTimePicker(Platform.OS === 'ios');
    const selectedDateTime = new Date(time);
  
    // Extract hours and minutes from selectedDateTime
    const selectedHours = selectedDateTime.getHours();
    const selectedMinutes = selectedDateTime.getMinutes();
  
    // Check if the selected time is within the time limit
    if (
      (selectedHours > timeLimitStart.getHours() || 
        (selectedHours === timeLimitStart.getHours() && selectedMinutes >= timeLimitStart.getMinutes())) &&
      (selectedHours < timeLimitEnd.getHours() || 
        (selectedHours === timeLimitEnd.getHours() && selectedMinutes <= timeLimitEnd.getMinutes()))
    ) {
      setSelectedTime(selectedDateTime);
      onSelectedTimeChange(selectedDateTime);
      // Save selected time to AsyncStorage
      try {
        AsyncStorage.setItem('selectedTime', selectedDateTime.toString());
      } catch (error) {
        console.error('Error saving selected time:', error);
      }
    } else {
      // Provide feedback to the user if the time is outside the allowed range
      alert('Please select a time between 6:00 AM and 10:00 PM.');
    }
  };
  

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View style={{ width: 300, alignSelf: 'center', flexDirection: 'row' }}>
      <TouchableOpacity
        style={{
          padding: 5,
          flexDirection: 'row',
        }}
        onPress={openTimePicker}
      >
        <Icon name="edit" size={25} color="#0B7955" />
        <Text
          style={{
            color: '#0B7955',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 7,
          }}
        >
          Isha
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          is24Hour={false} // Use 12-hour format
          display="default"
          onChange={handleTimeChange}
          minimumDate={timeLimitStart}
          maximumDate={timeLimitEnd}
        />
      )}

      {selectedTime && (
        <View
          style={{
            marginLeft: 43,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0B7955',
          }}
        >
          <Text style={{ fontSize: 20, color: '#fff', fontWeight: 500, marginHorizontal: 15 }}>
            {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      )}
    </View>
  );
}
