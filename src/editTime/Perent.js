import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Fazar from './namazs/Fazar';
import Zuhar from './namazs/Zuhar';
import Asar from './namazs/Asar';
import Magrib from './namazs/Magrib';
import Isha from './namazs/Isha';
import Juma from './namazs/Juma';

const App = (props) => {
  const [showPrayers, setShowPrayers] = useState(false);
  const [Time, setTime] = useState({});

  // console.log(Time)
  const handleButtonPress = () => {
    setShowPrayers(!showPrayers);
  };

  const handleSelectedTimeChange = (prayerName, time) => {
    setTime((prevTime) => ({
      ...prevTime,
      [prayerName]: time,
    }));
  };
  const headelsubmit  = () => {
    // console.log(Time)

  }

  return (
    <View>
      <TouchableOpacity  onPress={handleButtonPress}>
        <View style={styles.Button} >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}
          >
            Edit Time
          </Text>
        </View>
      </TouchableOpacity>

      {showPrayers && (
        <>
          <Fazar onSelectedTimeChange={(time) => handleSelectedTimeChange('Fazar', time)} />
          <Zuhar onSelectedTimeChange={(time) => handleSelectedTimeChange('Zuhar', time)} />
          <Asar onSelectedTimeChange={(time) => handleSelectedTimeChange('Asar', time)} />
          <Magrib onSelectedTimeChange={(time) => handleSelectedTimeChange('Magrib', time)} />
          <Isha onSelectedTimeChange={(time) => handleSelectedTimeChange('Isha', time)} />
          <Juma onSelectedTimeChange={(time) => handleSelectedTimeChange('Juma', time)} />

          {/* Display the submit button only if there are selected times */}
          
            <TouchableOpacity style={styles.Button} onPress={headelsubmit}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
        </>
      )}
      
    </View>
  );
};
const styles = StyleSheet.create({
    Button:{
        backgroundColor: '#0B7955',
        width: 100,
        height:50,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });
export default App;
