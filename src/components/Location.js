import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getCurrentPosition } from 'react-native-geolocation-service';

const Location = () => {
    const [location, setLocation] = useState({});
    
    
    Geolocation.getCurrentPosition( data=>{setLocation(data.coords)});
   
    
    useEffect(() => {
        
    }, [location]);
  return (
    
    <Text>
       latitude  {location.latitude} 
       longitude {location.longitude} 
    </Text>
      
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
  },
});

export default Location;
