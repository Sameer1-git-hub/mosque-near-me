import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import GetLocation from 'react-native-get-location'
import Getlocationbutton from '../ui/form/buttons/Getlocationbutton';

export default function Userlocation(props) {
    const [location, setLocation] = useState({
        latitude: null, 
        longitude: null
    });

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            const latitude = location.latitude;
            const longitude = location.longitude;
            setLocation({latitude, longitude});
        })
        .catch(error => {
            const { code, message } = error;
            console.error(code, message);
        });
    }, []);

    return (
        <View>
            <Text>Userlocation</Text>
            <Text>Latitude: {location.latitude}</Text> 
            <Text>Longitude: {location.longitude}</Text>
            <Getlocationbutton location={location} />
        </View>
    );
}
