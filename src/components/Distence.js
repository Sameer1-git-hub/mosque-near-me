import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import axios from 'axios';




function Distence(Props) {
  const optionArry = ["100 Miters", "200 Miters", "300 Miters", "400 Miters", "500 Miters", "600 Miters", "700 Miters", "800 Miters", "900 Miters", "1000 Miters", "1500 Miters", "2000 Miters"];

  const [openselect, setOpentselect] = useState(false);
  const [send , setsend] = useState();
  console.log(send)

  // const userdistance ={
  //   Latitude: '25.42547420',
  //   Longitude: '77.66560851',
  //   distance:  send,
  // }

  const leagueInput = useRef();
 

  function selectvalue(item) {
    leagueInput.current.setNativeProps({ text: item });
    setOpentselect(false);
    setsend(item)
  }

  function opneOption() {
    setOpentselect(true);
  }

  function clearInput() {
    leagueInput.current.setNativeProps({ text: '' }); // Clear the input text
  }

  const headndelchange = async () =>{
    try {
      const response = await axios.post(
        'https://admin.meandmyteam.org/api/masjid-nearby',
        userdistance
      );
      
  console.log(response.data );
      
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}`);
    }
  }

    // get a location 
    const [location, setLocation] = useState(null);

    

  // useEffect(() => {
  //   check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
  //     if (result === RESULTS.DENIED) {
  //       request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
  //         if (result === RESULTS.GRANTED) {
  //           // Permission granted, you can now use GetLocation to get the location
  //         }
  //       });
  //     }
  //   });
  // }, []);

  // const press = () => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 60000,
  //   })
  //     .then((location) => {
  //       console.log(location);
  //       setLocation(location);
  //     })
  //     .catch((error) => {
  //       const { code, message } = error;
  //       console.log(code, message);
  //     });
  // };

  
// send requist api
const [masjids, setMasjids] = useState(null);

const userLocation = {
  latitude: '25.42547420',
  longitude: '77.66560851',
};

useEffect(() => {
  const fetchData = async () => {
    try {
      if (userLocation) {
        const searchDistance = 500; // You can change this value as per the user's search preference
        const response = await axios.post(
          'https://admin.meandmyteam.org/api/masjid-nearby',
          userLocation
        );
        setMasjids(response.data.results);
        console.log('masjid neaby', response.data.results);
        // You can set other state variables here if needed
      } else if (masjids === null) {
        const response = await axios.post(
          'http://admin.meandmyteam.org/api/dashboard/masjids'
        );
        setMasjids(response.data.data.masjids.data);
        console.log( "masjid",response.data.data.masjids.data);
        // You can set other state variables here if needed
      }
    } catch (error) {
      console.error('Error fetching masjids:', error);
    }
  };

  fetchData();
}, [userLocation, masjids]);


  return (
    <View style={{margin: 15 , marginTop: 20, }}>
      <TouchableOpacity
        onPress={opneOption}
        onBlur={() => {
          setOpentselect(false);
        }}
        style={styles.inputContainer}
      >
        <TextInput
          ref={leagueInput}
          style={styles.input }
          placeholder="Select Your Distence"
          editable={false}
          onChange={headndelchange}
         
        />
        <Text style={styles.caret}>^</Text>
      </TouchableOpacity>

      {openselect && (
        <View style={styles.optionsContainer}>
          {optionArry.map((item, index) => (
            <TouchableOpacity
              onPress={() => selectvalue(item)}
              key={index}
              style={styles.option}
            >
              <Text style={{color:'#fff'}}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity onPress={clearInput}>
      <Text style={styles.Clear}>Clear</Text>
      </TouchableOpacity>
      
      
      
    </View>
  );
}

const styles = {
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
  },
  Clear: {
    backgroundColor: '#1e517b',
     color: 'white',
     padding: 10,
     fontSize: 15,
     fontWeight: 'bold',
     borderRadius: 15,
     width:  60,
     marginTop: 5,
  },
  input: {
    flex: 1,
    height: 40,
    width: '66%',
    color: 'black'
  },
  caret: {
    marginLeft: 10,
    fontSize: 22,
    color: 'black'
  },
  optionsContainer: {
    backgroundColor: '#263A94',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  option: {
    padding: 10,
  },
};

export default Distence;
