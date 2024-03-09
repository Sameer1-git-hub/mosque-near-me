import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log(date)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <Button onPress={showTimepicker} title="Show Time Picker" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>{date.toLocaleString()}</Text>

    </View>
  );
};

export default MyDateTimePicker;
