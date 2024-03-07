import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Direct from 'react-native-vector-icons/FontAwesome5';
import { Linking } from 'react-native';



export default function Direction({masjid}) {

    const openGoogleMap = () => {
        const lat = masjid.latitude;
        const lng = masjid.longitude;
        const label = 'Shivpuri, Madhya Pradesh';

        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving&dir_action=navigate&destination_place_id=${label}`;
    
        Linking.openURL(url);
      };



    return (
            <TouchableOpacity onPress={openGoogleMap}>
                <Direct name={'location-arrow'} size={30} color={'#fff'} />
            </TouchableOpacity>
    )
}