import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

const Address = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    altitude: null,
    accuracy: null,
    timestamp: null,
  });

  useEffect(() => {
    const handleGetLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          const {
            latitude,
            longitude,
            altitude,
            accuracy,
            altitudeAccuracy,
            heading,
            speed,
          } = position.coords;
          const timestamp = position.timestamp;
          setLocation({ latitude, longitude, altitude, accuracy, timestamp });

          // Do something with the coordinates and timestamp
          console.log(latitude, longitude, altitude, accuracy, timestamp);
        },
        (error) => {
          // Error callback
          const { code, message } = error;
          console.error(code, message);

          // Additional error handling based on error code
          switch (code) {
            case 1:
              // PERMISSION_DENIED
              console.error('Permission denied');
              break;
            case 2:
              // POSITION_UNAVAILABLE
              console.error('Position unavailable');
              break;
            case 3:
              // TIMEOUT
              console.error('Timeout');
              break;
            default:
              console.error('An unknown error occurred');
          }
        },
        {
          timeout: 10000, // Specify timeout in milliseconds
          maximumAge: 1000, // Specify maximum age of the position in milliseconds
          enableHighAccuracy: true, // Specify whether to use high accuracy mode
        }
      );
    };

    // Call the function when the component mounts
    handleGetLocation();
  }, []); // Empty dependency array ensures the effect runs only once, equivalent to componentDidMount
  




  return (
    <View>
      <Text>Getlocation</Text>
      {/* Remove the Button */}
      <Text style={{color: 'white'}}>
        Latitude: {location.latitude !== null ? location.latitude.toFixed(6) : 'N/A'}
        {'\n'}
        Longitude: {location.longitude !== null ? location.longitude.toFixed(6) : 'N/A'}
        {'\n'}
        Altitude: {location.altitude !== null ? location.altitude.toFixed(2) : 'N/A'}
        {'\n'}
        Accuracy: {location.accuracy !== null ? location.accuracy.toFixed(2) : 'N/A'}
        {'\n'}
        Timestamp: {location.timestamp !== null ? new Date(location.timestamp).toLocaleString() : 'N/A'}
      </Text>
    </View>
  );
};

export default Address;
