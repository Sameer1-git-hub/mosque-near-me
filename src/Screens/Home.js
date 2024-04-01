import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, FlatList, } from 'react-native';
import GooglePlacesInput from '../components/ui/model/search/Searchbar';
import Masjidcard from '../components/ui/masjid/masjid_card/Masjid_card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Getlocationbutton from '../components/ui/form/buttons/Getlocationbutton';

export default function Home(props) {
  const userData = useSelector(state => state.user);
  const token = userData.token;

  const [masjidData, setMasjidData] = useState([]);
  const [Userlocation, setUserlocation] = useState([28.65068, 77.23342]);
  const [loading, setLoading] = useState(false);
  const [current_page, setcurrent_page] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    sendLocationData();
  }, [Userlocation]);

  const sendLocationData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://admin.meandmyteam.org/api/masjid-nearby?page=${current_page}`,
        {
          latitude: Userlocation[0],
          longitude: Userlocation[1]
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMasjidData(prevData => [...prevData, ...response.data.results]);
      setcurrent_page(current_page + 1);
    } catch (error) {
      console.error('Error sending location data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  const heandelsendlocation = (location) => {
    setMasjidData([]);
    setcurrent_page(1);
    setUserlocation([location.latitude, location.longitude]);
  };

  const handleRefresh = () => {
    setRefreshing(true);
   
    sendLocationData();
  };
  const handleLoadMore = () => {
    sendLocationData();

  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
        <GooglePlacesInput setUserlocation={heandelsendlocation} />
        <Getlocationbutton setUserlocation={heandelsendlocation} />
      </View>
      <FlatList
        ref={flatListRef}
        data={masjidData}
        renderItem={({ item, index }) => <Masjidcard masjidID={`${item.id}_${index}`} masjid={item} />}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#ff0000" />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}
