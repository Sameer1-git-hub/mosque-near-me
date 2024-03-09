import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { Linking } from 'react-native';
import Model from '../editTime/Model';
import LinearGradient from 'react-native-linear-gradient';
import Favicon from './ui/form/buttons/Favicon';
import Icon from 'react-native-vector-icons/Ionicons';
import Edit from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Fajr from 'react-native-vector-icons/Feather';
import Zuhr from 'react-native-vector-icons/Feather';
import Asar from 'react-native-vector-icons/Feather';
import Juma from 'react-native-vector-icons/FontAwesome5';
import Direct from 'react-native-vector-icons/FontAwesome5';



export default function Card() {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [masjids, setMasjids] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    // distance: send,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginPopup, setshowLoginPopup] = useState(false);

  const handleLoginShow = () => {
    setshowLoginPopup(true);
  }


  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDmhTdw-NLA_xcJJl2diPWHSRkEW9ew56s`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            setUserLocation({ latitude, longitude, address });

          } else {
            // console.error('No address found');
          }
        })
        .catch((error) => {
          console.error('Error fetching address:', error);
        });
    };


    const errorCallback = (error) => {
      console.error(`Geolocation error: ${error.message}`);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 10000,


    };

    const watchId = Geolocation.watchPosition(successCallback, errorCallback, options);

    return () => {
      Geolocation.clearWatch(watchId);
    };

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (userLocation !== '') {
          const response = await axios.post(
            'https://admin.meandmyteam.org/api/masjid-nearby',
            {
              page: page, // Use page instead of pageNumber
              per_page: 50,
            }
          );

          if (response.data && response.data.results) {
            if (page === 1) {
              setMasjids((prevMasjids) => [...prevMasjids, ...response.data.results]);
            } else {
              setMasjids((prevMasjids) => [...prevMasjids, ...response.data.results]);
            }
            setPage(page + 1); // Update the page state variable
          } else {
            console.error('Unexpected response structure:', response.data);
          }
        } else {
          const response = await axios.post(
            'http://admin.meandmyteam.org/api/dashboard/masjids'
          );

          if (
            response.data &&
            response.data.data &&
            response.data.data.masjids &&
            response.data.data.masjids.data
          ) {
            setMasjids(response.data.data.masjids.data);
          } else {
            console.error('Unexpected response structure:', response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching masjids:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userLocation, page]);

  const handleLoadMore = () => {
    fetchDataForPage(currentPage);
  };


  const openGoogleMap = () => {
    const lat = 25.424120; // Replace with your desired latitude
    const lng = 77.657990; // Replace with your desired longitude
    const label = 'Shivpuri, Madhya Pradesh'; // Replace with your desired label

    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving&dir_action=navigate&destination_place_id=${label}`;

    Linking.openURL(url);
  };


  return (
    <>
      <ScrollView onEndReached={handleLoadMore} style={styles.scroll}>

        {masjids && masjids.map((masjid) => (
          <View style={[styles.card, styles.shadowProp]}>
            <LinearGradient colors={['#197173', '#0F3E3F',]} style={styles.linearcolor}>

              <View style={styles.cardContent}>
                <View style={styles.mainicons}>
                  <Edit name={'edit'} size={30} color={'#fff'}  />
                  <View style={styles.addressviw}  >                    
                    <Icon name={'location-sharp'} size={30} color={'#509494'} />
                    <Text style={styles.addressviwtext}> Masjid location</Text>
                  </View>
                  <View style={{ flexDirection: 'column',}}>
                    <Favicon />

                    {/* {Token ? <Favicon
                      masjidId={props.masjid.id}
                    /> : <Button variant="link" onClick={handleLoginShow} >
                      <Icon name="heart" size={30} color={color} />

                    </Button>}
                    {showLoginPopup && <Popupheandel
                    />} */}
                    <TouchableOpacity onPress={openGoogleMap}>
                    <Direct name={'location-arrow'} size={30} color={'#fff'} />
                     
                    </TouchableOpacity>

                  </View>
                </View>
                <View style={{alignItems: 'center', overflow: 'scroll'}}>
                  <Text style={styles.title}>{masjid.name}</Text>
                  <Text style={styles.title}>
                    Distence -
                    {/* { masjid.distance_to_masjid} */}
                    {masjid.distance_to_masjid < 1000
                      ? `${masjid.distance_to_masjid} Meters`
                      : `${(masjid.distance_to_masjid / 1000).toFixed(1)} km`}
                  </Text>
                </View>



                <View style={styles.footer}>
                  <View style={styles.box}>

                    <Text style={styles.boxText}>{masjid.fajr}</Text>
                    <Fajr padding={10} name={'sunrise'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Fajr</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.zuhar}</Text>
                    <Zuhr padding={5} name={'sun'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>zuh’r</Text>


                  </View>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.asar}</Text>
                    <Asar padding={5} name={'sunset'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Asar</Text>

                  </View>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.maghrib}</Text>
                    <Icon2 padding={5} name={'moon-sharp'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Magrib</Text>

                  </View>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.isha}</Text>
                    <Icon2 padding={5} name={'moon-sharp'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Isha’a</Text>

                  </View>
                  <View style={styles.box}>
                    <Text style={styles.boxText}>{masjid.juma}</Text>
                    <Juma padding={5} name={'pray'} size={30} color={'#fff'} />
                    <Text style={styles.boxText}>Juma</Text>

                  </View>
                </View>

              </View>
            </LinearGradient>
          </View>
        ))}


        {loading && <ActivityIndicator size="large" color="#0000ff" />}

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 10,
    height: '100%',
    width: '100%',
  },
  linearcolor: {
    width: '100%',
    height: '95%',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 10,
  },
  addressviw: {
    backgroundColor: '#123032',
    height: 50,
    width: 230,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
    overflow: 'hidden',
  },
  addressviwtext: {
    fontSize: 20,
    color: '#509494',
  },
  mainicons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  card: {
    width: '100%',
    backgroundColor: '#132B2B',
    overflow: 'hidden',
    marginVertical: 10,
    height: 350,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    textAlign: 'center',
    elevation: 3,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContent: {
    padding: 15,
    justifyContent: 'center',

  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'LibreBaskerville-Bold',
    textAlign: 'center',
    paddingVertical: 10,
    width: 350,
    overflow: 'scroll',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  box: {
    width: '16.30%',
    height: '70%',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2
  },
  boxText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 17,
    justifyContent: 'center'


  },
});