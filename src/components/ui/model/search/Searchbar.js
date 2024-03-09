import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GooglePlacesInput = (props) => {

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        onPress={(data, details = null) => {
          const latitude = details.geometry.location.lat;
          const longitude = details.geometry.location.lng;
          props.setUserlocation({latitude,longitude});
        }}
        query={{
          key: 'AIzaSyAsKSjAW53hTyvVK3JkzHhnWKFzJjhONX8',
          language: 'en',
          components: 'country:in',
        }}
        fetchDetails={true}
        styles={{
          container: {
            flex: 1,
            alignItems: 'center'
          },
          textInputContainer: {
            width: '90%',
            borderBottomWidth: 2,
            borderBottomColor: 'gray',
            
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
            
          },
        }}
      />
    </>
  );
};


const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 50,
    verticalAlign: 'middle',
  }

})

export default GooglePlacesInput;
