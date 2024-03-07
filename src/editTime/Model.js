import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import Fazar from './namazs/Fazar';
import Zuhar from './namazs/Zuhar';
import Asar from './namazs/Asar';
import Magrib from './namazs/Magrib';
import Isha from './namazs/Isha';
import Juma from './namazs/Juma';
import AwesomeButton from 'react-native-really-awesome-button';


const Model = () => {
  const [showPrayers, setShowPrayers] = useState(false);
  const [Time, setTime] = useState({});

  const handleButtonPress = () => {
    setShowPrayers(!showPrayers);
  };

  const handleSelectedTimeChange = (prayerName, time,) => {
    setTime((prevTime) => ({
      ...prevTime,
      [prayerName]: time,
    }));
  };

  const handleSubmit = () => {
    // console.log(Time);
    setShowPrayers(false); // Close the popup after submitting
  };

  return (
    <View >
    <TouchableOpacity onPress={handleButtonPress}>
      {/* <Image source={require('../assets/imagess/edit.png')} /> */}
      </TouchableOpacity>
      {/* <TouchableOpacity >
        <View style={styles.button}>
          <Text style={styles.buttonText}></Text>
        </View>
      </TouchableOpacity> */}
      {/* <ThemedButton name="bruce"  style={styles.button } onPress={handleButtonPress}>Edit</ThemedButton> */}

      {/* <AwesomeButton
        
        backgroundColor="#0B7955" // Set your desired background color
        backgroundDarker="#0d4c38" // Set a darker shade for the background
        textColor="#fff" // Set text color
        borderColor="#0d4c38" // Set border color
        borderWidth={2} // Set border width
        borderRadius={5} // Set border radius
        height={50} // Set button height
        width={100} // Set button width
      >
        Edit 
      </AwesomeButton> */}

      <Modal visible={showPrayers} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Masjidname heandelchange={(time) => handleSelectedTimeChange('Masjid Name', time)} />
            <Cityname heandelchange={(time) => handleSelectedTimeChange('City Name', time)} />
            <Address heandelchange={(time) => handleSelectedTimeChange('Address', time)} /> */}
            
              <Fazar onSelectedTimeChange={(time) => handleSelectedTimeChange('Fazar', time)} />
              <Zuhar onSelectedTimeChange={(time) => handleSelectedTimeChange('Zuhar', time)} />
            
            
              <Asar onSelectedTimeChange={(time) => handleSelectedTimeChange('Asar', time)} />
              <Magrib onSelectedTimeChange={(time) => handleSelectedTimeChange('Magrib', time)} />
            
            
              <Isha onSelectedTimeChange={(time) => handleSelectedTimeChange('Isha', time)} />
              <Juma onSelectedTimeChange={(time) => handleSelectedTimeChange('Juma', time)} />
           


            {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> */}
            <View style={{marginTop: 10, marginLeft: 10}}>
            <AwesomeButton
              onPress={handleSubmit}
              backgroundColor="#0B7955" // Set your desired background color
              backgroundDarker="#0d4c38" // Set a darker shade for the background
              textColor="#fff" // Set text color
              borderColor="#0d4c38" // Set border color
              borderWidth={2} // Set border width
              borderRadius={5} // Set border radius
              height={50} // Set button height
              width={100} // Set button width
            >
              Submit
            </AwesomeButton>
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
