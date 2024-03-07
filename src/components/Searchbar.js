import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GooglePlacesInput = () => {
  const [searchText, setSearchText] = useState('');

  //  console.log(searchText)
  const searchData = (text) => {
  };
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        onPress={(data, details = null) => {
          props.setQuery([details.geometry.location.lat, details.geometry.location.lng])
        }}
        query={{
          key: 'AIzaSyAsKSjAW53hTyvVK3JkzHhnWKFzJjhONX8',
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: 'red',
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
      <Icon style={styles.icon} onPress={() => setSearchText('')} name={'circle-with-cross'} size={30} color={'#0B7955'} />
    </>
  );
};


const styles = StyleSheet.create({
  search: {
    width: '85%',
    height: 40,
    paddingHorizontal: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  icon: {
    position: 'absolute',
    right: 50,
    top: 2
  }

})

export default GooglePlacesInput;
