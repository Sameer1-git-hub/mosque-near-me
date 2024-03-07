import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import GooglePlacesInput from '../components/Searchbar';
import Masjidcard from '../components/ui/masjid/masjid_card/Masjid_card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import GetLocation from 'react-native-get-location';
import Getlocationbutton from '../components/ui/form/buttons/Getlocationbutton';

export default function Home() {
  const userData = useSelector(state => state.user);
  const token = userData.token;

  const [masjidData, setMasjidData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null
  });

  useEffect(() => {
    handleLocationButtonClick();
    getLocation();
  }, []);

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const { latitude, longitude } = location;
        setLocation({ latitude, longitude });
      })
      .catch(error => {
        console.error('Error getting location:', error);
      });
  };

  const handleLocationButtonClick = () => {
    console.log('clicked')
    sendLocationData(location);
  }

  const sendLocationData = async (locationData) => {
    try {
      setLoading(true);
      const { latitude, longitude } = locationData;
      const response = await axios.post(
        `https://admin.meandmyteam.org/api/masjid-nearby?page=${page}`,
        { latitude, longitude },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const pages = response.data.pagination.current_page;
      setPage(pages + 1);
      setMasjidData(prevData => [...prevData, ...response.data.results]);
    } catch (error) {
      console.error('Error sending location data:', error);
    } finally {
      setLoading(false); // Initial loading completed
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      sendLocationData(location);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
        <GooglePlacesInput />
        <Getlocationbutton onPress={handleLocationButtonClick} />
      </View>
      <FlatList
        data={masjidData}
        renderItem={({ item }) => <Masjidcard key={item.id} masjid={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
}
