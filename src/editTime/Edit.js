import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform,  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Edit() {
    const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Load selected time from AsyncStorage on component mount
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
    // Check if the selected time is between 5 and 9
    const hour = time.getHours();
    if (hour >= 12 && hour <= 15) {
      setShowTimePicker(Platform.OS === 'ios');
      setSelectedTime(time);
      onSelectedTimeChange(time);
  
      // Save selected time to AsyncStorage
      try {
        AsyncStorage.setItem('selectedTime', time.toString());
      } catch (error) {
        console.error('Error saving selected time:', error);
      }
    } else {
      alert('Please select a time between 12 and 3.');
    }
  };

  const openTimePicker = () => {
    setShowTimePicker(true);
  };
  return (
    <View style={{width: 100, alignSelf: 'center'}}>
      <TouchableOpacity
        style={{
          padding: 5,
        }}
        onPress={openTimePicker}
      >
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: 'bold'
          }}
        >
        【┘】Edit
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {selectedTime && (
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, color: 'black' }}>
          {selectedTime.getHours()}:{selectedTime.getMinutes()}
          </Text>
        </View>
      )}
    </View>
  )
}