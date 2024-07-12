import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Masjidcard from '../ui/masjid_card/Masjid_card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';

export default function FavouriteMasjid({ refresh, onFavoriteChange }) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [masjidData, setMasjidData] = useState([]);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    fetchData();
  }, [refresh, onFavoriteChange]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://admin.meandmyteam.org/api/get-fav-masjids?page=${page}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.results) {
        setMasjidData(response.data.results);
      } else {
        Snackbar.show({
          text: 'Loading data, please wait...',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      Snackbar.show({
        text: 'Loading data, please wait...',
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post(
        `https://admin.meandmyteam.org/api/get-fav-masjids?page=${page + 1}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.results) {
        setMasjidData((prevData) => [...prevData, ...response.data.results]);
        setPage(page + 1);
      } else {
        Snackbar.show({
          text: 'Loading data, please wait...',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      Snackbar.show({
        text: 'Loading data, please wait...',
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#509494" />
      ) : (
        <FlatList
          data={masjidData}
          renderItem={({ item }) => (
            <Masjidcard masjid={item} key={item.id.toString()} />
          )}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: 'red', fontSize: 20 }}>No favorite masjids found.</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
