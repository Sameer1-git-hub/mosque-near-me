import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

export default function Useraddress() {
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLocation = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Access Required",
                        message: "This app needs to access your location",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    setError('Location permission denied');
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAsKSjAW53hTyvVK3JkzHhnWKFzJjhONX8`
                        );
                        const data = response.data;
                        if (data && data.results && data.results.length > 0) {
                            setAddress(data.results[0].formatted_address);
                        } else {
                            setAddress('Address not found');
                        }
                    } catch (error) {
                        console.error('Error fetching address:', error.message);
                        setError('Error fetching address');
                    }
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                    setError('Error getting location');
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        };

        fetchLocation();
    }, []);

    return (
        <View>
            <Text style={{
                marginTop: 5,
                fontSize: 14,
                color: '#fff', // Changed from 'white' to 'black' for better visibility
                width: 250,
            }}>
                {address || error || 'Fetching address...'}
            </Text>
        </View>
    );
}
