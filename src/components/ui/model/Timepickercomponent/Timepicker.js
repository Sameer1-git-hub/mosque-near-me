import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TimePicker({ label, onSelectedTimeChange, masjid, namazName }) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  // console.log(masjid)
  // console.log(onSelectedTimeChange)
  console.log('namzname', namazName)

  useEffect(() => {
    const tempdate = new Date(masjid[namazName]);
    console.log(tempdate)
  }, []);

  // useEffect(() => {
  //   const tempdate = new Date(masjid[namazName]);
  //   console.log(tempdate)
  // }, [masjid[namazName]]);

  const handleTimeChange = (event, time, masjid ) => {
    setShowTimePicker(false);
    const selectedDateTime = new Date(masjid);
    console.log('selectedDateTime', selectedDateTime)
    onSelectedTimeChange(selectedDateTime.toLocaleTimeString([]));
  };

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
      <TouchableOpacity
        style={{
          padding: 5,
          flexDirection: 'row',
          marginRight: 20,
          width: 100,
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
          {label}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={masjid && namazName && masjid[namazName] ? new Date(masjid[namazName]) : new Date()}
          mode="time"
          onError={console.log}
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <View
        style={{
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0B7955',
        }}
      >
        <Text style={{ fontSize: 20, width:70, color: '#fff', fontWeight: 'bold', marginHorizontal: 15, textAlign:'center' }}>
          {masjid[namazName]}
          {/* {selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : time} */}
        </Text>
      </View>
    </View>
  );
}
