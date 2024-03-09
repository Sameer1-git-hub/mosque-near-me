import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import GetLocation from 'react-native-get-location'

export default function Userlocation(props) {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                const latitude = location.latitude;
                const longitude = location.longitude;
                setLatitude(latitude);
                setLongitude(longitude);
                console.log(latitude, longitude);
            })
            .catch(error => {
                const { code, message } = error;
                console.error(code, message);
            });
    }, []);

    return (
        <View>
            {latitude && longitude &&
                <Text> {latitude}, {longitude} </Text>
            }
        </View>
    );
}
