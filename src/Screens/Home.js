import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import GooglePlacesInput from '../components/Searchbar';
import Masjidcard from '../components/ui/masjid/masjid_card/Masjid_card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import GetLocation from 'react-native-get-location';
import Getlocationbutton from '../components/ui/form/buttons/Getlocationbutton';

export default function Home(props) {
  const userData = useSelector(state => state.user);
  const token = userData.token;

  const [masjidData, setMasjidData] = useState([]);
  const [Userlocation, setUserlocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query , setQuery] = useState([]);

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);



  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const { latitude, longitude } = location;

        sendLocationData(latitude, longitude);
      })
      .catch(error => {
        console.error('Error getting location:', error);
      });
  };

  const sendLocationData = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://admin.meandmyteam.org/api/masjid-nearby?page=${page}`,
        { latitude, longitude },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setPage(page + 1);
      setMasjidData(prevData => [...prevData, ...response.data.results]);
    } catch (error) {
      console.error('Error sending location data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Set refreshing to false when data fetching completes
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      const { latitude, longitude } = masjidData[masjidData.length - 1];
      
    }
  };

  const heandelsendlocation = (locat) => {
    setUserlocation([locat.latitude, locat.longitude]);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1); 
    setMasjidData([]); 
    getLocation(); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
        <GooglePlacesInput />
        <Getlocationbutton setUserlocation={heandelsendlocation} />
      </View>
      <FlatList
        ref={flatListRef}
        data={masjidData}
        renderItem={({ item }) => <Masjidcard key={item.id} masjid={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#ff0000" />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}
