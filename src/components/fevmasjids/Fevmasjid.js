import { View,Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Masjidcard from '../ui/masjid/masjid_card/Masjid_card';

export default function Fevmasjid({ masjid }) {
  const userData = useSelector(state => state.user);
  const masjie_ID = userData.favoriteMasjids

  // console.log(masjie_ID)

  const [masjidData, setMasjidData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadmasjids();
  }, [])

  const loadmasjids = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://admin.meandmyteam.org/api/masjid-nearby'
      );
      setMasjidData(response.data.results);
    } catch (error) {
      console.error('Error fetching masjids:', error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <ScrollView style={{ height: '100%' }}>
        {masjie_ID.length > 0 ? (
          masjie_ID.map(id => (
            <Masjidcard key={id} masjid={id} masjidi={masjid} />
          ))
        ) : (
          <Text>Koi masjid ID nahi hai.</Text>
        )}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>
    </View>
  )
}