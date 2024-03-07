import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/FontAwesome6';


export default function Getlocationbutton(props) {
  const [locationFetched, setLocationFetched] = useState(false);

  const headeluserlocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const latitude = location.latitude;
        const longitude = location.longitude;
        props.setUserlocation({ latitude, longitude });
        setLocationFetched(true); // Mark location as fetched
      })
      .catch(error => {
        const { code, message } = error;
        console.error(code, message);
      });
  };

  useEffect(() => {
    // Call headeluserlocation when the component mounts, but only if location hasn't been fetched yet
    if (!locationFetched) {
      headeluserlocation();
    }
  }, [locationFetched]);

  return (
    <TouchableOpacity onPress={headeluserlocation}>
      <Icon name="location-crosshairs" size={30} color={'#0B7955'} />
    </TouchableOpacity>
  )
}
