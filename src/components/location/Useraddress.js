import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

export default function Useraddress() {
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchLocation = () => {
            Geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(latitude, longitude)
                    try {
                        const response = await axios.get(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCl984nf05CsLqo9JMjqmyzBDvKVNTgpeg`
                        );
                        const data = response.data;
                        console.log(response);
                        if (data && data.results && data.results.length > 0) {
                            setAddress(data.results[0].formatted_address);
                        } else {
                            setAddress('Address not found');
                        }
                    } catch (error) {
                        console.error('Error fetching address:', error.message);
                        setAddress('Error fetching address');
                    }
                },
                (error) => {
                    console.error(error.message);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        };

        fetchLocation();

        // Clean up any resources if necessary
        return () => {
            // Clean up logic here, if needed
        };
    }, []);

    return (
        <View>
            <Text style={{
                marginTop: 20,
                fontSize: 17,
                color: 'white',
                width: 220,
            }} >{address}</Text>
        </View>
    );
}
