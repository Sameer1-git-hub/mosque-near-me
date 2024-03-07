// Card.js
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Animated, ActivityIndicator } from 'react-native';
import Header from './Header';
import BodySection from './Crd';
import MasjidCard from './MasjidCard';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Logo from '../components/Logo';
import styles from './styles'; // Import the styles from the main file

// ... (Other imports)

const Card = () => {
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
    
            if (userLocation && send !== '') {
              const response = await axios.post(
                'https://admin.meandmyteam.org/api/masjid-nearby',
                {
                  page: page, // Include the page number in the request
                }
              );
    
              if (response.data && response.data.results) {
                setMasjids((prevMasjids) => [...prevMasjids, ...response.data.results]);
                setPage((prevPage) => prevPage + 1);
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
      }, [userLocation, send]);

  return (
    <>
      <ScrollView
        style={{ height: '100%' }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
          }
        )}
        onEndReachedThreshold={0.1}
      >
        <View style={styles.headerSection}>
          <Header />
        </View>
        {/* Masjid cards rendering logic */}
        {masjids && masjids.map((masjid) => <MasjidCard masjid={masjid} />)}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>
      <Animated.View
        style={[
          styles.animatedView,
          {
            top: stickyTop,
            opacity: stickyOpacity,
          },
        ]}
      >
        <Header />
      </Animated.View>
    </>
  );
};

export default Card;
