import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import GooglePlacesInput from '../components/ui/model/search/Searchbar';
import Masjidcard from '../components/ui/masjid_card/Masjid_card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Getlocationbutton from '../components/ui/model/Getlocationbutton/Getlocationbutton';
import Snackbar from 'react-native-snackbar';

export default function Home() {
  const { token } = useSelector(state => state.user);
  const [masjidData, setMasjidData] = useState([]);
  const [Userlocation, setUserlocation] = useState([28.65068, 77.23342]);
  const [loading, setLoading] = useState(false);
  const [current_page, setcurrent_page] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const fetchingRef = useRef(false);

  useEffect(() => {
    setMasjidData([]);
    setcurrent_page(1);
    fetchMasjidData(true);
  }, [Userlocation]);

  const fetchMasjidData = async (freshFetch = false) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      setLoading(true);
      const pageToFetch = freshFetch ? 1 : current_page;
      const response = await axios.post(
        `https://admin.meandmyteam.org/api/masjid-nearby?page=${pageToFetch}`,
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
      if (freshFetch) {
        setMasjidData(response.data.results);
        setcurrent_page(2);
      } else {
        setMasjidData(prevData => [...prevData, ...response.data.results]);
        setcurrent_page(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error sending location data:', error);
      Snackbar.show({
        text: 'Error fetching masjid data',
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
      fetchingRef.current = false;
    }
  };

  const heandelsendlocation = location => {
    setMasjidData([]);
    setUserlocation([location.latitude, location.longitude]);
    setcurrent_page(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMasjidData(true);
  };

  const handleLoadMore = () => {
    fetchMasjidData();
  };

  const onMasjidUpdateHandler = updatedMasjid => {
    setMasjidData(prevData => prevData.map(masjid => (masjid.id === updatedMasjid.id ? { ...masjid, ...updatedMasjid } : masjid)));
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#509494" />;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.firsrChild}>
        <GooglePlacesInput setUserlocation={heandelsendlocation} />
        <Getlocationbutton setUserlocation={heandelsendlocation} />
      </View>
      
      <FlatList
        ref={flatListRef}
        data={masjidData}
        renderItem={({ item, index }) => (
          <Masjidcard
            masjid={item}
            key={item.id}
            onMasjidUpdate={onMasjidUpdateHandler}
          />
        )}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  firsrChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  }
});
