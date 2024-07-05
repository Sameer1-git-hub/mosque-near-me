import React, { useEffect, useState, useCallback, useRef } from 'react';
import { TouchableOpacity, Button, View } from 'react-native';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Snackbar from 'react-native-snackbar';

export default function Getlocationbutton({ setUserlocation, loading }) {

  const [locationFetched, setLocationFetched] = useState(false);

  const locationRequestInProgress = useRef(false);

  const handleUserLocation = useCallback(() => {
    if (locationRequestInProgress.current) return;
    locationRequestInProgress.current = true;
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        const latitude = location.latitude;
        const longitude = location.longitude;
        setUserlocation({ latitude, longitude });
        setLocationFetched(true);
      })
      .catch(error => {
        const { code, message } = error;
        if (code === 'CANCELLED') {
          console.log('Location request was cancelled:', message);
        } else if (code === 'UNAVAILABLE' || code === 'TIMEOUT') {
          Snackbar.show({
            text: 'Location Unavailable - Please turn on location services.',
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          console.error(code, message);
          Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .finally(() => {
        locationRequestInProgress.current = false;
      });
  }, [setUserlocation]);

  const requestLocationPermission = useCallback(async () => {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Snackbar.show({
          text: 'Location services are not available on this device.',
          duration: Snackbar.LENGTH_SHORT,
        });
        break;
      case RESULTS.DENIED:
        const permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permission === RESULTS.GRANTED) {
          handleUserLocation();
        } else {
          Snackbar.show({
            text: 'Location permission denied.',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
        break;
      case RESULTS.GRANTED:
        handleUserLocation();
        break;
      case RESULTS.BLOCKED:
        Snackbar.show({
          text: 'Location permission is blocked. Please enable it in the settings.',
          duration: Snackbar.LENGTH_SHORT,
        });
        break;
    }
  }, [handleUserLocation]);

  useEffect(() => {
    if (!locationFetched) {
      requestLocationPermission();
    }
  }, [locationFetched, requestLocationPermission]);

  return (
    <>
      <TouchableOpacity
        style={{
          marginRight: 7,
          position: 'relative',
          height: 40,
          width: 40,
          backgroundColor: 'white',
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 3, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 3.84,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50
        }}
        onPress={handleUserLocation}
        disabled={loading}
      >
        <Icon name="location-crosshairs" size={30} color={'#509494'} />
      </TouchableOpacity>

    </>
  );
}
