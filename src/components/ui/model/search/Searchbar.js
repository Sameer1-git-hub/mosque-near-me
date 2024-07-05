import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GooglePlacesInput = ({setUserlocation}) => {

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        color={'red'}
        onPress={(data, details = null) => {
          const latitude = details.geometry.location.lat;
          const longitude = details.geometry.location.lng;
          setUserlocation({ latitude, longitude });
        }}
        query={{
          key: 'AIzaSyAsKSjAW53hTyvVK3JkzHhnWKFzJjhONX8',
          language: 'en',
          components: 'country:in',
        }}
        fetchDetails={true}
        styles={styles}
      />
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInputContainer: {
    width: '96%',
    borderBottomColor: '#509494',
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 3,
  },
  description: {
    fontWeight: 'bold',
    color: '#000',
  },
  predefinedPlacesDescription: {
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: 50,
    verticalAlign: 'middle',
  },
});

export default GooglePlacesInput;
